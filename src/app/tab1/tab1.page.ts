import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  weight: number;
  weightx: number;
  height: number;
  heightx: number;
  satuan1: string = 'kg';
  satuan2: string = 'cm';
  time: number;
  fluid: number;
  child: boolean = false;
  burn: number;
  note1: string;
  note2: string;
  note3: string;
  note4: string;
  note5: string;
  note6: string;
  note7: string;

  constructor(public alertController: AlertController) {
  }

  clear(){
    this.weight = null;
    this.height = null;
    this.time = null;
    this.fluid = null;
    this.burn = null;
    this.child = false;
    this.note1 = null;
    this.note2 = null;
    this.note3 = null;
    this.note4 = null;
    this.note5 = null;
    this.note6 = null;
    this.note7 = null;
  }

  checksatuan1(event){
    this.satuan1 = event.target.value;
  }
  checksatuan2(event){
    this.satuan2 = event.target.value;
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
  roundoff(value){
    var value4 = "" + Math.round(value);
    var bonus2 = value4.length + 1;
    var bonus = 0;
    if (value < 100){bonus=bonus+1};
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
    if (this.height == null || this.weight == null || this.time == null || this.fluid == null || this.burn == null || 
      this.height < 0 || this.weight < 0 || this.time < 0 || this.fluid < 0 || this.burn < 0){
      this.presentAlert()
    } else if (this.time >= 24) {this.presentAlert2()}
    else {
      if (this.satuan1 == 'kg'){
        this.weightx = this.weight;
      } else if (this.satuan1 == 'lb'){
        this.weightx = this.weight*0.45359237;
      }
      if (this.satuan2 == 'cm'){
        this.heightx = this.height;
      } else if (this.satuan2 == 'ft'){
        this.heightx = this.height*30.48;
      }
      var parkland = 4 * this.burn * this.weightx;
      this.note1 = 'The fluid requirements from the first 24 hours from time of burn are ' + this.roundoff(parkland) + ' mL. (4 mL x kg body weight x % burn area)'
      //kasih catatan cairan yang diperlukan 24 jam pertama
      var halfparkland = parkland / 2;
      this.note2 = this.roundoff(halfparkland) + ' mL are given in the first 8 hours and ' + this.roundoff(halfparkland) + ' mL are given in the second 16 hours.'
      //kasih catatan cairan yang dibutuhkan 8 jam dan 16 jam
      this.note3 = 'The patient had been given ' + this.roundoff(this.fluid) + ' mL in the first ' + this.time + ' hours from the time of burn.'
        if (this.time < 8){
          if (this.fluid > halfparkland){
            //kasih catatan cairan yang masuk sudah cukup melebihi yang dibutuhkan dalam 8 jam pertama
            if (this.fluid > parkland) {
              this.note4 = 'Fluid that had been given are more than the required fluid in the first 24 hours.'
              //kasih catatan cairan yang masuk sudah melebihi yang dibutuhkan dalam 24 jam pertama
            } else {
              var first24hours = (parkland-this.fluid)/(24-this.time);
              this.note4 = 'Fluid that had been given are more than the required fluid in the first 8 hours. For the next '
              + (24-this.time) + ' hours, the patient needs ' + this.roundoff(parkland-this.fluid) + ' mL (' + this.roundoff(first24hours)
              + ' mL/hour).';
              //kasih catatan cairan yang perlu masuk sisanya
            }
          } else {
            var first8hours = (halfparkland - this.fluid)/(8-this.time);
            var first16hours = halfparkland/16;
            this.note4 = 'The patient needs ' + this.roundoff(halfparkland-this.fluid) + ' mL in the first ' + (8-this.time) + ' hours ('
            + this.roundoff(first8hours) + ' mL/hour) and ' + this.roundoff(halfparkland) + ' mL in the second 16 hours (' + this.roundoff(first16hours) + ' mL/hour).'
            //kasih catatan cairan yang perlu masuk 8 jam pertama dan 16 jam pertama per hour 
          }
        } else {
          if (this.fluid > parkland){
            this.note4 = 'Fluid that had been given are more than the required fluid in the first 24 hours.'
            //kasih catatan cairan yang masuk sudah melebihi yang dibutuhkan dalam 24 jam pertama
          } else {
            var first24hours = (parkland-this.fluid)/(24-this.time);
            this.note4 = 'For the next '
              + (24-this.time) + ' hours, the patient needs ' + this.roundoff(parkland-this.fluid) + ' mL (' + this.roundoff(first24hours)
              + ' mL/hour).';
          }
        }
      var bsa = Math.sqrt(this.heightx *this.weightx/3600)
      this.note5 = 'Body surface area (BSA) is ' + this.roundoff(bsa) + ' square meter (Mosteller formula).'
      if (this.child == false){
          this.note7 = 'Target urine output for adult is 0.5 - 1.0 mL/kg body weight/hour.'
          var maintenance = 1500 * bsa;
          var maintenancerate = maintenance/24;
          var evaporative = (25 + this.burn) * bsa;
          var total = maintenancerate + evaporative;
        } else {
          this.note7 = 'Target urine output for children is 1.0 - 2.0 mL/kg body weight/hour.'
          if (this.weightx > 20){
            var maintenance = 1500 + (this.weightx-20)*20;
            var maintenancerate = maintenance/24;
            var evaporative = (25 + this.burn) * bsa
            var total = maintenancerate + evaporative;
          } else if (this.weightx > 10){
            var maintenance = 1000 + (this.weightx-10)*50;
            var maintenancerate = maintenance/24;
            var evaporative = (35 + this.burn) * bsa
            var total = maintenancerate + evaporative;
          } else {
            var maintenance = this.weightx*100;
            var maintenancerate = maintenance/24;
            var evaporative = (35 + this.burn) * bsa
            var total = maintenancerate + evaporative;
          }
        }  
        this.note6 = 'Maintenance fluid rate (' + this.roundoff(total) + ' mL/hour) = basal requirements (' + this.roundoff(maintenancerate) + ' mL/hour) + evaporative lossess (' + this.roundoff(evaporative) + ' mL/hour). It is usually given after the first 24 hours but can also be given during resuscitaion period (the first 24 hours), especially in children.';
      }
    }

}
