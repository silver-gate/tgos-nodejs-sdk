require('dotenv').config(); // eslint-disable-line import/no-extraneous-dependencies

const TGOS = require('../TGOS');

const {
  APP_ID: appId,
  APP_KEY: appKey,
} = process.env;

const tgos = new TGOS({
  appId,
  appKey,
  returnRawData: true,
  debug: true,
});

jest.setTimeout(10000);

describe('TGOS Test', () => {
  test('xml parser', () => {
    const xmlString = `
      <?xml version="1.0" encoding="utf-8"?>
      <string xmlns="http://tempuri.org/">{
        "Info": [
          {
            "IsSuccess": "True",
            "InAddress": "臺北市中正區重慶南路1段122號",
            "InSRS": "EPSG:4326",
            "InFuzzyType": "[單雙號機制]+[最近門牌號機制]",
            "InFuzzyBuffer": "0",
            "InIsOnlyFullMatch": "False",
            "InIsSupportPast": "True",
            "InIsShowCodeBase": "False",
            "InIsLockCounty": "True",
            "InIsLockTown": "False",
            "InIsLockVillage": "False",
            "InIsLockRoadSection": "False",
            "InIsLockLane": "False",
            "InIsLockAlley": "False",
            "InIsLockArea": "False",
            "InIsSameNumber_SubNumber": "True",
            "InCanIgnoreVillage": "True",
            "InCanIgnoreNeighborhood": "True",
            "InReturnMaxCount": "1",
            "OutTotal": "1",
            "OutMatchType": "完全比對",
            "OutMatchCode": "[臺北市]\tFULL:1",
            "OutTraceInfo": "[臺北市]\t { 完全比對 } 找到符合的門牌地址"
          }
        ],
        "AddressList": [
          {
            "PERIOD": "",
            "FULL_ADDR": "臺北市中正區建國里4鄰重慶南路一段122號",
            "COUNTY": "臺北市",
            "TOWN": "中正區",
            "VILLAGE": "建國里",
            "NEIGHBORHOOD": "4鄰",
            "ROAD": "重慶南路",
            "SECTION": "1",
            "LANE": "",
            "ALLEY": "",
            "SUB_ALLEY": "",
            "TONG": "",
            "AREA": "",
            "NUMBER": "122號",
            "X": 121.512458,
            "Y": 25.039966
          }
        ]
      }</string>`;

    const data = tgos.xmlParser(xmlString);
    expect(data.Info).toBeDefined();
    expect(data.AddressList).toBeDefined();
  });

  test('Address Query (raw response)', async () => {
    const result = await tgos.queryAddress('臺北市中正區重慶南路1段122號');
    console.log(result);
    expect(result.AddressList[0].X).toEqual(121.512458); // Longitude
    expect(result.AddressList[0].Y).toEqual(25.039966); // Latitude
  });

  test('Address Query', async () => {
    tgos.returnRawData = false;
    const [result] = await tgos.queryAddress('臺北市中正區重慶南路1段122號');
    console.log(result);
    expect(result).toEqual({
      lat: 25.039966,
      lng: 121.512458,
      address: '臺北市中正區建國里4鄰重慶南路一段122號',
      details: {
        county: '臺北市',
        town: '中正區',
        village: '建國里',
        neighborhood: '4鄰',
        road: '重慶南路',
        section: '1',
        lane: '',
        alley: '',
        subAlley: '',
        tong: '',
        area: '',
        number: '122號'
      }
    });
  });

  test('Failed Address Query with wrong address', async () => {
    tgos.returnRawData = false;
    const results = await tgos.queryAddress('嘉義市民雄鄉牛斗山78-1號');
    expect(results.length).toEqual(0);
  });
});
