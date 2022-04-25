// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // apiUrlIp: 'http://testsrv.oyeexams.com'
  //apiUrlIp: 'http://srv.oyeexams.com/',
  apiUrlIp: 'http://uatsrv.oyeexams.com/',
  // apiUrlIp: 'http://localhost:18342/',
  //apiUrlIp: 'http://uatsrv.oyeexams.com/',
  downPdf: 'http://45.77.47.198:80/htmlpdf',
  pdfApi: 'https://pdf-downloader.tk/htmlpdf',
  pdfApi_Mickey: 'http://localhost:9000/api/render',
  //  apiUrlIp: 'http://localhost:18342/',
  paytmMerchantId: 'oIXRLu17530234160578',
  paytmInitiateTransactionURL: 'https://securegw-stage.paytm.in/merchantpgpui/checkoutjs/merchants',
  // apiUrlIp: 'http://reportsrv.oyeexams.com/'
  // apiUrlIp: 'http://srv.oyeexams.com/' //live server
  docUrlIp: 'http://uatdocgenerater.oyeexams.com/',
  fbPixelId: '865983480990429'
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
