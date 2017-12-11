import { Component  , ViewChild} from '@angular/core';
import {Nav,  IonicPage, NavController, NavParams, MenuController,LoadingController, AlertController  } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { ServicesProvider } from '../../providers/services/services';
import { CadastrarPesoPage } from '../cadastrar-peso/cadastrar-peso'
import { Chart } from 'chart.js';
/**
 * Generated class for the HomePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage(
 { name:"home" }
)



@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [AuthServiceProvider]
})
export class HomePage {
  @ViewChild(Nav) nav: Nav; 
  
  
  @ViewChild('lineCanvas') lineCanvas;
  lineChart: any;


  searchQuery: string = '';
  historicos:any;
  idUsuario:any;
  nomeUsuario:any;
  pesosGrafico:Array<number> = [];
  labelsGrafico:Array<string> = [];

  constructor(public alertCtrl: AlertController, public services:ServicesProvider , public navCtrl: NavController, public menu:MenuController, public loading: LoadingController,  public navParams: NavParams, private AuthServiceProvider:AuthServiceProvider) {
    let loader = this.loading.create({
      content: 'Aguarde, buscando dados do usuário...',
    }); 
    loader.present().then(() => { 
        this.AuthServiceProvider.getUser().then( (val:any)=>{
            this.idUsuario = val.id
            this.nomeUsuario = val.nome
          })
          this.getHistoricos('listar')
          loader.dismiss();    
    })
  }

  ionViewDidLoad() {
    this.getLineChart()
  }

 

  getHistoricos(acao){
    let loader = this.loading.create({
      content: 'Aguarde, buscando histórico...',
    });

    loader.present().then(() => {
     this.services.getHistorico(this.idUsuario).then( (val:any)=>{
        if(acao == "excluir"){
          this.limparGrafico()
        }
        let data = JSON.parse(val.data)
        this.historicos = data
        if(data.length == 0){
          let alert = this.alertCtrl.create({
            title: 'Atenção '+this.nomeUsuario,
            subTitle: 'Você ainda não possui um ou mais peso(s) cadastrado(s)...',
            buttons: ['OK']
          });
          alert.present();
        }else{
          this.historicos.forEach( (val:any)=>{
              val.peso = parseFloat( val.peso ).toFixed(1)
          })
          

          if(acao != "buscar" ){
            this.montarGrafico()
          }
          
         
        }
    
        
     })
     loader.dismiss();
    });
  }

  getItems(ev: any) {
    let val = ev.target.value;

    if (val && val.trim() != '') {
      this.historicos = this.historicos.filter((item) => {
        return (item.dataHora.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }else{
      this.getHistoricos('buscar')
    }
  }

  excluirPeso(idPeso){
      this.services.deletePeso(idPeso).then(val=>{
        if(val.status == 200 || val.status == 201){
          this.getHistoricos('excluir')
        }
      })
  }

  cadastrarPeso(){
    this.nav.setRoot(CadastrarPesoPage);
  }
  
  sair(){
      this.AuthServiceProvider.logout()
      this.navCtrl.push("login")
  }





  //CHART.JS GRAFICO

  limparGrafico(){
    for(var x = 0; x < this.historicos.length; x++){
      this.labelsGrafico.pop()
        this.pesosGrafico.pop()         
    }
    this.lineChart.update()
  }

  montarGrafico(){
    this.historicos.forEach( (val:any)=>{
        let data = val.dataHora.split(' ')[0]
        data = data.split('/')
      
        this.labelsGrafico.push( data[0]+"-"+data[1] );
        this.pesosGrafico.push( val.peso )
        
    })
    this.lineChart.update();
  }



 getLineChart(){
  this.lineChart = new Chart(this.lineCanvas.nativeElement, {
    type: "line",
    data: {
      labels: this.labelsGrafico,
      datasets: [
        {
          label: '',
          fill: false,
          lineTension: 0.1,
          backgroundColor: "rgba(75,192,192,0.4)",
          borderColor: "rgba(75,192,192,1)",
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: "rgba(75,192,192,1)",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(75,192,192,1)",
          pointHoverBorderColor: "rgba(220,220,220,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: this.pesosGrafico,
          spanGaps: false,
        }
      ]
    },
    options:  {
      legend: {
          display: false,
      }
    }
  });

 }
}
