import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  gender: string = 'male';
  age: string = 'adult';
  fluid: string = 'Normal saline';
  weight: number;
  sodium: number;
  correction: number;
  fluiddrate: string;

  constructor(public alertController: AlertController) {
  }

  check1(event){
    this.gender = event.target.value;
  }
  check2(event){
    this.age = event.target.value;
  }
  check3(event){
    this.fluid = event.target.value;
  }

  clear(){
    this.weight = null;
    this.sodium = null;
    this.correction = null;
    this.fluiddrate = null;
  }

  async presentAlert1() {
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
      message: 'Sodium concentration range: 100-140 mEq/L',
      buttons: ['Okay']
    });
    await alert.present();
  }
  async presentAlert3() {
    const alert = await this.alertController.create({
      header: 'Wrong Value',
      message: 'Sodium correction rate range: 0-1 mEq/L/hour',
      buttons: ['Okay']
    });
    await alert.present();
  }
  async presentAlert4() {
    const alert = await this.alertController.create({
      header: 'Wrong Fluid',
      message: 'You need another fluid. Ringers lactate concentration of Na is 130 mEq/L!',
      buttons: ['Okay']
    });
    await alert.present();
  }
  roundoff(value){
    var value4 = "" + Math.round(value);
    var bonus2 = value4.length + 1;
    var bonus = 0;
    if (value < 100000){bonus=bonus+1};
    if (value < 10){bonus=bonus+1};
    if (value < 1){bonus=bonus+1};
    if (value < 0.1){bonus=bonus+1};
    if (value < 0.01){bonus=bonus+1};
    if (value < 0.001){bonus=bonus+1};
    if (value < 0.0001){bonus=bonus+1};
    bonus2 = bonus2+bonus;
    var whole = Math.round(value * Math.pow(10, bonus));
    var whole2 = "" + whole * Math.pow(10, -1*bonus);
    var whole3 = whole2.substr(0,bonus2);
    return whole3;
  }
  calculate(){
    if (this.weight == null || this.sodium == null || this.correction == null){this.presentAlert1()} 
    else if (this.sodium <100 || this.sodium > 140) {this.presentAlert2()}
    else if (this.correction <=0 || this.correction > 1) {this.presentAlert3()}
    else if (this.sodium >= 130 && this.fluid == 'Ringers lactate'){this.presentAlert4()}
    else {
      var TBW: number;
      if ((this.age == 'child') || (this.age == 'adult' && this.gender == 'male')){TBW = this.weight * 0.6}
      else if ((this.age == 'adult' && this.gender == 'female') || (this.age == 'elderly' && this.gender == 'male')){TBW = this.weight * 0.5}
      else if (this.age == 'elderly' && this.gender == 'female'){TBW = this.weight * 0.45}
      var change: number;
      var rate: number;
      var day: number;
      day = this.correction * 24;
      if (this.fluid == 'Normal saline'){change = (154-this.sodium)/(TBW+1);}
      else if (this.fluid == '3% hypertonic saline'){change = (513-this.sodium)/(TBW+1);}
      else if (this.fluid == '5% hypertonic saline'){change = (856-this.sodium)/(TBW+1);}
      else if (this.fluid == 'Ringers lactate'){change = (130-this.sodium)/(TBW+1);}
      rate = 1000 * this.correction / change;
      this.fluiddrate = 'For desired correction rate of: '+this.correction+' mEq/L/hour, the fluid correction rate using '+this.fluid+' is '+this.roundoff(rate)+' mL/hour. This will correct sodium by '+this.roundoff(day)+' mEq/L per day.'
    }
  }   
}
