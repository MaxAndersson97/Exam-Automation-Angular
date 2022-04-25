import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';

@Component({
  selector: 'app-shared',
  templateUrl: './shared.component.html',
  styleUrls: ['./shared.component.scss']
})
export class SharedComponent implements OnInit {
  @ViewChild('format_type') formatModal: ModalDirective;
  constructor() { }

  ngOnInit() {
  }
  
  showFormatNote() {
    this.formatModal.show();
  }
}
