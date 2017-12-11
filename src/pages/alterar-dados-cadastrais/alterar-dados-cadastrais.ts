import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController ,AlertController} from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { ServicesProvider } from '../../providers/services/services';
/**
 * Generated class for the AlterarDadosCadastraisPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage(
  { name:"alterarDadosCadastrais" }
 )
 
@Component({
  selector: 'page-alterar-dados-cadastrais',
  templateUrl: 'alterar-dados-cadastrais.html',
  providers: [AuthServiceProvider, ServicesProvider]
})
export class AlterarDadosCadastraisPage {

  private form : FormGroup;  
  usuario:any = {};
  

  constructor(public alertCtrl: AlertController,public AuthServiceProvider:AuthServiceProvider, public services:ServicesProvider, public loading:LoadingController, public navCtrl: NavController, public navParams: NavParams,  private formBuilder: FormBuilder) {
    this.loadForm()
    let loader = this.loading.create({
      content: 'Aguarde, carregando...'
    });
    loader.present().then(() => {
      this.AuthServiceProvider.getUser().then( (val:any)=>{
         this.usuario = val
         this.preencherForm()
      },err=>{})
      loader.dismiss();
    })
   
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AlterarDadosCadastraisPage');
  }

  loadForm(){
    this.form = this.formBuilder.group({
      nome: ['', Validators.required],
      dtNascimento: ['', Validators.required],
      email: ['' , Validators.required],
      sexo: ['', Validators.required]
    });
  }

  preencherForm(){
    this.form = this.formBuilder.group({
      nome: [this.usuario.nome, Validators.required],
      dtNascimento: [this.usuario.dtNascimento, Validators.required],
      email: [this.usuario.email , Validators.required],
      sexo: [this.usuario.sexo, Validators.required]
    });
  }

  alterarUsuario(){
    let loader = this.loading.create({
      content: 'Aguarde, alterando cadastro...'
    });
    loader.present().then(() => {
      //this.AuthServiceProvider.getUser().then( (val:any)=>{
        this.usuario.nome = this.form.value.nome
        this.usuario.dtNascimento = this.form.value.dtNascimento
        this.usuario.email = this.form.value.email
        this.usuario.sexo = this.form.value.sexo
        this.services.patchUsuario(this.usuario).then(val=>{
            this.AuthServiceProvider.setStorage(this.usuario);
            this.sucesso()
        },err=>{
          this.falha()
        })
      //},err=>{})
      loader.dismiss();
    })
  }


  sucesso(){
    let alert = this.alertCtrl.create({
      title: 'Sucesso',
      subTitle: "Dados cadastrais alterado",
      buttons: ['OK']
    });
    alert.present();
  }

  falha(){
    let alert = this.alertCtrl.create({
      title: 'Falha',
      subTitle: "Não foi possível alterar os dados cadastrais",
      buttons: ['OK']
    });
    alert.present();
  }

}
