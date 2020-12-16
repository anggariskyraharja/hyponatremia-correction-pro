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
  drop: string = '20';
  weight: number;
  sodium: number;
  correction: number;
  fluiddrate: string;
  droprate: string;

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
  check4(event){
    this.drop = event.target.value;
  }

  clear(){
    this.weight = null;
    this.sodium = null;
    this.correction = null;
    this.fluiddrate = null;
    this.droprate = null;
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
      message: 'Sodium concentration range: 90-135 mEq/L',
      buttons: ['Okay']
    });
    await alert.present();
  }
  async presentAlert3() {
    const alert = await this.alertController.create({
      header: 'Wrong Value',
      message: 'Sodium correction rate range: 0-2 mEq/L/hour',
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
  async presentAlert5() {
    const alert = await this.alertController.create({
      header: 'Acute hyponatremia (<48 hours) recommendation',
      message: 'Severe symptoms like seizure, loss of consciousness: rapid initial correction of 4-6 mEq/L in the initial 1-2 hours and then 0.5-1 mEq/L until serum sodium level normalize. For mild-moderate symptoms: correction rate of 0.5-1 mEq/L until serum sodium level normalize',
      buttons: ['Okay']
    });
    await alert.present();
  }
  async presentAlert6() {
    const alert = await this.alertController.create({
      header: 'Chronic hyponatremia recommendation',
      message: 'Initial correction of 4-8 mEq/L in the first 24 hours and then 10-12 mEq in the next 24 hours and not more than 18 mEq/48 hours.',
      buttons: ['Okay']
    });
    await alert.present();
  }
  information1(){
    this.presentAlert5();
  }
  information2(){
    this.presentAlert6();
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
    else if (this.sodium <90 || this.sodium > 135) {this.presentAlert2()}
    else if (this.correction <=0 || this.correction > 2) {this.presentAlert3()}
    else if (this.sodium >= 130 && this.fluid == 'Ringers lactate'){this.presentAlert4()}
    else {
      var TBW: number;
      if ((this.age == 'child') || (this.age == 'adult' && this.gender == 'male')){TBW = this.weight * 0.6}
      else if ((this.age == 'adult' && this.gender == 'female') || (this.age == 'elderly' && this.gender == 'male')){TBW = this.weight * 0.5}
      else if (this.age == 'elderly' && this.gender == 'female'){TBW = this.weight * 0.45}
      var change: number;
      var rate: number;
      var drip: number;
      var day: number;
      day = this.correction * 24;
      if (this.fluid == 'Normal saline'){change = (154-this.sodium)/(TBW+1);}
      else if (this.fluid == '3% hypertonic saline'){change = (513-this.sodium)/(TBW+1);}
      else if (this.fluid == '5% hypertonic saline'){change = (856-this.sodium)/(TBW+1);}
      else if (this.fluid == 'Ringers lactate'){change = (130-this.sodium)/(TBW+1);}
      rate = 1000 * this.correction / change;
      if (this.drop == '20'){drip = rate/60*20}
      else if (this.drop == '15'){drip = rate/60*15}
      else if (this.drop == '10'){drip = rate/60*10}
      this.fluiddrate = 'For desired correction rate of: '+this.correction+' mEq/L/hour, the fluid correction rate using '+this.fluid+' is '+this.roundoff(rate)+' mL/hour. This will correct sodium by '+this.roundoff(day)+' mEq/L per day.'
      this.droprate = 'For IV infusion with drop factors of '+this.drop+' gtts/mL, the infusion should be set to '+drip+' gtts/minute or drops/minute.'
    }
  }   
}
