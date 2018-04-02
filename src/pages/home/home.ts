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
  private url: string = "http://homws.websupply.com.br/WS_REST_Exemplo/api/values/";

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
    this.processos = this.noFilter;

    alert('teste');

    
    //this.processos = this.noFilter.filter((item) => {
    //  return item.data.title.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1;
    //});
  }
}
