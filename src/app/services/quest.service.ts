import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QuestService {

  constructor(private http: HttpClient) { }
  
  get(url: string) {
    console.log('get it!!!!');
    return this.http.get(url);
  }

}
