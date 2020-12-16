import { Component, OnInit, OnDestroy } from '@angular/core';
import "@capacitor-community/firebase-analytics";

import { Plugins } from "@capacitor/core"
import { AdOptions, AdSize, AdPosition } from "capacitor-admob";

const { AdMob } = Plugins;

const { FirebaseAnalytics } = Plugins;
FirebaseAnalytics.enable();

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit, OnDestroy {
  options: AdOptions = {
    adId: "ca-app-pub-9580735978410872/5166960373",
    adSize: AdSize.BANNER,
    position: AdPosition.BOTTOM_CENTER,
  };

  constructor() {
    // Show Banner Ad
    AdMob.showBanner(this.options).then(
      value => {
        console.log(value); // true
      },
      error => {
        console.error(error); // show error
      }
    );

    // Subscibe Banner Event Listener
    AdMob.addListener("onAdLoaded", (info: boolean) => {
      console.log("Banner Ad Loaded");
    });
  }
  private eventOnAdSize;
  private appMargin = 0;

  ngOnInit() {
  this.eventOnAdSize = AdMob.addListener('onAdSize', (info: any) => {
    this.appMargin = parseInt(info.height, 10);
    if (this.appMargin > 0) {
      const app: HTMLElement = document.querySelector('ion-router-outlet');
      app.style.marginBottom = this.appMargin + 'px';
    }
  });
  }

  ngOnDestroy() {
    if (this.eventOnAdSize) {
      this.eventOnAdSize.remove();
    }
  }

}
