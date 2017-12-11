import { Component, ViewChild } from '@angular/core';
import { Nav, IonicPage, NavController, NavParams, AlertController, App } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { AuthGuardProvider } from '../../providers/auth-guard/auth-guard';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { HomePage } from '../../pages/home/home'

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage({
  name: "login"
})


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers:[AuthGuardProvider,AuthServiceProvider]
})
export class LoginPage {
  @ViewChild(Nav) nav: Nav;

  // Our childs for different charts
 // We would be using these for canvas elements

 
  
  private form : FormGroup;  
   

  constructor(public app:App, public navCtrl: NavController , private AuthGuard:AuthGuardProvider , private formBuilder: FormBuilder, private storage: Storage, public alertCtrl: AlertController, private AuthServiceProvider:AuthServiceProvider ) {
    this.loadForm()
  }



     

  

  loadForm(){
    this.form = this.formBuilder.group({
      usuario: ['', Validators.required],
      senha: ['', Validators.required],
    });
  }


 
  logForm(){
   
    this.AuthServiceProvider.logon(this.form.value.usuario ,  this.form.value.senha).then(val=>{
            let ret = JSON.parse( val.data );
            if(ret.length == 0){
              let alert = this.alertCtrl.create({
                title: 'Falha',
                subTitle: 'Usuário ou Senha Inválido(s)',
                buttons: ['OK']
              });
              alert.present();
              this.form.value.usuario = this.form.value.senha = ""
            }else{
              this.AuthServiceProvider.setStorage(ret[0])
              this.app.getRootNav().setRoot(HomePage);
            }    
      },error=>{
        let alert = this.alertCtrl.create({
          title: 'Falha',
          subTitle: 'Falha na conexão com o banco!',
          buttons: ['OK']
        });
        alert.present();
      })
  }

  openCadastrarUsuario(){
    this.navCtrl.push("cadastrarUsuario");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }






}
