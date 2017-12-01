import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import {HttpModule, JsonpModule} from '@angular/http';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';

/*SERVIÇOS*/
import { AuthGuardProvider } from '../providers/auth-guard/auth-guard';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
/**/



import { MyApp } from './app.component';

/* MODULOS */
import { LoginPageModule } from '../pages/login/login.module';
import { HomePageModule } from '../pages/home/home.module';

import { AlterarDadosCadastraisPageModule } from '../pages/alterar-dados-cadastrais/alterar-dados-cadastrais.module';
import { CadastrarPesoPageModule } from '../pages/cadastrar-peso/cadastrar-peso.module';




@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    JsonpModule,
    IonicStorageModule.forRoot({
        name: '__mydb',
        driverOrder: ['indexeddb', 'sqlite', 'websql']
       }  
    ),
    LoginPageModule,
    HomePageModule,
    AlterarDadosCadastraisPageModule,
    CadastrarPesoPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthGuardProvider,
    AuthServiceProvider,
    BluetoothSerial
  ]
})
export class AppModule {}
