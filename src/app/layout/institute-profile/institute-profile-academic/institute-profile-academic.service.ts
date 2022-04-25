import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { InstituteService } from 'src/app/institute.service';
import { BaseService } from 'src/app/services/base.service';
import { WelcomeService } from 'src/app/welcome/welcome.service';

@Injectable({
  providedIn: 'root'
})
export class InstituteProfileAcademicService extends BaseService {

  
  constructor(private welcomeService: WelcomeService, private http: HttpClient) {
    super(http)
  
}


  
  /** GET Institute DDL Class from the server */
  getInstituteDDLClass(): Observable<any> {
    const urlStr = `/api/institute/ddlclass_byrole?BoardID=:BoardID&MediumID=:MediumID&ClassIdFrom=:ClassIdFrom&ClassIdTo=:ClassIdTo`;
    let url = urlStr
                .replace(':BoardID', this.welcomeService.getBoardId())
                .replace(':MediumID', this.welcomeService.getMediumId())
                .replace(':ClassIdFrom', this.welcomeService.getClassIdFrom())
                .replace(':ClassIdTo', this.welcomeService.getClassIdTo());
    return  this.httpGet(url)
        .pipe(
            map(response => response['data']),
        );
}

  

  

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
  }
}
