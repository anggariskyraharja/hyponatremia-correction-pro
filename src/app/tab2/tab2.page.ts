import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})

export class Tab2Page {
  body1: boolean = false;
  body2: boolean = false;
  body3: boolean = false;
  body4: boolean = false;
  body5: boolean = false;
  body6: boolean = false;
  body7: boolean = false;
  body8: boolean = false;
  body9: boolean = false;
  body10: boolean = false;
  body11: boolean = false;
  body12: boolean = false;
  body13: boolean = false;
  body14: boolean = false;
  bsa: number = 0;

  constructor(public alertController: AlertController) {
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Missing Value',
      message: 'Please input all the required values!',
      buttons: ['Okay']
    });
    await alert.present();
  }
  async presentAlert2() {
    const alert = await this.alertController.create({
      header: 'Wrong Value',
      message: 'Time since burn must be between 0-23 hours!',
      buttons: ['Okay']
    });
    await alert.present();
  }
  calculate(){
    this.bsa = 0;
    if (this.body1 == true){
      this.bsa   = this.bsa + 4.5;
    }
    if (this.body2 == true){
      this.bsa   = this.bsa + 4.5;
    }
    if (this.body3 == true){
      this.bsa   = this.bsa + 9;
    }
    if (this.body4 == true){
      this.bsa   = this.bsa + 9;
    }
    if (this.body5 == true){
      this.bsa   = this.bsa + 18;
    }
    if (this.body6 == true){
      this.bsa   = this.bsa + 4.5;
    }
    if (this.body7 == true){
      this.bsa   = this.bsa + 4.5;
    }
    if (this.body8 == true){
      this.bsa   = this.bsa + 4.5;
    }
    if (this.body9 == true){
      this.bsa   = this.bsa + 4.5;
    }
    if (this.body10 == true){
      this.bsa   = this.bsa + 9;
    }
    if (this.body11 == true){
      this.bsa   = this.bsa + 9;
    }
    if (this.body12 == true){
      this.bsa   = this.bsa + 9;
    }
    if (this.body13 == true){
      this.bsa   = this.bsa + 9;
    }
    if (this.body14 == true){
      this.bsa   = this.bsa + 1;
    }
  }
}
