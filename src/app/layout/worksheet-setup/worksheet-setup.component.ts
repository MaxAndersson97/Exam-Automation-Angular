import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
export let browserRefresh = false;
@Component({
  selector: 'app-worksheet-setup',
  templateUrl: './worksheet-setup.component.html',
  styleUrls: ['./worksheet-setup.component.scss']
})
export class WorksheetSetupComponent implements OnInit {
  subscription: Subscription;
  constructor() {
   }

  ngOnInit() {
  }

}
