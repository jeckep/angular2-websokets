import {Component} from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  serverUrl = 'http://127.0.0.1:8080/ws';
  matrixId = 2;
  stompClient;
  token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOlsidGVzdGp3dHJlc291cmNlaWQiXSwidXNlcl9maXJzdF9uYW1lIjoiQWRtaW4iLCJ1c2VyX2lkIjoxLCJ1c2VyX2xhc3RfbmFtZSI6IkFkbWluIiwidXNlcl9uYW1lIjoiYWRtaW4iLCJzY29wZSI6WyJyZWFkIiwid3JpdGUiXSwiZXhwIjoxNTE5ODU0OTY2LCJhdXRob3JpdGllcyI6WyJNQVRSSVhfM19XUklURSIsIkFETUlOIl0sImp0aSI6ImMwYTA2M2Q2LTQ0MzctNDlkNC1hMjY0LTRlM2I2YzhhN2M1ZSIsImNsaWVudF9pZCI6InRlc3Rqd3RjbGllbnRpZCJ9.9mib_w_X5PqlELRynz_2GUoisaozCc3GaQ_Mty6aAIY';

  constructor() {
    this.initializeWebSocketConnection();
  }

  initializeWebSocketConnection() {
    const ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
    // TODO uncomment after develop
    // this.stompClient.debug = null;
    const that = this;
    this.stompClient.connect({'X-Authorization': this.token}, function (frame) {
      that.stompClient.subscribe('/matrix/flags/' + that.matrixId, (message) => {
        if (message.body) {
          console.log(message.body);
          // TODO save dynamic matrix document flags
        }
      }, {'X-Authorization': that.token});
    });
  }
}
