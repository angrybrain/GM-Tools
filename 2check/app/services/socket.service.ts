import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';
import * as Rx from 'rxjs';
import { config } from '../configs/config';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private socket;

  constructor() { }

  connect(): Rx.Subject<MessageEvent> {

    this.socket = io(config.socketUrl);

    let observable = new Observable(observer => {
      this.socket.on('update', () => {
        console.log('data updated');
        observer.next();
      })
      return () => {
        this.socket.disconnect();
      }
    });

    let observer = {
      next: () => {
        this.socket.emit('update');
      }
    };

    return Rx.Subject.create(observer, observable);
  }
}
