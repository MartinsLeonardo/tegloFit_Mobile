import { Injectable } from '@angular/core';
import { HTTP, HTTPResponse } from '@ionic-native/http';
import { Storage } from '@ionic/storage';
import { ServiceBaseProvider } from '../service-base'

/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class AuthServiceProvider extends ServiceBaseProvider{
  public token: string;


  constructor(public http: HTTP, public storage:Storage ) {
      super(http)
  }

  
    /*getToken() {
        if (!this.loggedIn()) {
            return null;
        } else {
            let user = JSON.parse(localStorage.getItem('currentUser'));
            return user.token;
        }
    }

    loggedIn():boolean {
        this.storage.get('currentUser').then((val) => {
            console.log('Your age is', val);
        });

        //console.log( this.storage.keys() )
 
       this.storage.keys().then( (value)=>{
           console.log(value)
       })

      return true
      
    }*/

    logon(usuario,senha):Promise<HTTPResponse> {
        return  this.http.get(this.urlApi + "usuarios/?usuario="+usuario+"&&senha="+senha , {}, {})
    }

    getUser():Promise<Storage>{
        return this.storage.get('currentUser')
    }


    setStorage(usuario){
        this.storage.set('currentUser', {
            id: usuario.id,
            username: usuario.usuario, 
            nome: usuario.nome,
            dtNascimento: usuario.dtNascimento,
            sexo: usuario.sexo,
            email: usuario.email,
        } )
    }

    logout(): void {
        this.token = null;
        this.storage.remove("currentUser")
        
    }

}
