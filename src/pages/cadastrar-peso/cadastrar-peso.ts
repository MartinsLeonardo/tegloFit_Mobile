import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';
/**
 * Generated class for the CadastrarPesoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */



@IonicPage(
  { name:"cadastrarPeso" }
 )
@Component({
  selector: 'page-cadastrar-peso',
  templateUrl: 'cadastrar-peso.html',
})
export class CadastrarPesoPage {

  isOn:boolean;
  list:any;
  scanning:boolean = false;
  constructor(public alertCtrl:AlertController,public navCtrl: NavController, public navParams: NavParams, public bluetoothSerial:BluetoothSerial) {}

  ionViewDidLoad() {
    this.isEnabled()
    //this.bluetoothSerial.list().then((val):any=>{console.log(val)},(erro):any=>{})
    console.log('ionViewDidLoad CadastrarPesoPage');
  }

  startScanning(){
    this.scanning = true;
    this.bluetoothSerial.discoverUnpaired().then( (val:any)=>{
      this.list = val
      this.scanning = false;
    }, (error:any)=>{
      console.log(error)
    });
    
  }

  setEnabled(){
    this.bluetoothSerial.enable().then(()=>{
      this.isEnabled()
    },()=>{
      this.isOn = false
    })
  }

  isEnabled(){
    this.bluetoothSerial.isEnabled().then(val=>{this.isOn = true; this.startScanning()},err=>{this.isOn = false})
  }

}
