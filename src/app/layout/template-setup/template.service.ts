import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { InstituteService } from 'src/app/institute.service';
import { Institute } from 'src/app/institute';
import { HttpParams, HttpClient } from '@angular/common/http';
import { tap, map, catchError } from 'rxjs/operators';
import { WelcomeService } from 'src/app/welcome/welcome.service';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class TemplateService {
  
  constructor(
    private instituteService: InstituteService,
    private http: HttpClient,
    private welcomeService: WelcomeService) { }


    /** GET Institute DDL subject from the server */
    getInstituteDDLSubject(classId: string) {
      const url = environment.apiUrlIp +  `/api/institute/ddlSubject_byrole`;
      const institute: Institute = this.instituteService.getInstitute();
      const { InstituteID, InstituteUserID } = institute;

      const params = new HttpParams()
				.set('BoardID', this.welcomeService.getBoardId())
				.set('MediumID', this.welcomeService.getMediumId())
				.set('InstituteID', InstituteID)
				.set('ClassID', classId);
      return this.http.get(url, { params })
				.pipe(
						map(response => response['data'])
				);
  }

//   get question nature by chepter ids
  getQuestionNature(chepterIds) {
    const url = environment.apiUrlIp +  `/api/questionnature/questioncountlist`;
    return this.http.post(url, chepterIds)
			.pipe(map(response => response['data']));
  }

  // Add new template
    addNewTemplate(addTemplate) {
			const url = environment.apiUrlIp +  `/api/eapapertemplate/add`;
			const institute: Institute = this.instituteService.getInstitute();
			const { InstituteID, InstituteUserID } = institute;
			addTemplate['BoardID'] = this.welcomeService.getBoardId();
			addTemplate['MediumID'] = this.welcomeService.getMediumId();
			addTemplate = { ...addTemplate,
					InstituteID,
					InstituteUserID};
			console.log(addTemplate);
			return this.http.post<any>(url, addTemplate)
	}
	
	// set IsOmr true
    setIsomrpaper(templateId) {
		const url = environment.apiUrlIp +  `/api/eapapertemplate/isomrpaper`;
		return this.http.post<any>(url, {"IsOMRPaper": true,"EAPaperTemplateID": templateId})
}

    //add paper nature
	addPaperNature(paperNatureObj) {
		const url = environment.apiUrlIp + `/api/eapapertemplate/add_paper_nature`;
		console.log(paperNatureObj);
		return this.http.post<any>(url, paperNatureObj)
	}

//get bloom count list
	getBloomtaxonomyQuestioncountlist(chepterIds) {
		const url = environment.apiUrlIp +  `/api/eapapertemplate/bloomtaxonomy_questioncountlist`;
		return this.http.post(url, chepterIds)
				.pipe(map(response => response['data']));
	}
	
	//get difficulty count list
	getDifficultylevelQuestionCountList(chepterIds) {
		const url = environment.apiUrlIp +  `/api/eapapertemplate/difficultylevel_questioncountlist`;
		return this.http.post(url, chepterIds)
				.pipe(map(response => response['data']));
	}

	//get bloom count list for template
	getBloomtaxonomyQuestioncountlisttemp(chepterIds) {
		const url = environment.apiUrlIp +  `/api/eapapertemplate/bloomtaxonomy_questioncountlist_template`;
		return this.http.post(url, chepterIds)
				.pipe(map(response => response['data']));
	}
	
	//get difficulty count list for template
	getDifficultylevelQuestionCountListtemp(chepterIds) {
		const url = environment.apiUrlIp +  `/api/eapapertemplate/difficultylevel_questioncountlist_template`;
		return this.http.post(url, chepterIds)
				.pipe(map(response => response['data']));
	}

	//add bloom and difficulty
	addBloomAndDifficulty(bloomObj) {
		const url = environment.apiUrlIp + `/api/eapapertemplate/add_bloom_and_difficulty`;
		console.log(bloomObj);
		return this.http.post<any>(url, bloomObj)
	}

	//get template list
	getTemplateList(data) {
		const url = environment.apiUrlIp +  `/api/eapapertemplate/list`;
		const institute: Institute = this.instituteService.getInstitute();
		data.BoardID = this.welcomeService.getBoardId();
	    data.MediumID =this.welcomeService.getMediumId();
		const { InstituteID } = institute;
		const dataObj = {...data, InstituteID};
		return this.http.post(url, dataObj)
				.pipe(map(response => response['data']));
	}

   //update template status
	changeStatusOfTemplate(data) {
		const url = environment.apiUrlIp +  `/api/eapapertemplate/statuschange`;
		return this.http.post(url, data);
	}

	//get naturelist by template id
	editPaperNatureList(templateId){
		const url = environment.apiUrlIp +  `/api/eapapertemplate/paper_nature_list`;
		const params  = new HttpParams()
		.set('EAPaperTemplateID', templateId)
		return this.http.get(url, {params})
				.pipe(map(response => response['data']));
	}

  // get bloom and difficulty data by template id
	editBloomAndDifficultyList(templateId){
		const url = environment.apiUrlIp +  `/api/eapapertemplate/bloom_and_difficulty_list`;
		const params  = new HttpParams()
		.set('EAPaperTemplateID', templateId)
		return this.http.get(url, {params})
				.pipe(map(response => response['data']));
	}

  // get worksheet question nature
	getWorksheetQuestionNature(data) {
		const url = environment.apiUrlIp +  `/api/questionnature/questioncountlist`;
		return this.http.post(url, data)
				.pipe(map(response => response['data']));
	}

  // get chepter list by question nature
	chepterListByQuestionNature(QuestionNatureID, EAPaperTemplateID, IsOMRPaper) {
			const url = environment.apiUrlIp +  `/api/eapapertemplate/list_chapters_from_nature`;
			return this.http.post(url, {QuestionNatureID, EAPaperTemplateID, IsOMRPaper})
				.pipe(map(response => response['data']));
	}

	buyCredit(studentid) {
		const url = environment.apiUrlIp + `/api/EA_Enquiry/buycredits?studentid=`+studentid;
		return this.http.post<any>(url, null);
	}
}
