import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
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
})
export class AlterarDadosCadastraisPage {

  private form : FormGroup;  

  constructor(public navCtrl: NavController, public navParams: NavParams,  private formBuilder: FormBuilder) {
    this.loadForm()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AlterarDadosCadastraisPage');
  }

  loadForm(){
    this.form = this.formBuilder.group({
      usuario: ['Allisson Mateus', Validators.required],
      email: ['allissonmateus@gmail.com', Validators.required],
      peso: [80, Validators.required],
      cidade: ['Palmas', Validators.required],
      estado: ['Tocantins', Validators.required],
      contato: ['(63)98145-2573', Validators.required]
    });
  }

}
