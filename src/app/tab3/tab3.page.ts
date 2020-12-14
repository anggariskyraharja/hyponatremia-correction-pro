import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  q1: string = 'q11';
  age: number;
  inhalation: boolean = false;
  full: boolean = false;
  burn: number;
  note1: string;
  note2: string;
  note3: string;

  constructor(public alertController: AlertController) {
  }

  checkq1(event) {
    console.log('radioGroupChange',event.detail);
    this.q1 = event.target.value;
  }

  clear(){
    this.burn = null;
    this.age = null;
    this.inhalation = false;
    this.full = false;
    this.note1 = null;
    this.note2 = null;
    this.note3 = null;
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Missing Value',
      message: 'Please input all the required values!',
      buttons: ['Okay']
    });
    await alert.present();
  }

  calculate(){
    if (this.burn == null || this.age == null){
      this.presentAlert()
    } else {
      var ABSI = 0;
      if (this.q1 == 'q12'){
        ABSI = ABSI + 1;
      }
      if (this.age <= 20){
        ABSI = ABSI + 1;
      } else if (this.age <=40){
        ABSI = ABSI + 2;
      } else if (this.age <=60){
        ABSI = ABSI + 3;
      } else if (this.age <=80){
        ABSI = ABSI + 4;
      } else {
        ABSI = ABSI + 5;
      }
      if (this.inhalation == true){
        ABSI = ABSI + 1;
      }
      if (this.full == true){
        ABSI = ABSI + 1;
      }
      if (this.burn <= 10){
        ABSI = ABSI + 1;
      } else if (this.burn <=20){
        ABSI = ABSI + 2;
      } else if (this.burn <=30){
        ABSI = ABSI + 3;
      } else if (this.burn <=40){
        ABSI = ABSI + 4;
      } else if (this.burn <=50){
        ABSI = ABSI + 5;
      } else if (this.burn <=60){
        ABSI = ABSI + 6;
      } else if (this.burn <=70){
        ABSI = ABSI + 7;
      } else if (this.burn <=80){
        ABSI = ABSI + 8;
      } else if (this.burn <=90){
        ABSI = ABSI + 9;
      } else {
        ABSI = ABSI + 10;
      }
      this.note1 = 'Total ABSI (Abbreviated Burn Severity Index) score is '+ABSI;
      if (ABSI <= 3){
        this.note2 = 'Threat to life: very low'
        this.note3 = 'Probability of survival ≥ 99%'
      } else if (ABSI <= 5){
        this.note2 = 'Threat to life: moderate'
        this.note3 = 'Probability of survival 98%'
      } else if (ABSI <= 7){
        this.note2 = 'Threat to life: moderately severe'
        this.note3 = 'Probability of survival 80-90%'
      } else if (ABSI <= 9){
        this.note2 = 'Threat to life: serious'
        this.note3 = 'Probability of survival 50-70%'
      } else if (ABSI <= 11){
        this.note2 = 'Threat to life: severe'
        this.note3 = 'Probability of survival 20-40%'
      } else {
        this.note2 = 'Threat to life: maximum'
        this.note3 = 'Probability of survival ≤10%'
      }
    }
  }
}
