import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { HttpParams, HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { getBodyNode } from '@angular/animations/browser/src/render/shared';
import { InstituteService } from 'src/app/institute.service';
import { Institute } from 'src/app/institute';
import { WelcomeService } from 'src/app/welcome/welcome.service';

@Injectable({
  providedIn: 'root'
})
export class CustomContentService {

  constructor(private instituteService: InstituteService,
    private http: HttpClient,private welcomeService: WelcomeService) { }

  /** GET chepters by subjects */
  getTextbookSettingDetails(SubjectID: string) {
    const url = environment.apiUrlIp + `/api/ccstextbookbolution/gettextbooks`;
    const institute: Institute = this.instituteService.getInstitute();
    const { InstituteID, InstituteUserID } = institute;
    const params ={
    'InstituteID': InstituteID,
     'SubjectID': SubjectID
    }
    return this.http.post(url, params ).pipe(      
      map(response => response['data'])
  );  
  }
  
  getAllSettings() {
    const url = environment.apiUrlIp + `/api/ccscontentpanel/list`;
    const institute: Institute = this.instituteService.getInstitute();
    const { InstituteID, InstituteUserID } = institute;
    const params ={
    'InstituteID': InstituteID,
     'InstituteUserID': InstituteUserID
    }
    return this.http.post(url, params).pipe(      
      map(response => response['data'])
  );  
  };

  saveCCS(body){
    const url = environment.apiUrlIp + `/api/ccscontentpanel/save`;
    const institute: Institute = this.instituteService.getInstitute();
    const { InstituteID, InstituteUserID } = institute;
    const params ={
    'lstCCS_ContentPanelListInfomember': body,
    'InstituteID': InstituteID,
     'InstituteUserID': InstituteUserID
    }
    return this.http.post(url, params);   
  }

  savetextbooksettings(body){
    const url = environment.apiUrlIp + `/api/ccstextbookbolution/savetextbooksettings`;
    const institute: Institute = this.instituteService.getInstitute();
    const { InstituteID, InstituteUserID } = institute;
    const params ={...body,
    'InstituteID': InstituteID,
     'InstituteUserID': InstituteUserID
    }
    return this.http.post(url, params);   
  }

  getTextbooPDFDetails(SubjectID){
    const url = environment.apiUrlIp + `/api/ccstextbookbolution/gettextbookspdf`;
    const institute: Institute = this.instituteService.getInstitute();
    const { InstituteID, InstituteUserID } = institute;
    const params ={
    'InstituteID': InstituteID,
     'SubjectID': SubjectID
    }
    return this.http.post(url, params ).pipe(      
      map(response => response['data'])
  );    
  }


  savetextbookPDFsettings(body){
    const url = environment.apiUrlIp + `/api/ccstextbookbolution/savetextbookpdfsettings`;
    const institute: Institute = this.instituteService.getInstitute();
    const { InstituteID, InstituteUserID } = institute;
    const params ={...body,
    'InstituteID': InstituteID,
     'InstituteUserID': InstituteUserID
    }
    return this.http.post(url, params);   
  }

  getPreviousYearsPapers(SubjectID){
    // const url = environment.apiUrlIp + `/api/ccspreviousyearpaper/list`;
    const url = environment.apiUrlIp + `/api/ccspreviousyearpaper/paper_list`;
    const institute: Institute = this.instituteService.getInstitute();
    const { InstituteID, InstituteUserID } = institute;
    const params ={
    'InstituteID': InstituteID,
     'SubjectID': SubjectID,
     'PaperType' : 1
    }
    return this.http.post(url, params ).pipe(      
      map(response => response['data'])
  );    
  }

  savePreviousPaperSetting(body){
    const url = environment.apiUrlIp + `/api/ccspreviousyearpaper/save`;
    const institute: Institute = this.instituteService.getInstitute();
    const { InstituteID, InstituteUserID } = institute;
    const params ={...body,
    'InstituteID': InstituteID,
     'InstituteUserID': InstituteUserID
    }
    return this.http.post(url, params);   
  }

  getCCSQestionBank(SubjectID, ClassID){
    const url = environment.apiUrlIp + `/api/ccs_questionbank/list`;
    const institute: Institute = this.instituteService.getInstitute();
    const { InstituteID, InstituteUserID } = institute;
    const params ={
    'InstituteID': InstituteID,
    'SubjectID': SubjectID,
    'ClassID': ClassID,
    }
    return this.http.post(url, params ).pipe(      
      map(response => response['data'])
  );    
  }

  saveQuesPaperSettings(body){
    const url = environment.apiUrlIp + `/api/ccs_questionbank/save`;
    const institute: Institute = this.instituteService.getInstitute();
    const { InstituteID, InstituteUserID } = institute;
    const params ={...body,
    'InstituteID': InstituteID,
     'InstituteUserID': InstituteUserID
    }
    return this.http.post(url, params);
  }

  getCheptersByBCMS(SubjectID, ClassID){
    const url = environment.apiUrlIp + `/api/eapapertemplate/other_source_chapters_list?BoardID=`+ this.welcomeService.getBoardId()+'&MediumID='+this.welcomeService.getMediumId()+ '&ClassID='+ClassID+ '&SubjectID=' + SubjectID;
    
    return this.http.get(url).pipe(      
      map(response => response['data'])
  );  
  };

  getVideoList(body){
    const url = environment.apiUrlIp + `/api/ccs_videomaster/list`;
    const institute: Institute = this.instituteService.getInstitute();
    const { InstituteID, InstituteUserID } = institute;
    const params ={
    'InstituteID': InstituteID,
    'InstituteUserID': InstituteUserID,
    'SubjectID': body.SubjectID,
    'ClassID': body.ClassID,
    "ChapterID": body.ChapterID,
    "TopicID":"00000000-0000-0000-0000-000000000000"
    }
    return this.http.post(url, params ).pipe(      
      map(response => response['data'])
  );  
  }

  saveVideoStatus(body){
    const url = environment.apiUrlIp + `/api/ccs_videomaster/change_vg_status`;
    const institute: Institute = this.instituteService.getInstitute();
    const { InstituteID, InstituteUserID } = institute;
    const params ={...body,
    'InstituteID': InstituteID,
     'InstituteUserID': InstituteUserID
    }
    return this.http.post(url, params);
  }

  addNewVideo(body){
    const url = environment.apiUrlIp + `/api/ccs_videomaster/save`;
    const institute: Institute = this.instituteService.getInstitute();
    const { InstituteID, InstituteUserID } = institute;
    const params ={...body,
    'InstituteID': InstituteID,
     'InstituteUserID': InstituteUserID,
     'BoardID': this.welcomeService.getBoardId(),
     'MediumID':  this.welcomeService.getMediumId(),
     'VideoGroupID': 'EA6B6A7A-9110-4CAD-AD21-95E9FF653C38'
    }
    return this.http.post(url, params);
  }

  getVideoToEdit(VideoMasterID){
    const url = environment.apiUrlIp + '/api/ccs_videomaster/edit?VideoMasterID='+VideoMasterID;
    return this.http.get(url).pipe(      
      map(response => response['data'])
  ); 
  }

  deleteVideo(VideoMasterID){
    const url = environment.apiUrlIp + '/api/ccs_videomaster/delete?VideoMasterID='+VideoMasterID;

    return this.http.post(url, {});
  }


  //getclass global
  getClassWithoutInstitute(){
    const url = environment.apiUrlIp + '/api/ccstextbookbolution/GetClass';
    const params = {
      'BoardID': this.welcomeService.getBoardId(),
      'MediumID': this.welcomeService.getMediumId()
    }
    return this.http.post(url, params).pipe(      
      map(response => response['data'])
  ); 
  }

    //get subject global
    getSubjectWithoutInstitute(ClassID){
      const url = environment.apiUrlIp + '/api/ccstextbookbolution/getsubjects';
      const params = {
        'ClassID': ClassID        
      }
      return this.http.post(url, params).pipe(      
        map(response => response['data'])
      ); 
    }

     //get year global
    getYearMaster(){
      const url = environment.apiUrlIp + 'api/baseclass/year/list';
      return this.http.get(url).pipe(
        map(response => response['data'])
      );
    }

    addSamplePaper(params) {
      const url = environment.apiUrlIp + '/api/samplepaper/save';
      return this.http.post(url, params);
    }

    getPapersListByType(SubjectID,paperType){
      const url = environment.apiUrlIp + `/api/ccspreviousyearpaper/paper_list`;
      const institute: Institute = this.instituteService.getInstitute();
      const { InstituteID, InstituteUserID } = institute;
      const params ={
        'InstituteID': InstituteID,
        'SubjectID': SubjectID,
        'PaperType':paperType
      }
      return this.http.post(url, params ).pipe(      
        map(response => response['data'])
      );
    }

    getPaperById(paperID){
      const url = environment.apiUrlIp + `/api/samplepaper/paper_edit`;
      const params ={
        'PaperSetID': paperID,
      }
      return this.http.post(url, params ).pipe(      
        map(response => response)
      );
    }

    deletePaper(paperObj){
      const url = environment.apiUrlIp + `/api/samplepaper/delete`;
      return this.http.post(url, paperObj ).pipe(      
        map(response => response)
      );
    }

    uplaodPaperFiles(bodyData: any) {
      const url = environment.apiUrlIp + '/api/samplepaper/upload_sample_paper_image';

      const formData = new FormData();
      formData.append('questionpdf', bodyData.QuestionPdf);
      formData.append('answerpdf', bodyData.AnswerPdf);
      formData.append('PaperSetID', bodyData.PaperSetID);
      formData.append('question_title', bodyData.question_title);
      formData.append('question_description', bodyData.question_description);
      formData.append('answer_title', bodyData.answer_title);
      formData.append('answer_description', bodyData.answer_description);
      formData.append('InstituteID', bodyData.InstituteID);

      return  this.http.post(url, formData).pipe(
        map(response => response )
      );
    }

    deletePaperFile(paperObj){
      const url = environment.apiUrlIp + '/api/samplepaper/delete_pdf';
      return this.http.post(url, paperObj ).pipe(      
        map(response => response)
      );
    }
}
