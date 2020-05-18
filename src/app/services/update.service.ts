import { Injectable } from '@angular/core';
import { SocketService } from './socket.service';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UpdateService {

  update: Subject<any>;

  constructor(private socketService: SocketService) {
    this.update = <Subject<any>>socketService
      .connect()
  }

  sendUpdate(msg) {
    this.update.next(msg);
  }
}
