# tgos-nodejs-sdk
地理資訊圖資雲服務平台 TGOS

## GetStarted

### Apply for TGOS services

https://www.tgos.tw/tgos/Web/Address/TGOS_Address.aspx

```bash
npm i --save tgos-nodejs-sdk
```

```javascript
const TGOS = require('tgos-nodejs-sdk');

const tgos = new TGOS({
  appId,
  appKey,
  returnRawData: false,
  debug: true,
});

const [{
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
}] = await tgos.queryAddress('臺北市中正區建國里4鄰重慶南路一段122號', {
  oSRS: 'EPSG:4326', // See supported values
  oFuzzyType: 2,
  oResultDataType: 'JSON',
  oFuzzyBuffer: 0,
  oIsOnlyFullMatch: false,
  oIsSupportPast: true,
  oIsShowCodeBase: false,
  oIsLockCounty: true,
  oIsLockTown: false,
  oIsLockVillage: false,
  oIsLockRoadSection: false,
  oIsLockLane: false,
  oIsLockAlley: false,
  oIsLockArea: false,
  oIsSameNumber_SubNumber: true,
  oCanIgnoreVillage: true,
  oCanIgnoreNeighborhood: true,
  oReturnMaxCount: 1,
});

```

## Supported SRS

### EPSG:4326
- google earth (wgs84 datum)
- open street map (gcs with units decimal degrees & datum of wgs84)

### EPSG:3825

### EPSG:3826

### EPSG:3827

### EPSG:3828

## Reference

- [WSQueryAddr40 門牌位置比對服務](https://addr.tgos.tw/AddrWS/v40/QueryAddr.asmx)
- [QueryAddr(GoogleMap)](https://www.tgos.tw/TGOS_WEB_API/Web/TGOSQueryAddrSample.aspx)
- https://terrence0303-64740.medium.com/%E4%BD%BF%E7%94%A8tgos-api%E6%AF%94%E5%B0%8D%E5%9C%B0%E5%9D%80%E8%88%87%E6%9F%A5%E5%B0%8B%E5%9D%90%E6%A8%99-5db276ab278a