import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SharedDataService } from 'src/app/services/shared-data.service';


@Component({
  selector: 'app-global-summary',
  templateUrl: './global-summary.component.html',
  styleUrls: ['./global-summary.component.scss']
})
export class GlobalSummaryComponent implements OnInit {
  templateID: string;
  summaryList: any;
  bloomSummaryList: any = [];
  difficultySummaryList: any= [];
  templateSummaryList: any=[];
  UniqueNatureList: any = [];
  UniqueBloomList: any =[];
  UniqueTemplateSettingList: any=[];
  dataToBeDisplayed = new Map();
  totalNoOfQuesBloom = {};
  newArray: any[];
  UniqueDifficulty: any;
  UniqueChapterList: any;
  difficultyArray: any[];
  dataToBeDisplayed1 = new Map();
  createTemplateData: any;
  isShowPriviousSelection: boolean;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private sharedService: SharedDataService) { }

  ngOnInit() {
    this.route.params.subscribe(id =>{
     console.log(id.id);
     this.templateID = id.id;
     this.getTemplateDetials(this.templateID);
     this.getPaperSummary(this.templateID);
    }, error =>{

    })
    
  }

  getTemplateDetials(templateID){
    this.sharedService.getTemplateDetailsById(templateID).subscribe((templatedetail)=>{
      this.createTemplateData = templatedetail;
    }, error=>{
      
    })
  }

  ShowPriviousSelection(){
    this.isShowPriviousSelection = !this.isShowPriviousSelection;
  }
  getPaperSummary(templateID){
    this.sharedService.getTemplateSummary(templateID).subscribe(res=>{      
      this.summaryList = res;
      this.bloomSummaryList = res.bloom_summary;
      this.difficultySummaryList = res.diff_summary;
      this.templateSummaryList = res.template_settings;
      this.UniqueTemplateSettingList = this.removeDuplicatesNature(this.bloomSummaryList);
      console.log(this.templateSummaryList, 'natureArray');
      const grouped = this.groupBy(this.bloomSummaryList, bloom => bloom.BloomTaxonomyName);
      this.UniqueNatureList = this.removeDuplicatesNature(this.bloomSummaryList);
      this.UniqueBloomList = this.removeDuplicatesBloom(this.bloomSummaryList);

      const grouped1 = this.groupBy(this.difficultySummaryList, bloom => bloom.DifficultyLevelName);
      this.UniqueChapterList = this.removeDuplicatesNature(this.difficultySummaryList);
      this.UniqueDifficulty= this.removeDuplicatesDifficultyLevel(this.difficultySummaryList);
      
      // prepare bloom json
      this.newArray = new Array();
      this.UniqueBloomList.forEach((ele, indx) => {
        let myObj = {};
        this.dataToBeDisplayed[ele['BloomTaxonomyName']] = grouped.get(ele['BloomTaxonomyName']);
        myObj['name'] = ele['BloomTaxonomyName'];
        myObj['totalCount'] = 0;
         const b = this.dataToBeDisplayed[ele['BloomTaxonomyName']];         
         b.forEach((ele, ind) => {          
          this.UniqueNatureList.forEach((nature, nIndx) => {
            if(nature.QuestionNatureName == ele.QuestionNatureName){
              myObj['qCount'+(nIndx+1)] = ele.count;
              myObj['totalCount'] =  +myObj['totalCount'] + +ele.count;
              console.log(+myObj['totalCount'] , +ele.count)
            }         
         });
        });
         this.newArray.push(myObj);
      });

      // prepare difficulty json
      this.difficultyArray = new Array();
      this.UniqueDifficulty.forEach((ele, indx) => {
        let myObj1 = {};
        this.dataToBeDisplayed1[ele['DifficultyLevelName']] = grouped1.get(ele['DifficultyLevelName']);
        console.log(ele);
        myObj1['name'] = ele['DifficultyLevelName'];
        myObj1['totalCount'] = 0;
         const b = this.dataToBeDisplayed1[ele['DifficultyLevelName']];         
         b.forEach((ele, ind) => {          
          this.UniqueChapterList.forEach((nature, nIndx) => {
            if(nature.QuestionNatureName == ele.QuestionNatureName){
              myObj1['qCount'+(nIndx+1)] = ele.count;
              myObj1['totalCount'] =  +myObj1['totalCount'] + +ele.count;
              console.log(+myObj1['totalCount'] , +ele.count)
            }         
         });
        });
         this.difficultyArray.push(myObj1);
      });


    }, error=>{

    })
  }

  gotoDashboard(){
    this.router.navigate(['../../dashboard'], {relativeTo: this.route});
  }

  // bloom
  removeDuplicatesNature(array) {
    let uniq = {};
    return array.filter(obj => !uniq[obj.QuestionNatureName] && (uniq[obj.QuestionNatureName] = true))
  }

  removeDuplicatesBloom(array) {
    let uniq = {};
    return array.filter(obj => !uniq[obj.BloomTaxonomyName] && (uniq[obj.BloomTaxonomyName] = true))
  }

  removeDuplicatesDifficultyLevel(array) {
    let uniq = {};
    return array.filter(obj => !uniq[obj.DifficultyLevelName] && (uniq[obj.DifficultyLevelName] = true))
  }


groupBy(list, keyGetter) {
    const map = new Map();
    list.forEach((item) => {
        const key = keyGetter(item);
        console.log(key)
        const collection = map.get(key);
        if (!collection) {
            map.set(key, [item]);
          } else {
            collection.push(item);
          }
    });
    return map;
}
closeDropDown(event){
  this.isShowPriviousSelection = false;
}
}
