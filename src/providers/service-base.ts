import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the ServicesProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class ServiceBaseProvider {
  urlApi:string = "http://192.168.0.4:3003/"
  //urlApi:string = "http://192.168.43.196:3003/"
  
  constructor(public http: HTTP) {
    console.log('Hello ServiceBaseProvider Provider');
  }

}
