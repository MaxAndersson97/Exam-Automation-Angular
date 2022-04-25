import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Spinkit } from 'ng-http-loader';
import {ConnectionService} from 'ng-connection-service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';
  APICalls: string = environment.apiUrlIp;
  spinnerStyle = Spinkit;
  hideLoaderOnURL: string = '';
  hideLoaderOnOMRuploadURL: string = '';
  status = 'ONLINE';
  isConnected = true;
  ngOnInit(){
    this.hideLoaderOnURL = this.APICalls+'/api/eastudentmarks/change_appear_status';
    this.hideLoaderOnOMRuploadURL = this.APICalls+'/api/omr/upload_omr_files';
  }

  constructor(private ConnectionService: ConnectionService, private toastr: ToastrService,){
    this.ConnectionService.monitor().subscribe(isConnected =>  {
      this.isConnected = isConnected;
      if(this.isConnected){
        this.status = "ONLINE";
        this.toastr.success("Internet connected successfully");
      } else {
        this.status = "OFFLINE"
        this.toastr.error("Please check your Internet Connection");
      }
    });
  }
 
}
