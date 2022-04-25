import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-student-manually',
  templateUrl: './add-student-manually.component.html',
  styleUrls: ['./add-student-manually.component.scss']
})
export class AddStudentManuallyComponent implements OnInit {
  studentId: string;
  isEditMode: boolean = false;

  constructor(private router: Router,
    private route: ActivatedRoute,) { }

  ngOnInit() {
    localStorage.removeItem('uploadData');
    //localStorage.removeItem('studentData');
    this.studentId = localStorage.getItem('studentId');
    if (this.studentId !== null) {
        this.isEditMode = true;
    }
  }

  goBack(){
    this.router.navigate(['/exam/student'])
    console.log(this.router);
  }

}
