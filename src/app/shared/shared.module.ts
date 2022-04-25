import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedComponent } from "./shared.component";
import { SharedRoutingModule } from "./shared-routing.module";
import { BsDropdownModule, ModalModule, PopoverModule } from "ngx-bootstrap";

@NgModule({
  declarations: [SharedComponent],
  imports: [
    CommonModule, 
    SharedRoutingModule,
    PopoverModule.forRoot(),
    BsDropdownModule.forRoot(),
    ModalModule.forRoot()],
  exports: [SharedComponent]
})
export class SharedModule {}