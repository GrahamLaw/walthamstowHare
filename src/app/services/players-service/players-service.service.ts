import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlayersService {

  constructor(private http: HttpClient) { }
  
  get(url: string) {
    console.log('get it!!!!');
    return this.http.get(url);
  }

  save(url: string) {
    console.log('save it!!!!');
    return this.http.get(url);
  }
}
