import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  gender: string = 'male';
  age: string = 'adult';
  weight: number;
  sodium: number;
  correction: number;
  deficit: string;

  constructor(public alertController: AlertController) {
  }

  check1(event){
    this.gender = event.target.value;
  }
  check2(event){
    this.age = event.target.value;
  }
  clear(){
    this.weight = null;
    this.sodium = null;
    this.correction = null;
    this.deficit = null;
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
      message: 'Current sodium level must be less than desired sodium level!',
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
    else if (this.sodium > this.correction) {this.presentAlert2()}
    else {
      var TBW: number;
      if ((this.age == 'child') || (this.age == 'adult' && this.gender == 'male')){TBW = this.weight * 0.6}
      else if ((this.age == 'adult' && this.gender == 'female') || (this.age == 'elderly' && this.gender == 'male')){TBW = this.weight * 0.5}
      else if (this.age == 'elderly' && this.gender == 'female'){TBW = this.weight * 0.45}
      var sodium: number;
      sodium = (this.correction -  this.sodium)*TBW;
      this.deficit = 'The sodium deficit is: '+this.roundoff(sodium)+' mEq.'
    }
  }   
}
