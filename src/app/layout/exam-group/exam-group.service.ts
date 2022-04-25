import { Injectable } from '@angular/core';
import { InstituteService } from 'src/app/institute.service';
import { HttpClient }  from '@angular/common/http';
import { Institute } from 'src/app/institute';
import { AddExamGroup } from '../exam-group/add-exam-group'
import { WelcomeService } from 'src/app/welcome/welcome.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ExamGroupService {

  constructor(private instituteService: InstituteService,
    private http: HttpClient,
    private welcomeService: WelcomeService) { }
   
    //add exam group
  addExamGroup(addExamGroup: AddExamGroup): Observable<any> {
    const url = environment.apiUrlIp +`/api/examgroup/add`;
    const institute: Institute = this.instituteService.getInstitute();
    const { InstituteID, InstituteUserID } = institute;
    const BoardID= this.welcomeService.getBoardId();
    const MediumID= this.welcomeService.getMediumId();
    addExamGroup = { ...addExamGroup, InstituteID, InstituteUserID, BoardID, MediumID };
    // const params = new HttpParams()
    //     .set('InstituteUserID', InstituteUserID);
    return this.http.post(url, addExamGroup);
  }

  // get exam group api/examgroup/list?InstituteID=E6F45159-38C5-44F2-8A78-D1D50CDA2B3D
  
  getExamGroupList(papertype): Observable<any> {
    console.log(papertype);
    const institute: Institute = this.instituteService.getInstitute();
    const { InstituteID} = institute;
    const url = environment.apiUrlIp+ "/api/examgroup/list?InstituteID=" + InstituteID+ '&papertype='+ papertype;
    return this.http.get(url).pipe(
      map(response => response['data'])
    );
  }

  examGroupChnageStatus(examgroupId){
    let url = environment.apiUrlIp+ '/api/examgroup/statuschange?ExamGroupID=' + examgroupId;
    return this.http.get(url);
  }

}
