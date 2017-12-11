import { Injectable } from '@angular/core';
import { HTTP, HTTPResponse } from '@ionic-native/http';
import { ServiceBaseProvider } from '../service-base'
import 'rxjs/add/operator/map';

/*
  Generated class for the ServicesProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class ServicesProvider extends ServiceBaseProvider{

  constructor(public http: HTTP) {
    super(http)
  } 

  getHistorico(idUsuario):Promise<HTTPResponse>{
    return this.http.get( this.urlApi + "usuarios/"+idUsuario+"/registrosPeso?_expand=usuario&&_sort=id&_order=asc", {}, {})
  }

  postPeso(idUsuario,peso):Promise<HTTPResponse>{
    let now:Date = new Date()
    return this.http.post(this.urlApi + "registrosPeso",{
      usuarioId: parseInt(  idUsuario ),
      peso: parseFloat( peso ),
      dataHora: now.toLocaleDateString() + " " + now.toLocaleTimeString()
    },{});
  }

  deletePeso(idPeso):Promise<HTTPResponse>{
    return this.http.delete( this.urlApi + "registrosPeso/"+idPeso , {}, {});
  }

  posUsuario(usuario):Promise<HTTPResponse>{
    return this.http.post(this.urlApi + "usuarios",usuario,{});
  }

  patchUsuario(usuario:any):Promise<HTTPResponse>{
    return this.http.patch(this.urlApi + "usuarios/"+usuario.id , {
      nome: usuario.nome,
      dtNascimento: usuario.dtNascimento,
      sexo: usuario.sexo,
      email: usuario.email
    } , {});
  }

}
