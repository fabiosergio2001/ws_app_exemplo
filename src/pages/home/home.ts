import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public processos: Array<any>;
  public noFilter: Array<any>;
  public searchTerm: string = ""; 
  private url: string = "http://homws.websupply.com.br/WS_API_Exemplo/api/values/";

  constructor(public navCtrl: NavController,
    public http: Http,
    public loadingCtrl: LoadingController) {

    this.fetchContent();

  }

  fetchContent(): void {

    let loading = this.loadingCtrl.create({
      content: 'Aguarde carregando...'
    });

    loading.present();

    this.http.get(this.url).map(res => res.json())
      .subscribe(data => {
        this.processos = data;
        this.noFilter = data;
        loading.dismiss();
      });
  }

  itemSelected(processo): void {
    alert(processo.TITULO);
  }

  doRefresh(refresher) {

    this.http.get(this.url).map(res => res.json())
      .subscribe(data => {
        this.processos = data;
        this.noFilter = data;
        refresher.complete();
      });
  }

  filterItems() {
    this.processos = [];

    for (var i = 0; i < this.noFilter.length ; i++) {
      if (this.noFilter[i].TITULO.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1) {
        this.processos.push(this.noFilter[i]);
      }

    }    
  }


  doInfinite(infiniteScroll) {

    let paramsUrl = '/'+this.processos[this.noFilter.length-1].NUM_WS;

      this.http.get(this.url + paramsUrl).map(res => res.json())
        .subscribe(data => {
          this.processos = this.processos.concat(data);
          infiniteScroll.complete();
        }); 
  }  

}