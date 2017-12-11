import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { LoginPage } from '../login/login';
import { AlertController } from 'ionic-angular';
import { ServicesProvider } from '../../providers/services/services'

/**
 * Generated class for the CadastrarUsuarioPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage(
  { name:"cadastrarUsuario" }
 )
 
@Component({
  selector: 'page-cadastrar-usuario',
  templateUrl: 'cadastrar-usuario.html',
})
export class CadastrarUsuarioPage {

  private pessoa : FormGroup;
  private erroSenha = null;
  constructor(public services:ServicesProvider, public navCtrl: NavController, public menu:MenuController,   public navParams: NavParams, private AuthServiceProvider:AuthServiceProvider, private formBuilder: FormBuilder, public alertCtrl: AlertController) {
      this.menu.swipeEnable(false);
      this.pessoa = this.formBuilder.group({
        nome: ['', Validators.required],
        usuario: ['' , Validators.required],
        dtNascimento: ['', Validators.required],
        sexo: ['', Validators.required],
        email: ['', Validators.required],
        senha: ['', Validators.required],
        confirmarSenha:['', Validators.required]
      });
  }

  Cadastrar(){
    this.verificarSenha();
  }

  clear(){
    this.pessoa = this.formBuilder.group({
      nome: ['', Validators.required],
      usuario: ['' , Validators.required],
      dtNascimento: ['', Validators.required],
      sexo: ['', Validators.required],
      email: ['', Validators.required],
      senha: ['', Validators.required],
      confirmarSenha:['', Validators.required]
    });
  }

  

  ionViewDidLoad() {
    console.log('ionViewDidLoad CadastrarPage');
  }

  voltarLogin(){
    this.navCtrl.push("login"); 
  }

  openLogin(){
    this.navCtrl.push(LoginPage);
  }

  verificarSenha(){
    if(this.pessoa.value.senha == this.pessoa.value.confirmarSenha){
      /*let v = this.pessoa.value.dtNascimento.split('-');
      this.pessoa.value.dtNascimento = v[2] + "/" + v[1] + "/" + v[0];*/
      this.services.posUsuario(this.pessoa.value).then(value=>{
        this.showSucesso();
        this.clear();
      },erro=>{
        console.log("erro")
      })


    }else{
      this.showErro();
      console.log('Senha incompatível!')
    }
  }

  showSucesso() {
    let alert = this.alertCtrl.create({
      title: this.pessoa.value.nome,
      subTitle: 'Conta cadastrada com sucesso!',
      message: "Usuário:" +this.pessoa.value.usuario+" Senha:********",
      buttons: ['OK']
    });
    alert.present();
  }

  showErro() {
    let alert = this.alertCtrl.create({
      title: 'Senha!',
      subTitle: 'Senha não confirma!',
      buttons: ['OK']
    });
    alert.present();
  }

}
