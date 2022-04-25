import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FacebookPixelsService {

  constructor() { }

  isIdLoaded: boolean = false;
  //TODO : Add FB Pixel for BUy Credit
  loadFBPixel(pageId: string = 'StartTrial', value: any = null) {
    if (!this.isIdLoaded) {
      (function (f: any, b, e, v, n, t, s) {
        if (f.fbq) return; n = f.fbq = function () {
          n.callMethod ?
            n.callMethod.apply(n, arguments) : n.queue.push(arguments)
        }; if (!f._fbq) f._fbq = n;
        n.push = n; n.loaded = !0; n.version = '2.0'; n.queue = []; t = b.createElement(e); t.async = !0;
        t.src = v; s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s)
      })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
      // (window as any).fbq.disablePushState = true; //not recommended, but can be done
      (window as any).fbq('init', environment.fbPixelId);
      if (!value) {
        (window as any).fbq('track', pageId);
      } else {
        (window as any).fbq('track', pageId, value);
      }
      this.isIdLoaded = true;
      console.log('Facebook pixel init run!')
    } else {
      if (!value) {
        (window as any).fbq('track', pageId);
      } else {
        (window as any).fbq('track', pageId, value);
      }
      console.log('Facebook PageView event fired!')
    }
  }

  //TODO : Add FB Pixel for Succesful purchase


}
