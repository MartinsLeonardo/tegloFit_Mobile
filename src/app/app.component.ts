import { Component, ViewChild } from '@angular/core';
import { Nav, Platform,  App, MenuController, LoadingController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthGuardProvider } from '../providers/auth-guard/auth-guard';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { AlterarDadosCadastraisPage } from '../pages/alterar-dados-cadastrais/alterar-dados-cadastrais';
import { CadastrarPesoPage } from '../pages/cadastrar-peso/cadastrar-peso';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';



@Component({
  selector: 'page-app',
  templateUrl: 'app.html',
  providers: [AuthGuardProvider,AuthServiceProvider]
})
export class TegloFit {
 
  @ViewChild(Nav) nav: Nav; 

  pages: Array<{title: string, component: any, icon:any}>;

  rootPage: any = LoginPage;
  usuario:any;


  constructor(public AuthServiceProvider:AuthServiceProvider,public loading:LoadingController, public app: App,  public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, private AuthGuard:AuthGuardProvider) {
    this.initializeApp();
    this.loadMenu()
  }


  getUser(){
    if(!this.usuario){
      let loader = this.loading.create({});
      loader.present().then(() => {
        this.AuthServiceProvider.getUser().then( (val:any)=>{
          //console.log("entrou")
          if(val){
            this.usuario = val.username
          }
        },err=>{})
        loader.dismiss();
      })
    }
  }

  loadMenu(){
     this.pages = [
            {title: 'Histórico de Peso', component: HomePage, icon: "document" },
            {title: 'Cadastrar Peso', component: CadastrarPesoPage, icon: "md-walk" },
            {title: 'Alterar Dados Cadastrais', component: AlterarDadosCadastraisPage, icon: "create"}
     ];
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
   
  
      this.nav.setRoot(page.component);
    
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  alterarDadosCadastrais(){
    this.nav.setRoot(AlterarDadosCadastraisPage);
  }

 sair(){
    this.AuthServiceProvider.logout()
    this.usuario =  null
    this.app.getRootNav().setRoot(LoginPage);
 }

}
