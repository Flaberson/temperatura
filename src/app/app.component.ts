import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

export interface Temperatura {
  cidade: string;
  temperatura: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {  
  apiUrl = "http://localhost:8080/wather?"; 
  cidade : string = "";
  latitude : string = "";
  longitude : string = "";
  temperatura : number = 0;
  
  public resultado: Temperatura ={
    cidade: '',
    temperatura: 0,
  }

  constructor(private http : HttpClient) {
    this.coordenadasLocal();
  }

  previsaoTempo() {
     //FAZ A REQUISIÇÃO NO SERVIÇO REST
      this.http.get<Temperatura>(this.apiUrl +"latitude="+ this.latitude + "&longitude=" + this.longitude)
      .subscribe((data: Temperatura) => {
        this.resultado = {
          cidade: (data as any).cidade,
          temperatura: (data as any).temperatura
        }
        this.cidade = this.resultado.cidade;
        this.temperatura = this.resultado.temperatura;
      });
  }

  //PEGA LOCALIZAÇÃO AUTOMÁTICA DO CLIENTE
  coordenadasLocal() {
    this.getPosition().then(pos => {
    console.log('Positon: '+pos.lng+' ' + pos.lat);
    this.latitude = pos.lat;
    this.longitude = pos.lng;
    });
  }

  //LOCALIZAÇÃO NAVEGADOR
  getPosition(): Promise<any>{
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resp => {
          resolve({lng: resp.coords.longitude, lat: resp.coords.latitude});
        },
        err => {
          reject(err);
        });
    });
  }
}