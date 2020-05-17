import { Injectable } from '@angular/core';
import { Character } from '../models/character';
import { HttpClient } from '@angular/common/http';
import { config } from '../configs/config';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class CharacterService {

  constructor(private http: HttpClient) { }

  apiUrl = `${config.apiUrl}/characters`;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

  getAll() {
    return this.http.get<any>(this.apiUrl);
  }

  add(character) {
    return this.http.post<any>(this.apiUrl, character, this.httpOptions);
  }

  update(character: Character) {
    return this.http.put<any>(`${this.apiUrl}/${character._id}`, character, this.httpOptions);
  }

  delete(character: Character) {
    return this.http.delete<any>(`${this.apiUrl}/${character._id}`);
  }

}

