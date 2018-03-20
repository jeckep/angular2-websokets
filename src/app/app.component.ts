import {Component} from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  serverUrl = 'http://193.106.74.234:8081/ws';
  matrixId = 2;
  stompClient;
  token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOlsidGVzdGp3dHJlc291cmNlaWQiXSwidXNlcl9maXJzdF9uYW1lIjoiQWRtaW4iLCJ1c2VyX2lkIjoxLCJ1c2VyX2xhc3RfbmFtZSI6IuKEljEiLCJ1c2VyX25hbWUiOiJhZG1pbiIsInNjb3BlIjpbInJlYWQiLCJ3cml0ZSJdLCJleHAiOjE1MjE1ODQ4ODksImF1dGhvcml0aWVzIjpbIlRFU1RfR1JPVVBfUk9MRSIsIk1BVFJJWF81X0VYUE9SVCIsIk1BVFJJWF9DT05GSUdfQURNSU4iLCJVU0VSX0FETUlOIiwiU09VUkNFX0FETUlOIiwiTUFUUklYXzFfUkVBRCIsIk1BVFJJWF8xX0FETUlOIiwiTUFUUklYXzJfQURNSU4iLCJNQVRSSVhfMV9FWFBPUlQiLCJNQVRSSVhfMV9XUklURSIsIkFETUlOIiwiTUFUUklYX0FETUlOIl0sImp0aSI6IjBhYmRmODk2LWZkNzAtNGIxMy1hZjhmLTljZjc3YjIyOWI2ZCIsImNsaWVudF9pZCI6InRlc3Rqd3RjbGllbnRpZCJ9.kIMy60cpRVOOKLKeldNDlBAcGrfVg6En8izoZoTxWTY';

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
    // TODO correctly disconnect
  }
}
