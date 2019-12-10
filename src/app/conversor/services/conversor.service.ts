import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { ConversaoResponse, Conversao } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ConversorService {

  private readonly BASE_URL = 'http://data.fixer.io/api/latest?access_key=3f0ba3ef6ac1589cb69c5bfc2fb306f3';

  constructor(private http: HttpClient) { }

  converter(conversao: Conversao): Observable<any> {
    let params = `&symbols=${conversao.moedaPara}`;

    console.log('>>>>>>>>>>>>>>>>' , this.http.get(this.BASE_URL + params));

    return this.http.get(this.BASE_URL + params);
  }

  cotacaoPara(conversaoResponse: ConversaoResponse, conversao: Conversao): number {
    if (conversaoResponse === undefined) {
      return 0;
    }
    return conversaoResponse.rates[conversao.moedaPara];
  }

  cotacaoDe(conversaoResponse: ConversaoResponse, conversao: Conversao): string {
    if (conversaoResponse === undefined) {
      return '0';
    }
    return (1 / conversaoResponse.rates[conversao.moedaPara]).toFixed(4);
  }

  dataCotacao(conversaoResponse: ConversaoResponse): string {
    if (conversaoResponse === undefined) {
      return '';
    }
    return conversaoResponse.date;
  }
}
