import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController  } from 'ionic-angular';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';
import { ServicesProvider } from '../../providers/services/services';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { Storage } from '@ionic/storage';
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
  providers: [ServicesProvider]
})
export class CadastrarPesoPage {

  
  isOn:boolean;
  isConnect:boolean;
  list:any = [];
  listSyn:any = []
  scanning:boolean = false;
  connecting:boolean = false;
  //deviceConnect:any = {}
  peso:any=""
  idUsuario:any;
  usuario:any;
  balanca:any;

  constructor(public storage:Storage, public AuthServiceProvider:AuthServiceProvider, public services:ServicesProvider, public loadingCtrl: LoadingController, public alertCtrl:AlertController,public navCtrl: NavController, public navParams: NavParams, public bluetoothSerial:BluetoothSerial) {
  }

  ionViewDidLoad() {
    this.isEnabledDevice()
    this.AuthServiceProvider.getUser().then( (val:any)=>{
      this.idUsuario = val.id
      this.usuario = val.username
    })
  }


  testPostPeso(){
    let alert = this.alertCtrl.create({
      title: 'Confirma o peso recebido ?',
      subTitle: 'Peso: 30.0kg',
      buttons: [
        {
          text: 'Ok',
          role: 'Ok',
          handler: () =>{
            let loader = this.loadingCtrl.create({
              content: 'Aguarde, enviando peso...',
            });
        
            loader.present().then(() => {
                this.services.postPeso(this.idUsuario,30.10).then(val=>{
                  let ret = JSON.parse(val.data)
                  let alert = this.alertCtrl.create({
                    title: 'Peso Registrado com Sucesso!',
                    subTitle: "Peso: " + ret.peso + " Data: " +ret.dataHora,
                    buttons: ['OK']
                  });
                  alert.present();
                    
                },err=>{})
                loader.dismiss();
          });
          }
        },
        {
          text: 'Cancelar',
          role: 'Cancelar',
          handler: () =>{
            console.log("No")
          }
        }
      ]
    });
    alert.present();
  }

  getDataDevice(){
    this.bluetoothSerial.available().then((number: any) => {
        this.bluetoothSerial.read().then((data: any) => {
          if(!data){
            let alert = this.alertCtrl.create({
              title: 'Falha',
              subTitle: 'Não foi possível receber o peso do dipositivo, por favor, verifique sua conexão com o mesmo',
              buttons: ['Ok']
            });
            alert.present();
          }else{
            let alert = this.alertCtrl.create({
              title: 'Confirma o peso recebido e deseja cadastro-lo?',
              subTitle: 'Peso: ' + data[0] + "" + data[1] + "" + data[2] + "" + data[3] + "kg",
              buttons: [
                {
                  text: 'Ok',
                  role: 'Ok',
                  handler: () =>{
                      let loader = this.loadingCtrl.create({
                        content: 'Aguarde, enviando peso...',
                      });
                  
                      loader.present().then(() => {
                          this.services.postPeso(this.idUsuario,  parseFloat( data[0] + data[1] + data[2] + data[3] ) ).then(val=>{
                              let ret = JSON.parse(val.data)
                              let alert = this.alertCtrl.create({
                                  title: 'Peso Registrado com Sucesso!',
                                  subTitle: "Peso: " + ret.peso + " Data: " +ret.dataHora,
                                  buttons: ['OK']
                              });
                              alert.present();
                              
                          },err=>{})
                          loader.dismiss();
                      });
                    }
                },
                {
                  text: 'Cancelar',
                  role: 'Cancelar',
                  handler: () =>{
                    console.log("No")
                  }
                }
              ]
            });
              alert.present();
              this.bluetoothSerial.clear();
          } 
        });
    })
  }

  connectDevice(l){
    this.connecting = true;
    let loading = this.loadingCtrl.create({
      content: 'Nome: '+l.name+'\nEndereço: '+l.address+'\nAguarde, conectando...'
    });
    loading.present();
  
    this.bluetoothSerial.connect(l.address).subscribe(()=>{
      this.isConnectedDevice()
      this.connecting = false;
      //this.deviceConnect = l;
      this.storage.set('balanca',l.name)

      this.writeBuffer()
      
      loading.dismiss();
      
      

    },()=>{
        let alert = this.alertCtrl.create({
          title: 'Falha!',
          subTitle: 'Não foi possível conectar ao dispositivo.',
          buttons: ['Ok']
        });
        alert.present();
        this.connecting = false;
        loading.dismiss();
    })
  }


  writeBuffer(){
    this.bluetoothSerial.write(this.usuario).then(()=>{},()=>{})
  }


  disconectDevice(){
    this.bluetoothSerial.disconnect().then(()=>{this.isConnectedDevice()},()=>{})
  }



  startScanning(){
    this.scanning = true;

    let loading = this.loadingCtrl.create({
      content: 'Aguarde, localizando dispositivos...'
    });
  
    loading.present();


    this.bluetoothSerial.discoverUnpaired().then( (val:any)=>{
      /*
     this.bluetoothSerial.list().then(val=>{
       this.listSyn = val;
     },err=>{})*/

      this.list = val
      this.scanning = false;
      loading.dismiss();
    }, (error:any)=>{
      console.log(error)
    });
    
  }

  setEnabled(){
      let loader = this.loadingCtrl.create({
        content: 'Aguarde, habilitando bluetooth...',
      });
  
      loader.present().then(() => {
          this.bluetoothSerial.enable().then(()=>{
            this.isEnabledDevice()
            this.startScanning()
          },()=>{
            this.isOn = false
          })
          loader.dismiss();
    });
  
  }

 
  isConnectedDevice(){
    this.bluetoothSerial.isConnected().then(val=>{
          this.isConnect = true;
          
          let loader = this.loadingCtrl.create({
            content: 'Aguarde, localizando...',
          });
  
          loader.present().then(() => {
            this.storage.get('balanca').then(val=>{
                this.balanca = val
            })

          
            //this.writeBuffer()

            loader.dismiss();
          });
    },err=>{this.isConnect = false; this.startScanning()})
  }


  isEnabledDevice(){
    this.bluetoothSerial.isEnabled().then(val=>{this.isOn = true; this.isConnectedDevice()},err=>{this.setEnabled()})
  }

}
