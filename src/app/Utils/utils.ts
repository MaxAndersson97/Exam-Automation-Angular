import { ValidatorFn, FormGroup, ValidationErrors } from '@angular/forms';
import { FIlterListData } from '../model/filterlistdata';
import { FilterListObject } from '../model/filterlistobject';
import { Institute } from '../institute';

export class Utils {

}
export const MatchPassword: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
    const password = control.get('Password');
    const confirmPassword = control.get('ConfirmPassword');
    if (password && confirmPassword) {
        if (password.value !== confirmPassword.value) {
            control.get('ConfirmPassword').setErrors({ MatchPassword: true });
        } else {
            return null;
        }
    }
};

export const ROLES: FilterListObject[] = [ { id: 1, name: 'Principal' }, { id: 2, name: 'VicePrincipal' },
{ id: 3, name: 'Super Admin' }, { id: 4, name: 'Super User' }, { id: 5, name: 'Teacher' }];

export const ROLES1: FilterListObject[] = [ { id: 1, name: 'Principal' }, { id: 2, name: 'VicePrincipal' }, { id: 3, name: 'Supervisor' }, { id: 4, name: 'Director' }, { id: 5, name: 'Teacher' },{ id: 6, name: 'GuestTeacher' }];


export const STAFFROLES = [{ id: 'Principal', name: 'Principal' }, { id: 'VicePrincipal', name: 'VicePrincipal' },
{ id: 'Supervisor', name: 'Supervisor' }, { id: 'Director', name: 'Director' }, { id: 'Teacher', name: 'Teacher' },{id : 'GuestTeacher', name:'GuestTeacher'}];


export const STATUS: FilterListObject[] = [{ id: 0, name: 'All Status' }, { id: 1, name: 'Assigned' },
{ id: 2, name: 'Not Assigned' }];

export const STATUS1: FilterListObject[] = [{ id: 0, name: 'All Status' }, { id: 1, name: 'Active' },
{ id: 2, name: 'Inactive' }];

export const GENDER: FilterListObject[] = [{ id: 0, name: 'Male' }, { id: 1, name: 'Female' },
// { id: 2, name: 'All Gender' }
];

export const USERROLES = [{ id: 'Principal', name: 'Principal' }, { id: 'VicePrincipal', name: 'Vice Principal' }, { id: 'Supervisor', name: 'Supervisor' }, { id: 'Director', name: 'Director' }, { id: 'Teacher', name: 'Teacher' }, { id: 'Partner', name: 'Partner' }];

export const UNAUTHERIZEDMESSASGE = "You are not an authorized user";

export const UNAUTHERIZEDMESSASGESERVER = "You are not authorized user";
export function getInstitute(): Institute {
    const institute: Institute = JSON.parse(localStorage.getItem('institute'));
    return institute;
}




export const DASHBOARDOBJ: FilterListObject[] = [ 
    { id: 1, name: 'Principal' }, 
    { id: 2, name: 'VicePrincipal' },
    { id: 3, name: 'Super Admin' }, 
    { id: 4, name: 'Super User' }, 
    { id: 5, name: 'Teacher' },

];

export const DASHBOARDDATA  = {
  "Assesment_Score": {
    "overall": {
      "current_score": "80",
      "previous_score": "78",
      "academic_year": "2020/2021",
      "previous_academic_year": "2019/2020"
    },
    "male": {
      "current_score": "82",
      "previous_score": "78",
      "previous_academic_year": "2019/2020"
    },
    "female": {
      "current_score": "82",
      "previous_score": "58",
      "previous_academic_year": "2019/2020"
    }
  },
  "Course_Coverage": {
    "average_score": "78",
    "ThisYear": [
      {
        "month": "January",
        "score": 21
      },
      {
        "month": "February",
        "score": 38
      },
      {
        "month": "March",
        "score": 42
      },
      {
        "month": "April",
        "score": 45
      },
      {
        "month": "May",
        "score": 57
      },
      {
        "month": "June",
        "score": 63
      },
      {
        "month": "July",
        "score": 70
      },
      {
        "month": "August",
        "score": 67
      },
      {
        "month": "September",
        "score": 60
      },
      {
        "month": "October",
        "score": 57
      },
      {
        "month": "November",
        "score": 58
      },
      {
        "month": "December",
        "score": 62
      }
    ],
    "LastYear": [
      {
        "month": "January",
        "score": 30
      },
      {
        "month": "February",
        "score": 57
      },
      {
        "month": "March",
        "score": 58
      },
      {
        "month": "April",
        "score": 59
      },
      {
        "month": "May",
        "score": 65
      },
      {
        "month": "June",
        "score": 88
      },
      {
        "month": "July",
        "score": 97
      },
      {
        "month": "August",
        "score": 91
      },
      {
        "month": "September",
        "score": 78
      },
      {
        "month": "October",
        "score": 65
      },
      {
        "month": "November",
        "score": 62
      },
      {
        "month": "December",
        "score": 79
      }
    ]
  },
  "Assessment_Quality": {
    "Status": "Good",
    "Difficulty_level_per": 60,
    "Cognitive_level": {
      "hots": 40,
      "lots": 60
    },
    "Course_representation": {
      "status": "Balanced",
      "percentage": 78
    }
  },
  "Average_Exam_Attendance": {
    "Avg_attandance": 67,
    "Current_Year": [
      {
        "month": "January",
        "score": 21
      },
      {
        "month": "February",
        "score": 38
      },
      {
        "month": "March",
        "score": 42
      },
      {
        "month": "April",
        "score": 45
      },
      {
        "month": "May",
        "score": 57
      },
      {
        "month": "June",
        "score": 63
      },
      {
        "month": "July",
        "score": 70
      },
      {
        "month": "August",
        "score": 67
      },
      {
        "month": "September",
        "score": 60
      },
      {
        "month": "October",
        "score": 57
      },
      {
        "month": "November",
        "score": 58
      },
      {
        "month": "December",
        "score": 62
      }
    ],
    "Previous_Year": [
      {
        "month": "January",
        "score": 30
      },
      {
        "month": "February",
        "score": 57
      },
      {
        "month": "March",
        "score": 58
      },
      {
        "month": "April",
        "score": 59
      },
      {
        "month": "May",
        "score": 65
      },
      {
        "month": "June",
        "score": 88
      },
      {
        "month": "July",
        "score": 97
      },
      {
        "month": "August",
        "score": 91
      },
      {
        "month": "September",
        "score": 78
      },
      {
        "month": "October",
        "score": 65
      },
      {
        "month": "November",
        "score": 62
      },
      {
        "month": "December",
        "score": 79
      }
    ]
  },
  "Overall_Results": {
    "Total_Passed": 56,
    "Total_Failed": 4,
    "First_Division": 40,
    "Second_Division": 20,
    "Thirs_Division": 25,
    "Failed": 15
  },
  "Exam_Taken_Obj": {
    "Exam_Taken": 565,
    "Result_Shared": 84,
    "Pending": 16,
    "previous_Exam_Taken": 560,
    "previous_academic_year": "2019/2020"
  },
  "Total_Time_Saved": {
    "Time_Saved_in_Hours": 56509,
    "Exam_Creation_Per": 54,
    "Marks_Sharing_Per": 46,
    "previous_Time_Saved_in_Hours": 56511,
    "previous_academic_year": "2019/2020"
  },
  "Low_Course_Completion": [
    {
      "ClassName": "10th",
      "SectionName": "A",
      "SubjectName": "Mathematics",
      "TeacherName": "Amit Jain",
      "Teacher_ProfileLink": "https://www.fillmurray.com/640/360",
      "YTD_Course_com": 65,
      "YTD_Assesment": 3,
      "Result": 74
    },
    {
      "ClassName": "10th",
      "SectionName": "A",
      "SubjectName": "Science",
      "TeacherName": "Saurabh Jain",
      "Teacher_ProfileLink": "https://placebeard.it/640x360",
      "YTD_Course_com": 55,
      "YTD_Assesment": 7,
      "Result": 94
    },
    {
      "ClassName": "12th",
      "SectionName": "B",
      "SubjectName": "Mathematics",
      "TeacherName": "Ankit Vishwkarma",
      "Teacher_ProfileLink": "https://www.placecage.com/640/360",
      "YTD_Course_com": 85,
      "YTD_Assesment": 4,
      "Result": 90
    },
    {
      "ClassName": "12th",
      "SectionName": "O",
      "SubjectName": "Social Studies",
      "TeacherName": "Sunil Tale",
      "Teacher_ProfileLink": "https://www.stevensegallery.com/640/360",
      "YTD_Course_com": 45,
      "YTD_Assesment": 9,
      "Result": 79
    },
    {
      "ClassName": "10th",
      "SectionName": "A",
      "SubjectName": "Mathematics",
      "TeacherName": "Avinash Jain",
      "Teacher_ProfileLink": "https://www.fillmurray.com/640/360",
      "YTD_Course_com": 62,
      "YTD_Assesment": 6,
      "Result": 78
    }
  ],
  "Exam_Results_Pending": [
    {
      "ClassName": "10th",
      "SectionName": "A",
      "SubjectName": "Mathematics",
      "TeacherName": "Amit Jain",
      "Teacher_ProfileLink": "https://www.fillmurray.com/640/360",
      "Exam_Date": "25/01/2020",
      "Pending_For": "22"
    },
    {
      "ClassName": "10th",
      "SectionName": "A",
      "SubjectName": "Science",
      "TeacherName": "Saurabh Jain",
      "Teacher_ProfileLink": "https://placebeard.it/640x360",
      "Exam_Date": "10/01/2020",
      "Pending_For": "7"
    },
    {
      "ClassName": "12th",
      "SectionName": "B",
      "SubjectName": "Mathematics",
      "TeacherName": "Ankit Vishwkarma",
      "Teacher_ProfileLink": "https://www.placecage.com/640/360",
      "Exam_Date": "07/01/2020",
      "Pending_For": "14"
    },
    {
      "ClassName": "12th",
      "SectionName": "O",
      "SubjectName": "Social Studies",
      "TeacherName": "Sunil Tale",
      "Teacher_ProfileLink": "https://www.stevensegallery.com/640/360",
      "Exam_Date": "01/02/2020",
      "Pending_For": "12"
    },
    {
      "ClassName": "10th",
      "SectionName": "A",
      "SubjectName": "Mathematics",
      "TeacherName": "Avinash Jain",
      "Teacher_ProfileLink": "https://www.fillmurray.com/640/360",
      "Exam_Date": "30/01/2020",
      "Pending_For": "20"
    }
  ],
  "No_Assessment_for_Long": [
    {
      "ClassName": "10th",
      "SectionName": "A",
      "SubjectName": "Mathematics",
      "TeacherName": "Amit Jain",
      "Teacher_ProfileLink": "https://www.fillmurray.com/640/360",
      "Exam_Date": "25/01/2020",
      "Pending_For": "22"
    },
    {
      "ClassName": "10th",
      "SectionName": "A",
      "SubjectName": "Science",
      "TeacherName": "Saurabh Jain",
      "Teacher_ProfileLink": "https://placebeard.it/640x360",
      "Exam_Date": "10/01/2020",
      "Pending_For": "7"
    },
    {
      "ClassName": "12th",
      "SectionName": "B",
      "SubjectName": "Mathematics",
      "TeacherName": "Ankit Vishwkarma",
      "Teacher_ProfileLink": "https://www.placecage.com/640/360",
      "Exam_Date": "07/01/2020",
      "Pending_For": "14"
    },
    {
      "ClassName": "12th",
      "SectionName": "O",
      "SubjectName": "Social Studies",
      "TeacherName": "Sunil Tale",
      "Teacher_ProfileLink": "https://www.stevensegallery.com/640/360",
      "Exam_Date": "01/02/2020",
      "Pending_For": "12"
    },
    {
      "ClassName": "10th",
      "SectionName": "A",
      "SubjectName": "Mathematics",
      "TeacherName": "Avinash Jain",
      "Teacher_ProfileLink": "https://www.fillmurray.com/640/360",
      "Exam_Date": "30/01/2020",
      "Pending_For": "20"
    }
  ],
  "Top_performing_student": [
    {
      "ClassName": "10th",
      "SectionName": "A",
      "SubjectName": "Mathematics",
      "StudentName": "Rishabh Jain",
      "Student_ProfileLink": "https://randomuser.me/api/portraits/men/79.jpg",
      "Total_Per": 76
    },
    {
      "ClassName": "10th",
      "SectionName": "A",
      "SubjectName": "Science",
      "StudentName": "Ravindra Singh",
      "Student_ProfileLink": "https://randomuser.me/api/portraits/men/89.jpg",
      "Total_Per": 96
    },
    {
      "ClassName": "12th",
      "SectionName": "B",
      "SubjectName": "Mathematics",
      "StudentName": "Jatin Sharma",
      "Student_ProfileLink": "https://randomuser.me/api/portraits/men/82.jpg",
      "Total_Per": 66
    },
    {
      "ClassName": "12th",
      "SectionName": "O",
      "SubjectName": "Social Studies",
      "StudentName": "Jitendra Verma",
      "Student_ProfileLink": "https://randomuser.me/api/portraits/men/34.jpg",
      "Total_Per": 80
    },
    {
      "ClassName": "10th",
      "SectionName": "A",
      "SubjectName": "Mathematics",
      "StudentName": "Sheetal Sharma",
      "Student_ProfileLink": "https://randomuser.me/api/portraits/women/34.jpg",
      "Total_Per": 90
    }
  ],
  "Top_Performing_Feculties": [
    {
      "ClassName": "10th",
      "SectionName": "A",
      "SubjectName": "Mathematics",
      "TeacherName": "Amit Jain",
      "Teacher_ProfileLink": "https://www.fillmurray.com/640/360",
      "Total_Per": 90
    },
    {
      "ClassName": "10th",
      "SectionName": "A",
      "SubjectName": "Science",
      "TeacherName": "Saurabh Jain",
      "Teacher_ProfileLink": "https://placebeard.it/640x360",
      "Total_Per": 90
    },
    {
      "ClassName": "12th",
      "SectionName": "B",
      "SubjectName": "Mathematics",
      "TeacherName": "Ankit Vishwkarma",
      "Teacher_ProfileLink": "https://www.placecage.com/640/360",
      "Total_Per": 90
    },
    {
      "ClassName": "12th",
      "SectionName": "O",
      "SubjectName": "Social Studies",
      "TeacherName": "Sunil Tale",
      "Teacher_ProfileLink": "https://www.stevensegallery.com/640/360",
      "Total_Per": 90
    },
    {
      "ClassName": "10th",
      "SectionName": "A",
      "SubjectName": "Mathematics",
      "TeacherName": "Avinash Jain",
      "Teacher_ProfileLink": "https://www.fillmurray.com/640/360",
      "Total_Per": 90
    }
  ],
  "Class_Wise_Performace": [
    {
      "ClassName": "10th",
      "SectionName": "A",
      "Course_completed": 78,
      "Overall_Result": 96,
      "Best_Subject": "Mathematics",
      "Best_Subject_Teacher": "Amit Jain",
      "Best_Subject_Teacher_Profile": "https://www.fillmurray.com/640/360",
      "Poor_Subject": "Science",
      "Poor_Subject_Teacher": "Ashish Jain",
      "Poor_Subject_Teacher_Profile": "https://www.fillmurray.com/640/360",
      "Class_Teacher": "Sourabh Jain",
      "Class_Teacher_Profile": "https://www.fillmurray.com/640/360"
    },
    {
      "ClassName": "11th",
      "SectionName": "B",
      "Course_completed": 58,
      "Overall_Result": 76,
      "Best_Subject": "Mathematics",
      "Best_Subject_Teacher": "Rahul Jain",
      "Best_Subject_Teacher_Profile": "https://www.fillmurray.com/640/360",
      "Poor_Subject": "Science",
      "Poor_Subject_Teacher": "Rohit Jain",
      "Poor_Subject_Teacher_Profile": "https://www.fillmurray.com/640/360",
      "Class_Teacher": "Rakesh Jain",
      "Class_Teacher_Profile": "https://www.fillmurray.com/640/360"
    },
    {
      "ClassName": "12th",
      "SectionName": "C",
      "Course_completed": 65,
      "Overall_Result": 67,
      "Best_Subject": "Social Science",
      "Best_Subject_Teacher": "Manish Jain",
      "Best_Subject_Teacher_Profile": "https://www.fillmurray.com/640/360",
      "Poor_Subject": "Science",
      "Poor_Subject_Teacher": "Astha Jain",
      "Poor_Subject_Teacher_Profile": "https://www.fillmurray.com/640/360",
      "Class_Teacher": "Aditya Jain",
      "Class_Teacher_Profile": "https://www.fillmurray.com/640/360"
    },
    {
      "ClassName": "10th",
      "SectionName": "B",
      "Course_completed": 80,
      "Overall_Result": 90,
      "Best_Subject": "English",
      "Best_Subject_Teacher": "Shikhi",
      "Best_Subject_Teacher_Profile": "https://www.fillmurray.com/640/360",
      "Poor_Subject": "Science",
      "Poor_Subject_Teacher": "Pinki",
      "Poor_Subject_Teacher_Profile": "https://www.fillmurray.com/640/360",
      "Class_Teacher": "Shivani Jain",
      "Class_Teacher_Profile": "https://www.fillmurray.com/640/360"
    },
    {
      "ClassName": "12th",
      "SectionName": "C",
      "Course_completed": 88,
      "Overall_Result": 99,
      "Best_Subject": "Hindi",
      "Best_Subject_Teacher": "Arti Jain",
      "Best_Subject_Teacher_Profile": "https://www.fillmurray.com/640/360",
      "Poor_Subject": "Science",
      "Poor_Subject_Teacher": "Akhil Jain",
      "Poor_Subject_Teacher_Profile": "https://www.fillmurray.com/640/360",
      "Class_Teacher": "Ashwin Jain",
      "Class_Teacher_Profile": "https://www.fillmurray.com/640/360"
    }
  ],
  "Board_Merit_Prection": [
    {
      "ClassName": "10th",
      "SectionName": "A",
      "SubjectName": "Mathematics",
      "StudentName": "Ritendra Dakciya",
      "Student_ProfileLink": "https://randomuser.me/api/portraits/men/24.jpg",
      "Total_Per": 76,
      "Gap_to_Bridge": "Require 2% More",
      "Comment": "Perfact Performance"
    },
    {
      "ClassName": "10th",
      "SectionName": "A",
      "SubjectName": "Science",
      "StudentName": "Ritesh Patidar",
      "Student_ProfileLink": "https://randomuser.me/api/portraits/men/31.jpg",
      "Total_Per": 96,
      "Gap_to_Bridge": "In Merit",
      "Comment": "Can improve scores in Economics, Accountancy"
    },
    {
      "ClassName": "12th",
      "SectionName": "B",
      "SubjectName": "Mathematics",
      "StudentName": "Bhavya Raj Singh",
      "Student_ProfileLink": "https://randomuser.me/api/portraits/men/40.jpg",
      "Total_Per": 66,
      "Gap_to_Bridge": "In Merit",
      "Comment": "Can improve scores in Maths, Science"
    },
    {
      "ClassName": "12th",
      "SectionName": "O",
      "SubjectName": "Social Studies",
      "StudentName": "Aayushi Agrawal",
      "Student_ProfileLink": "https://randomuser.me/api/portraits/women/16.jpg",
      "Total_Per": 80,
      "Gap_to_Bridge": "Require 3% More",
      "Comment": "Can improve scores in Economics, Accountancy"
    },
    {
      "ClassName": "10th",
      "SectionName": "A",
      "SubjectName": "Mathematics",
      "StudentName": "Ashrami Shukla",
      "Student_ProfileLink": "https://randomuser.me/api/portraits/women/15.jpg",
      "Total_Per": 90,
      "Gap_to_Bridge": "In Merit",
      "Comment": "Can improve scores in Social-studies"
    }
  ],
  "Subject_wise_Performance": {
    "Practical": {
      "Score": 42,
      "Status": "Average",
      "Previous_Year_Avg_Score": 66,
      "Previous_Year": "2019-20"
    },
    "Theoritical": {
      "Score": 44,
      "Status": "Average",
      "Previous_Year_Avg_Score": 77,
      "Previous_Year": "2019-20"
    },
    "Language": {
      "Score": 84,
      "Status": "Good",
      "Previous_Year_Avg_Score": 80,
      "Previous_Year": "2019-20"
    }
  }
}

export const TOPPERFORMINGSTUDENT= {
  "Top_performing_student": [
    {
      "ClassName": "10th",
      "SectionName": "A",
      "SubjectName": "Mathematics",
      "Subject_TeacherName": "Rahul Purohit",
      "Subject_TeacherName_Profile": "https://randomuser.me/api/portraits/men/1.jpg",
      "Poor_SubjectName": "Science",
      "Poor_Subject_TeacherName": "Rohen Purohit",
      "Poor_Subject_TeacherName_Profile": "https://randomuser.me/api/portraits/men/2.jpg",
      "StudentName": "Amit Jain",
      "Student_ProfileLink": "https://www.fillmurray.com/640/360",
      "Total_Per": 76
    },
    {
      "ClassName": "10th",
      "SectionName": "A",
      "SubjectName": "Hindi",
      "Subject_TeacherName": "Ritesh Jain",
      "Subject_TeacherName_Profile": "https://randomuser.me/api/portraits/men/3.jpg",
      "Poor_SubjectName": "English",
      "Poor_Subject_TeacherName": "Mahendra",
      "Poor_Subject_TeacherName_Profile": "https://randomuser.me/api/portraits/men/4.jpg",
      "StudentName": "Saurabh Jain",
      "Student_ProfileLink": "https://placebeard.it/640x360",
      "Total_Per": 96
    },
    {
      "ClassName": "12th",
      "SectionName": "B",
      "SubjectName": "Mathematics",
      "Subject_TeacherName": "Amish Singh",
      "Subject_TeacherName_Profile": "https://randomuser.me/api/portraits/men/5.jpg",
      "Poor_SubjectName": "Social Science",
      "Poor_Subject_TeacherName": "Amit Patidar",
      "Poor_Subject_TeacherName_Profile": "https://randomuser.me/api/portraits/men/6.jpg",
      "StudentName": "Ankit Vishwkarma",
      "Student_ProfileLink": "https://www.placecage.com/640/360",
      "Total_Per": 66
    },
    {
      "ClassName": "12th",
      "SectionName": "O",
      "SubjectName": "Social Studies",
      "Subject_TeacherName": "Nayan Sharma",
      "Subject_TeacherName_Profile": "https://randomuser.me/api/portraits/men/7.jpg",
      "Poor_SubjectName": "Science",
      "Poor_Subject_TeacherName": "Nimish Patidar",
      "Poor_Subject_TeacherName_Profile": "https://randomuser.me/api/portraits/men/8.jpg",
      "StudentName": "Sunil Tale",
      "Student_ProfileLink": "https://www.stevensegallery.com/640/360",
      "Total_Per": 80
    },
    {
      "ClassName": "10th",
      "SectionName": "A",
      "SubjectName": "Hindi",
      "Subject_TeacherName": "Udit Sharma",
      "Subject_TeacherName_Profile": "https://randomuser.me/api/portraits/men/9.jpg",
      "Poor_SubjectName": "English",
      "Poor_Subject_TeacherName": "Umesh Patidar",
      "Poor_Subject_TeacherName_Profile": "https://randomuser.me/api/portraits/men/10.jpg",
      "StudentName": "Avinash Jain",
      "Student_ProfileLink": "https://www.fillmurray.com/640/360",
      "Total_Per": 90
    },
    {
      "ClassName": "10th",
      "SectionName": "A",
      "SubjectName": "Mathematics",
      "Subject_TeacherName": "Rahul Purohit",
      "Subject_TeacherName_Profile": "https://randomuser.me/api/portraits/men/11.jpg",
      "Poor_SubjectName": "Science",
      "Poor_Subject_TeacherName": "Rohen Purohit",
      "Poor_Subject_TeacherName_Profile": "https://randomuser.me/api/portraits/men/12.jpg",
      "StudentName": "Amit Jain",
      "Student_ProfileLink": "https://www.fillmurray.com/640/360",
      "Total_Per": 76
    },
    {
      "ClassName": "10th",
      "SectionName": "A",
      "SubjectName": "Mathematics",
      "Subject_TeacherName": "Rahul Purohit",
      "Subject_TeacherName_Profile": "https://randomuser.me/api/portraits/men/1.jpg",
      "Poor_SubjectName": "Science",
      "Poor_Subject_TeacherName": "Rohen Purohit",
      "Poor_Subject_TeacherName_Profile": "https://randomuser.me/api/portraits/men/2.jpg",
      "StudentName": "Amit Jain",
      "Student_ProfileLink": "https://www.fillmurray.com/640/360",
      "Total_Per": 76
    },
    {
      "ClassName": "10th",
      "SectionName": "A",
      "SubjectName": "Hindi",
      "Subject_TeacherName": "Ritesh Jain",
      "Subject_TeacherName_Profile": "https://randomuser.me/api/portraits/men/3.jpg",
      "Poor_SubjectName": "English",
      "Poor_Subject_TeacherName": "Mahendra",
      "Poor_Subject_TeacherName_Profile": "https://randomuser.me/api/portraits/men/4.jpg",
      "StudentName": "Saurabh Jain",
      "Student_ProfileLink": "https://placebeard.it/640x360",
      "Total_Per": 96
    },
    {
      "ClassName": "12th",
      "SectionName": "B",
      "SubjectName": "Mathematics",
      "Subject_TeacherName": "Amish Singh",
      "Subject_TeacherName_Profile": "https://randomuser.me/api/portraits/men/5.jpg",
      "Poor_SubjectName": "Social Science",
      "Poor_Subject_TeacherName": "Amit Patidar",
      "Poor_Subject_TeacherName_Profile": "https://randomuser.me/api/portraits/men/6.jpg",
      "StudentName": "Ankit Vishwkarma",
      "Student_ProfileLink": "https://www.placecage.com/640/360",
      "Total_Per": 66
    },
    {
      "ClassName": "12th",
      "SectionName": "O",
      "SubjectName": "Social Studies",
      "Subject_TeacherName": "Nayan Sharma",
      "Subject_TeacherName_Profile": "https://randomuser.me/api/portraits/men/7.jpg",
      "Poor_SubjectName": "Science",
      "Poor_Subject_TeacherName": "Nimish Patidar",
      "Poor_Subject_TeacherName_Profile": "https://randomuser.me/api/portraits/men/8.jpg",
      "StudentName": "Sunil Tale",
      "Student_ProfileLink": "https://www.stevensegallery.com/640/360",
      "Total_Per": 80
    },
    {
      "ClassName": "10th",
      "SectionName": "A",
      "SubjectName": "Hindi",
      "Subject_TeacherName": "Udit Sharma",
      "Subject_TeacherName_Profile": "https://randomuser.me/api/portraits/men/9.jpg",
      "Poor_SubjectName": "English",
      "Poor_Subject_TeacherName": "Umesh Patidar",
      "Poor_Subject_TeacherName_Profile": "https://randomuser.me/api/portraits/men/10.jpg",
      "StudentName": "Avinash Jain",
      "Student_ProfileLink": "https://www.fillmurray.com/640/360",
      "Total_Per": 90
    },
    {
      "ClassName": "10th",
      "SectionName": "A",
      "SubjectName": "Mathematics",
      "Subject_TeacherName": "Rahul Purohit",
      "Subject_TeacherName_Profile": "https://randomuser.me/api/portraits/men/11.jpg",
      "Poor_SubjectName": "Science",
      "Poor_Subject_TeacherName": "Rohen Purohit",
      "Poor_Subject_TeacherName_Profile": "https://randomuser.me/api/portraits/men/12.jpg",
      "StudentName": "Amit Jain",
      "Student_ProfileLink": "https://www.fillmurray.com/640/360",
      "Total_Per": 76
    },
    {
      "ClassName": "10th",
      "SectionName": "A",
      "SubjectName": "Mathematics",
      "Subject_TeacherName": "Rahul Purohit",
      "Subject_TeacherName_Profile": "https://randomuser.me/api/portraits/men/1.jpg",
      "Poor_SubjectName": "Science",
      "Poor_Subject_TeacherName": "Rohen Purohit",
      "Poor_Subject_TeacherName_Profile": "https://randomuser.me/api/portraits/men/2.jpg",
      "StudentName": "Amit Jain",
      "Student_ProfileLink": "https://www.fillmurray.com/640/360",
      "Total_Per": 76
    },
    {
      "ClassName": "10th",
      "SectionName": "A",
      "SubjectName": "Hindi",
      "Subject_TeacherName": "Ritesh Jain",
      "Subject_TeacherName_Profile": "https://randomuser.me/api/portraits/men/3.jpg",
      "Poor_SubjectName": "English",
      "Poor_Subject_TeacherName": "Mahendra",
      "Poor_Subject_TeacherName_Profile": "https://randomuser.me/api/portraits/men/4.jpg",
      "StudentName": "Saurabh Jain",
      "Student_ProfileLink": "https://placebeard.it/640x360",
      "Total_Per": 96
    },
    {
      "ClassName": "12th",
      "SectionName": "B",
      "SubjectName": "Mathematics",
      "Subject_TeacherName": "Amish Singh",
      "Subject_TeacherName_Profile": "https://randomuser.me/api/portraits/men/5.jpg",
      "Poor_SubjectName": "Social Science",
      "Poor_Subject_TeacherName": "Amit Patidar",
      "Poor_Subject_TeacherName_Profile": "https://randomuser.me/api/portraits/men/6.jpg",
      "StudentName": "Ankit Vishwkarma",
      "Student_ProfileLink": "https://www.placecage.com/640/360",
      "Total_Per": 66
    },
    {
      "ClassName": "12th",
      "SectionName": "O",
      "SubjectName": "Social Studies",
      "Subject_TeacherName": "Nayan Sharma",
      "Subject_TeacherName_Profile": "https://randomuser.me/api/portraits/men/7.jpg",
      "Poor_SubjectName": "Science",
      "Poor_Subject_TeacherName": "Nimish Patidar",
      "Poor_Subject_TeacherName_Profile": "https://randomuser.me/api/portraits/men/8.jpg",
      "StudentName": "Sunil Tale",
      "Student_ProfileLink": "https://www.stevensegallery.com/640/360",
      "Total_Per": 80
    },
    {
      "ClassName": "10th",
      "SectionName": "A",
      "SubjectName": "Hindi",
      "Subject_TeacherName": "Udit Sharma",
      "Subject_TeacherName_Profile": "https://randomuser.me/api/portraits/men/9.jpg",
      "Poor_SubjectName": "English",
      "Poor_Subject_TeacherName": "Umesh Patidar",
      "Poor_Subject_TeacherName_Profile": "https://randomuser.me/api/portraits/men/10.jpg",
      "StudentName": "Avinash Jain",
      "Student_ProfileLink": "https://www.fillmurray.com/640/360",
      "Total_Per": 90
    },
    {
      "ClassName": "10th",
      "SectionName": "A",
      "SubjectName": "Mathematics",
      "Subject_TeacherName": "Rahul Purohit",
      "Subject_TeacherName_Profile": "https://randomuser.me/api/portraits/men/11.jpg",
      "Poor_SubjectName": "Science",
      "Poor_Subject_TeacherName": "Rohen Purohit",
      "Poor_Subject_TeacherName_Profile": "https://randomuser.me/api/portraits/men/12.jpg",
      "StudentName": "Amit Jain",
      "Student_ProfileLink": "https://www.fillmurray.com/640/360",
      "Total_Per": 76
    },
    {
      "ClassName": "10th",
      "SectionName": "A",
      "SubjectName": "Mathematics",
      "Subject_TeacherName": "Rahul Purohit",
      "Subject_TeacherName_Profile": "https://randomuser.me/api/portraits/men/1.jpg",
      "Poor_SubjectName": "Science",
      "Poor_Subject_TeacherName": "Rohen Purohit",
      "Poor_Subject_TeacherName_Profile": "https://randomuser.me/api/portraits/men/2.jpg",
      "StudentName": "Amit Jain",
      "Student_ProfileLink": "https://www.fillmurray.com/640/360",
      "Total_Per": 76
    },
    {
      "ClassName": "10th",
      "SectionName": "A",
      "SubjectName": "Hindi",
      "Subject_TeacherName": "Ritesh Jain",
      "Subject_TeacherName_Profile": "https://randomuser.me/api/portraits/men/3.jpg",
      "Poor_SubjectName": "English",
      "Poor_Subject_TeacherName": "Mahendra",
      "Poor_Subject_TeacherName_Profile": "https://randomuser.me/api/portraits/men/4.jpg",
      "StudentName": "Saurabh Jain",
      "Student_ProfileLink": "https://placebeard.it/640x360",
      "Total_Per": 96
    },
    {
      "ClassName": "12th",
      "SectionName": "B",
      "SubjectName": "Mathematics",
      "Subject_TeacherName": "Amish Singh",
      "Subject_TeacherName_Profile": "https://randomuser.me/api/portraits/men/5.jpg",
      "Poor_SubjectName": "Social Science",
      "Poor_Subject_TeacherName": "Amit Patidar",
      "Poor_Subject_TeacherName_Profile": "https://randomuser.me/api/portraits/men/6.jpg",
      "StudentName": "Ankit Vishwkarma",
      "Student_ProfileLink": "https://www.placecage.com/640/360",
      "Total_Per": 66
    },
    {
      "ClassName": "12th",
      "SectionName": "O",
      "SubjectName": "Social Studies",
      "Subject_TeacherName": "Nayan Sharma",
      "Subject_TeacherName_Profile": "https://randomuser.me/api/portraits/men/7.jpg",
      "Poor_SubjectName": "Science",
      "Poor_Subject_TeacherName": "Nimish Patidar",
      "Poor_Subject_TeacherName_Profile": "https://randomuser.me/api/portraits/men/8.jpg",
      "StudentName": "Sunil Tale",
      "Student_ProfileLink": "https://www.stevensegallery.com/640/360",
      "Total_Per": 80
    },
    {
      "ClassName": "10th",
      "SectionName": "A",
      "SubjectName": "Hindi",
      "Subject_TeacherName": "Udit Sharma",
      "Subject_TeacherName_Profile": "https://randomuser.me/api/portraits/men/9.jpg",
      "Poor_SubjectName": "English",
      "Poor_Subject_TeacherName": "Umesh Patidar",
      "Poor_Subject_TeacherName_Profile": "https://randomuser.me/api/portraits/men/10.jpg",
      "StudentName": "Avinash Jain",
      "Student_ProfileLink": "https://www.fillmurray.com/640/360",
      "Total_Per": 90
    },
    {
      "ClassName": "10th",
      "SectionName": "A",
      "SubjectName": "Mathematics",
      "Subject_TeacherName": "Rahul Purohit",
      "Subject_TeacherName_Profile": "https://randomuser.me/api/portraits/men/11.jpg",
      "Poor_SubjectName": "Science",
      "Poor_Subject_TeacherName": "Rohen Purohit",
      "Poor_Subject_TeacherName_Profile": "https://randomuser.me/api/portraits/men/12.jpg",
      "StudentName": "Amit Jain",
      "Student_ProfileLink": "https://www.fillmurray.com/640/360",
      "Total_Per": 76
    },
    {
      "ClassName": "10th",
      "SectionName": "A",
      "SubjectName": "Mathematics",
      "Subject_TeacherName": "Rahul Purohit",
      "Subject_TeacherName_Profile": "https://randomuser.me/api/portraits/men/1.jpg",
      "Poor_SubjectName": "Science",
      "Poor_Subject_TeacherName": "Rohen Purohit",
      "Poor_Subject_TeacherName_Profile": "https://randomuser.me/api/portraits/men/2.jpg",
      "StudentName": "Amit Jain",
      "Student_ProfileLink": "https://www.fillmurray.com/640/360",
      "Total_Per": 76
    },
    {
      "ClassName": "10th",
      "SectionName": "A",
      "SubjectName": "Hindi",
      "Subject_TeacherName": "Ritesh Jain",
      "Subject_TeacherName_Profile": "https://randomuser.me/api/portraits/men/3.jpg",
      "Poor_SubjectName": "English",
      "Poor_Subject_TeacherName": "Mahendra",
      "Poor_Subject_TeacherName_Profile": "https://randomuser.me/api/portraits/men/4.jpg",
      "StudentName": "Saurabh Jain",
      "Student_ProfileLink": "https://placebeard.it/640x360",
      "Total_Per": 96
    },
    {
      "ClassName": "12th",
      "SectionName": "B",
      "SubjectName": "Mathematics",
      "Subject_TeacherName": "Amish Singh",
      "Subject_TeacherName_Profile": "https://randomuser.me/api/portraits/men/5.jpg",
      "Poor_SubjectName": "Social Science",
      "Poor_Subject_TeacherName": "Amit Patidar",
      "Poor_Subject_TeacherName_Profile": "https://randomuser.me/api/portraits/men/6.jpg",
      "StudentName": "Ankit Vishwkarma",
      "Student_ProfileLink": "https://www.placecage.com/640/360",
      "Total_Per": 66
    },
    {
      "ClassName": "12th",
      "SectionName": "O",
      "SubjectName": "Social Studies",
      "Subject_TeacherName": "Nayan Sharma",
      "Subject_TeacherName_Profile": "https://randomuser.me/api/portraits/men/7.jpg",
      "Poor_SubjectName": "Science",
      "Poor_Subject_TeacherName": "Nimish Patidar",
      "Poor_Subject_TeacherName_Profile": "https://randomuser.me/api/portraits/men/8.jpg",
      "StudentName": "Sunil Tale",
      "Student_ProfileLink": "https://www.stevensegallery.com/640/360",
      "Total_Per": 80
    },
    {
      "ClassName": "10th",
      "SectionName": "A",
      "SubjectName": "Hindi",
      "Subject_TeacherName": "Udit Sharma",
      "Subject_TeacherName_Profile": "https://randomuser.me/api/portraits/men/9.jpg",
      "Poor_SubjectName": "English",
      "Poor_Subject_TeacherName": "Umesh Patidar",
      "Poor_Subject_TeacherName_Profile": "https://randomuser.me/api/portraits/men/10.jpg",
      "StudentName": "Avinash Jain",
      "Student_ProfileLink": "https://www.fillmurray.com/640/360",
      "Total_Per": 90
    },
    {
      "ClassName": "10th",
      "SectionName": "A",
      "SubjectName": "Mathematics",
      "Subject_TeacherName": "Rahul Purohit",
      "Subject_TeacherName_Profile": "https://randomuser.me/api/portraits/men/11.jpg",
      "Poor_SubjectName": "Science",
      "Poor_Subject_TeacherName": "Rohen Purohit",
      "Poor_Subject_TeacherName_Profile": "https://randomuser.me/api/portraits/men/12.jpg",
      "StudentName": "Amit Jain",
      "Student_ProfileLink": "https://www.fillmurray.com/640/360",
      "Total_Per": 76
    },
    {
      "ClassName": "10th",
      "SectionName": "A",
      "SubjectName": "Mathematics",
      "Subject_TeacherName": "Rahul Purohit",
      "Subject_TeacherName_Profile": "https://randomuser.me/api/portraits/men/1.jpg",
      "Poor_SubjectName": "Science",
      "Poor_Subject_TeacherName": "Rohen Purohit",
      "Poor_Subject_TeacherName_Profile": "https://randomuser.me/api/portraits/men/2.jpg",
      "StudentName": "Amit Jain",
      "Student_ProfileLink": "https://www.fillmurray.com/640/360",
      "Total_Per": 76
    },
    {
      "ClassName": "10th",
      "SectionName": "A",
      "SubjectName": "Hindi",
      "Subject_TeacherName": "Ritesh Jain",
      "Subject_TeacherName_Profile": "https://randomuser.me/api/portraits/men/3.jpg",
      "Poor_SubjectName": "English",
      "Poor_Subject_TeacherName": "Mahendra",
      "Poor_Subject_TeacherName_Profile": "https://randomuser.me/api/portraits/men/4.jpg",
      "StudentName": "Saurabh Jain",
      "Student_ProfileLink": "https://placebeard.it/640x360",
      "Total_Per": 96
    },
    {
      "ClassName": "12th",
      "SectionName": "B",
      "SubjectName": "Mathematics",
      "Subject_TeacherName": "Amish Singh",
      "Subject_TeacherName_Profile": "https://randomuser.me/api/portraits/men/5.jpg",
      "Poor_SubjectName": "Social Science",
      "Poor_Subject_TeacherName": "Amit Patidar",
      "Poor_Subject_TeacherName_Profile": "https://randomuser.me/api/portraits/men/6.jpg",
      "StudentName": "Ankit Vishwkarma",
      "Student_ProfileLink": "https://www.placecage.com/640/360",
      "Total_Per": 66
    },
    {
      "ClassName": "12th",
      "SectionName": "O",
      "SubjectName": "Social Studies",
      "Subject_TeacherName": "Nayan Sharma",
      "Subject_TeacherName_Profile": "https://randomuser.me/api/portraits/men/7.jpg",
      "Poor_SubjectName": "Science",
      "Poor_Subject_TeacherName": "Nimish Patidar",
      "Poor_Subject_TeacherName_Profile": "https://randomuser.me/api/portraits/men/8.jpg",
      "StudentName": "Sunil Tale",
      "Student_ProfileLink": "https://www.stevensegallery.com/640/360",
      "Total_Per": 80
    },
    {
      "ClassName": "10th",
      "SectionName": "A",
      "SubjectName": "Hindi",
      "Subject_TeacherName": "Udit Sharma",
      "Subject_TeacherName_Profile": "https://randomuser.me/api/portraits/men/9.jpg",
      "Poor_SubjectName": "English",
      "Poor_Subject_TeacherName": "Umesh Patidar",
      "Poor_Subject_TeacherName_Profile": "https://randomuser.me/api/portraits/men/10.jpg",
      "StudentName": "Avinash Jain",
      "Student_ProfileLink": "https://www.fillmurray.com/640/360",
      "Total_Per": 90
    },
    {
      "ClassName": "10th",
      "SectionName": "A",
      "SubjectName": "Mathematics",
      "Subject_TeacherName": "Rahul Purohit",
      "Subject_TeacherName_Profile": "https://randomuser.me/api/portraits/men/11.jpg",
      "Poor_SubjectName": "Science",
      "Poor_Subject_TeacherName": "Rohen Purohit",
      "Poor_Subject_TeacherName_Profile": "https://randomuser.me/api/portraits/men/12.jpg",
      "StudentName": "Amit Jain",
      "Student_ProfileLink": "https://www.fillmurray.com/640/360",
      "Total_Per": 76
    },
    {
      "ClassName": "10th",
      "SectionName": "A",
      "SubjectName": "Mathematics",
      "Subject_TeacherName": "Rahul Purohit",
      "Subject_TeacherName_Profile": "https://randomuser.me/api/portraits/men/1.jpg",
      "Poor_SubjectName": "Science",
      "Poor_Subject_TeacherName": "Rohen Purohit",
      "Poor_Subject_TeacherName_Profile": "https://randomuser.me/api/portraits/men/2.jpg",
      "StudentName": "Amit Jain",
      "Student_ProfileLink": "https://www.fillmurray.com/640/360",
      "Total_Per": 76
    },
    {
      "ClassName": "10th",
      "SectionName": "A",
      "SubjectName": "Hindi",
      "Subject_TeacherName": "Ritesh Jain",
      "Subject_TeacherName_Profile": "https://randomuser.me/api/portraits/men/3.jpg",
      "Poor_SubjectName": "English",
      "Poor_Subject_TeacherName": "Mahendra",
      "Poor_Subject_TeacherName_Profile": "https://randomuser.me/api/portraits/men/4.jpg",
      "StudentName": "Saurabh Jain",
      "Student_ProfileLink": "https://placebeard.it/640x360",
      "Total_Per": 96
    },
    {
      "ClassName": "12th",
      "SectionName": "B",
      "SubjectName": "Mathematics",
      "Subject_TeacherName": "Amish Singh",
      "Subject_TeacherName_Profile": "https://randomuser.me/api/portraits/men/5.jpg",
      "Poor_SubjectName": "Social Science",
      "Poor_Subject_TeacherName": "Amit Patidar",
      "Poor_Subject_TeacherName_Profile": "https://randomuser.me/api/portraits/men/6.jpg",
      "StudentName": "Ankit Vishwkarma",
      "Student_ProfileLink": "https://www.placecage.com/640/360",
      "Total_Per": 66
    },
    {
      "ClassName": "12th",
      "SectionName": "O",
      "SubjectName": "Social Studies",
      "Subject_TeacherName": "Nayan Sharma",
      "Subject_TeacherName_Profile": "https://randomuser.me/api/portraits/men/7.jpg",
      "Poor_SubjectName": "Science",
      "Poor_Subject_TeacherName": "Nimish Patidar",
      "Poor_Subject_TeacherName_Profile": "https://randomuser.me/api/portraits/men/8.jpg",
      "StudentName": "Sunil Tale",
      "Student_ProfileLink": "https://www.stevensegallery.com/640/360",
      "Total_Per": 80
    },
    {
      "ClassName": "10th",
      "SectionName": "A",
      "SubjectName": "Hindi",
      "Subject_TeacherName": "Udit Sharma",
      "Subject_TeacherName_Profile": "https://randomuser.me/api/portraits/men/9.jpg",
      "Poor_SubjectName": "English",
      "Poor_Subject_TeacherName": "Umesh Patidar",
      "Poor_Subject_TeacherName_Profile": "https://randomuser.me/api/portraits/men/10.jpg",
      "StudentName": "Avinash Jain",
      "Student_ProfileLink": "https://www.fillmurray.com/640/360",
      "Total_Per": 90
    },
    {
      "ClassName": "10th",
      "SectionName": "A",
      "SubjectName": "Mathematics",
      "Subject_TeacherName": "Rahul Purohit",
      "Subject_TeacherName_Profile": "https://randomuser.me/api/portraits/men/11.jpg",
      "Poor_SubjectName": "Science",
      "Poor_Subject_TeacherName": "Rohen Purohit",
      "Poor_Subject_TeacherName_Profile": "https://randomuser.me/api/portraits/men/12.jpg",
      "StudentName": "Amit Jain",
      "Student_ProfileLink": "https://www.fillmurray.com/640/360",
      "Total_Per": 76
    },
    {
      "ClassName": "10th",
      "SectionName": "A",
      "SubjectName": "Mathematics",
      "Subject_TeacherName": "Rahul Purohit",
      "Subject_TeacherName_Profile": "https://randomuser.me/api/portraits/men/1.jpg",
      "Poor_SubjectName": "Science",
      "Poor_Subject_TeacherName": "Rohen Purohit",
      "Poor_Subject_TeacherName_Profile": "https://randomuser.me/api/portraits/men/2.jpg",
      "StudentName": "Amit Jain",
      "Student_ProfileLink": "https://www.fillmurray.com/640/360",
      "Total_Per": 76
    },
    {
      "ClassName": "10th",
      "SectionName": "A",
      "SubjectName": "Hindi",
      "Subject_TeacherName": "Ritesh Jain",
      "Subject_TeacherName_Profile": "https://randomuser.me/api/portraits/men/3.jpg",
      "Poor_SubjectName": "English",
      "Poor_Subject_TeacherName": "Mahendra",
      "Poor_Subject_TeacherName_Profile": "https://randomuser.me/api/portraits/men/4.jpg",
      "StudentName": "Saurabh Jain",
      "Student_ProfileLink": "https://placebeard.it/640x360",
      "Total_Per": 96
    },
    {
      "ClassName": "12th",
      "SectionName": "B",
      "SubjectName": "Mathematics",
      "Subject_TeacherName": "Amish Singh",
      "Subject_TeacherName_Profile": "https://randomuser.me/api/portraits/men/5.jpg",
      "Poor_SubjectName": "Social Science",
      "Poor_Subject_TeacherName": "Amit Patidar",
      "Poor_Subject_TeacherName_Profile": "https://randomuser.me/api/portraits/men/6.jpg",
      "StudentName": "Ankit Vishwkarma",
      "Student_ProfileLink": "https://www.placecage.com/640/360",
      "Total_Per": 66
    },
    {
      "ClassName": "12th",
      "SectionName": "O",
      "SubjectName": "Social Studies",
      "Subject_TeacherName": "Nayan Sharma",
      "Subject_TeacherName_Profile": "https://randomuser.me/api/portraits/men/7.jpg",
      "Poor_SubjectName": "Science",
      "Poor_Subject_TeacherName": "Nimish Patidar",
      "Poor_Subject_TeacherName_Profile": "https://randomuser.me/api/portraits/men/8.jpg",
      "StudentName": "Sunil Tale",
      "Student_ProfileLink": "https://www.stevensegallery.com/640/360",
      "Total_Per": 80
    },
    {
      "ClassName": "10th",
      "SectionName": "A",
      "SubjectName": "Hindi",
      "Subject_TeacherName": "Udit Sharma",
      "Subject_TeacherName_Profile": "https://randomuser.me/api/portraits/men/9.jpg",
      "Poor_SubjectName": "English",
      "Poor_Subject_TeacherName": "Umesh Patidar",
      "Poor_Subject_TeacherName_Profile": "https://randomuser.me/api/portraits/men/10.jpg",
      "StudentName": "Avinash Jain",
      "Student_ProfileLink": "https://www.fillmurray.com/640/360",
      "Total_Per": 90
    },
    {
      "ClassName": "10th",
      "SectionName": "A",
      "SubjectName": "Mathematics",
      "Subject_TeacherName": "Rahul Purohit",
      "Subject_TeacherName_Profile": "https://randomuser.me/api/portraits/men/11.jpg",
      "Poor_SubjectName": "Science",
      "Poor_Subject_TeacherName": "Rohen Purohit",
      "Poor_Subject_TeacherName_Profile": "https://randomuser.me/api/portraits/men/12.jpg",
      "StudentName": "Amit Jain",
      "Student_ProfileLink": "https://www.fillmurray.com/640/360",
      "Total_Per": 76
    }

  ]
}

export const BOARDMERITPREDICTION= {
  "Board_Merit_Prection": [
    {
      "ClassName": "10th",
      "SectionName": "A",
      "SubjectName": "Mathematics",
      "StudentName": "Amit Jain",
      "Student_ProfileLink": "https://www.fillmurray.com/640/360",
      "Total_Per": 76,
      "Gap_to_Bridge": "Require 1% more",
      "Comment": "Perfact Performance"
    },
    {
      "ClassName": "10th",
      "SectionName": "A",
      "SubjectName": "Science",
      "StudentName": "Saurabh Jain",
      "Student_ProfileLink": "https://placebeard.it/640x360",
      "Total_Per": 96,
      "Gap_to_Bridge": "In Merit",
      "Comment": "Can improve scores in Economics, Accountancy"
    },
    {
      "ClassName": "12th",
      "SectionName": "B",
      "SubjectName": "Mathematics",
      "StudentName": "Ankit Vishwkarma",
      "Student_ProfileLink": "https://www.placecage.com/640/360",
      "Total_Per": 66,
      "Gap_to_Bridge": "Require 2% more",
      "Comment": "Can improve scores in Maths, Science"
    },
    {
      "ClassName": "12th",
      "SectionName": "O",
      "SubjectName": "Social Studies",
      "StudentName": "Sunil Tale",
      "Student_ProfileLink": "https://www.stevensegallery.com/640/360",
      "Total_Per": 80,
      "Gap_to_Bridge": "In Merit",
      "Comment": "Can improve scores in Economics, Accountancy"
    },
    {
      "ClassName": "10th",
      "SectionName": "A",
      "SubjectName": "Mathematics",
      "StudentName": "Avinash Jain",
      "Student_ProfileLink": "https://www.fillmurray.com/640/360",
      "Total_Per": 90,
      "Gap_to_Bridge": "In Merit",
      "Comment": "Can improve scores in Social-studies"
    },
    {
      "ClassName": "10th",
      "SectionName": "A",
      "SubjectName": "Mathematics",
      "StudentName": "Amit Jain",
      "Student_ProfileLink": "https://www.fillmurray.com/640/360",
      "Total_Per": 76,
      "Gap_to_Bridge": "Require 1% more",
      "Comment": "Perfact Performance"
    },
    {
      "ClassName": "10th",
      "SectionName": "A",
      "SubjectName": "Science",
      "StudentName": "Saurabh Jain",
      "Student_ProfileLink": "https://placebeard.it/640x360",
      "Total_Per": 96,
      "Gap_to_Bridge": "In Merit",
      "Comment": "Can improve scores in Economics, Accountancy"
    },
    {
      "ClassName": "12th",
      "SectionName": "B",
      "SubjectName": "Mathematics",
      "StudentName": "Ankit Vishwkarma",
      "Student_ProfileLink": "https://www.placecage.com/640/360",
      "Total_Per": 66,
      "Gap_to_Bridge": "Require 2% more",
      "Comment": "Can improve scores in Maths, Science"
    },
    {
      "ClassName": "12th",
      "SectionName": "O",
      "SubjectName": "Social Studies",
      "StudentName": "Sunil Tale",
      "Student_ProfileLink": "https://www.stevensegallery.com/640/360",
      "Total_Per": 80,
      "Gap_to_Bridge": "In Merit",
      "Comment": "Can improve scores in Economics, Accountancy"
    },
    {
      "ClassName": "10th",
      "SectionName": "A",
      "SubjectName": "Mathematics",
      "StudentName": "Avinash Jain",
      "Student_ProfileLink": "https://www.fillmurray.com/640/360",
      "Total_Per": 90,
      "Gap_to_Bridge": "In Merit",
      "Comment": "Can improve scores in Social-studies"
    },
    {
      "ClassName": "10th",
      "SectionName": "A",
      "SubjectName": "Mathematics",
      "StudentName": "Amit Jain",
      "Student_ProfileLink": "https://www.fillmurray.com/640/360",
      "Total_Per": 76,
      "Gap_to_Bridge": "Require 1% more",
      "Comment": "Perfact Performance"
    },
    {
      "ClassName": "10th",
      "SectionName": "A",
      "SubjectName": "Science",
      "StudentName": "Saurabh Jain",
      "Student_ProfileLink": "https://placebeard.it/640x360",
      "Total_Per": 96,
      "Gap_to_Bridge": "In Merit",
      "Comment": "Can improve scores in Economics, Accountancy"
    },
    {
      "ClassName": "12th",
      "SectionName": "B",
      "SubjectName": "Mathematics",
      "StudentName": "Ankit Vishwkarma",
      "Student_ProfileLink": "https://www.placecage.com/640/360",
      "Total_Per": 66,
      "Gap_to_Bridge": "Require 2% more",
      "Comment": "Can improve scores in Maths, Science"
    },
    {
      "ClassName": "12th",
      "SectionName": "O",
      "SubjectName": "Social Studies",
      "StudentName": "Sunil Tale",
      "Student_ProfileLink": "https://www.stevensegallery.com/640/360",
      "Total_Per": 80,
      "Gap_to_Bridge": "In Merit",
      "Comment": "Can improve scores in Economics, Accountancy"
    },
    {
      "ClassName": "10th",
      "SectionName": "A",
      "SubjectName": "Mathematics",
      "StudentName": "Avinash Jain",
      "Student_ProfileLink": "https://www.fillmurray.com/640/360",
      "Total_Per": 90,
      "Gap_to_Bridge": "In Merit",
      "Comment": "Can improve scores in Social-studies"
    },
    {
      "ClassName": "10th",
      "SectionName": "A",
      "SubjectName": "Mathematics",
      "StudentName": "Amit Jain",
      "Student_ProfileLink": "https://www.fillmurray.com/640/360",
      "Total_Per": 76,
      "Gap_to_Bridge": "Require 1% more",
      "Comment": "Perfact Performance"
    },
    {
      "ClassName": "10th",
      "SectionName": "A",
      "SubjectName": "Science",
      "StudentName": "Saurabh Jain",
      "Student_ProfileLink": "https://placebeard.it/640x360",
      "Total_Per": 96,
      "Gap_to_Bridge": "In Merit",
      "Comment": "Can improve scores in Economics, Accountancy"
    },
    {
      "ClassName": "12th",
      "SectionName": "B",
      "SubjectName": "Mathematics",
      "StudentName": "Ankit Vishwkarma",
      "Student_ProfileLink": "https://www.placecage.com/640/360",
      "Total_Per": 66,
      "Gap_to_Bridge": "Require 2% more",
      "Comment": "Can improve scores in Maths, Science"
    },
    {
      "ClassName": "12th",
      "SectionName": "O",
      "SubjectName": "Social Studies",
      "StudentName": "Sunil Tale",
      "Student_ProfileLink": "https://www.stevensegallery.com/640/360",
      "Total_Per": 80,
      "Gap_to_Bridge": "In Merit",
      "Comment": "Can improve scores in Economics, Accountancy"
    },
    {
      "ClassName": "10th",
      "SectionName": "A",
      "SubjectName": "Mathematics",
      "StudentName": "Avinash Jain",
      "Student_ProfileLink": "https://www.fillmurray.com/640/360",
      "Total_Per": 90,
      "Gap_to_Bridge": "In Merit",
      "Comment": "Can improve scores in Social-studies"
    },
    {
      "ClassName": "10th",
      "SectionName": "A",
      "SubjectName": "Mathematics",
      "StudentName": "Amit Jain",
      "Student_ProfileLink": "https://www.fillmurray.com/640/360",
      "Total_Per": 76,
      "Gap_to_Bridge": "Require 1% more",
      "Comment": "Perfact Performance"
    },
    {
      "ClassName": "10th",
      "SectionName": "A",
      "SubjectName": "Science",
      "StudentName": "Saurabh Jain",
      "Student_ProfileLink": "https://placebeard.it/640x360",
      "Total_Per": 96,
      "Gap_to_Bridge": "In Merit",
      "Comment": "Can improve scores in Economics, Accountancy"
    },
    {
      "ClassName": "12th",
      "SectionName": "B",
      "SubjectName": "Mathematics",
      "StudentName": "Ankit Vishwkarma",
      "Student_ProfileLink": "https://www.placecage.com/640/360",
      "Total_Per": 66,
      "Gap_to_Bridge": "Require 2% more",
      "Comment": "Can improve scores in Maths, Science"
    },
    {
      "ClassName": "12th",
      "SectionName": "O",
      "SubjectName": "Social Studies",
      "StudentName": "Sunil Tale",
      "Student_ProfileLink": "https://www.stevensegallery.com/640/360",
      "Total_Per": 80,
      "Gap_to_Bridge": "In Merit",
      "Comment": "Can improve scores in Economics, Accountancy"
    },
    {
      "ClassName": "10th",
      "SectionName": "A",
      "SubjectName": "Mathematics",
      "StudentName": "Avinash Jain",
      "Student_ProfileLink": "https://www.fillmurray.com/640/360",
      "Total_Per": 90,
      "Gap_to_Bridge": "In Merit",
      "Comment": "Can improve scores in Social-studies"
    },
    {
      "ClassName": "10th",
      "SectionName": "A",
      "SubjectName": "Mathematics",
      "StudentName": "Amit Jain",
      "Student_ProfileLink": "https://www.fillmurray.com/640/360",
      "Total_Per": 76,
      "Gap_to_Bridge": "Require 1% more",
      "Comment": "Perfact Performance"
    },
    {
      "ClassName": "10th",
      "SectionName": "A",
      "SubjectName": "Science",
      "StudentName": "Saurabh Jain",
      "Student_ProfileLink": "https://placebeard.it/640x360",
      "Total_Per": 96,
      "Gap_to_Bridge": "In Merit",
      "Comment": "Can improve scores in Economics, Accountancy"
    },
    {
      "ClassName": "12th",
      "SectionName": "B",
      "SubjectName": "Mathematics",
      "StudentName": "Ankit Vishwkarma",
      "Student_ProfileLink": "https://www.placecage.com/640/360",
      "Total_Per": 66,
      "Gap_to_Bridge": "Require 2% more",
      "Comment": "Can improve scores in Maths, Science"
    },
    {
      "ClassName": "12th",
      "SectionName": "O",
      "SubjectName": "Social Studies",
      "StudentName": "Sunil Tale",
      "Student_ProfileLink": "https://www.stevensegallery.com/640/360",
      "Total_Per": 80,
      "Gap_to_Bridge": "In Merit",
      "Comment": "Can improve scores in Economics, Accountancy"
    },
    {
      "ClassName": "10th",
      "SectionName": "A",
      "SubjectName": "Mathematics",
      "StudentName": "Avinash Jain",
      "Student_ProfileLink": "https://www.fillmurray.com/640/360",
      "Total_Per": 90,
      "Gap_to_Bridge": "In Merit",
      "Comment": "Can improve scores in Social-studies"
    }
  ]
}

export const TOPPERFORMINGFECULTIES= {
  "Top_Performing_Feculties": [
    {
      "ClassName": "10th",
      "SectionName": "A",
      "SubjectName": "Mathematics",
      "TeacherName": "Amit Jain",
      "Teacher_ProfileLink": "https://www.fillmurray.com/640/360",
      "Total_Per": 90,
      "Rank": 1,
      "course_completed": 88,
      "assessment_taken": 12,
      "avg_attendance_in_exam": 87,
      "rank_score": 24.34,
      "total_class": 6
    },
    {
      "ClassName": "10th",
      "SectionName": "A",
      "SubjectName": "Science",
      "TeacherName": "Saurabh Jain",
      "Teacher_ProfileLink": "https://placebeard.it/640x360",
      "Total_Per": 80,
      "Rank": 2,
      "course_completed": 98,
      "assessment_taken": 15,
      "avg_attendance_in_exam": 85,
      "rank_score": 24.3,
      "total_class": 4
    },
    {
      "ClassName": "12th",
      "SectionName": "B",
      "SubjectName": "Mathematics",
      "TeacherName": "Ankit Vishwkarma",
      "Teacher_ProfileLink": "https://www.placecage.com/640/360",
      "Total_Per": 70,
      "Rank": 3,
      "course_completed": 90,
      "assessment_taken": 25,
      "avg_attendance_in_exam": 45,
      "rank_score": 28.3,
      "total_class": 8
    },
    {
      "ClassName": "12th",
      "SectionName": "O",
      "SubjectName": "Social Studies",
      "TeacherName": "Sunil Tale",
      "Teacher_ProfileLink": "https://www.stevensegallery.com/640/360",
      "Total_Per": 78,
      "Rank": 4,
      "course_completed": 88,
      "assessment_taken": 67,
      "avg_attendance_in_exam": 25,
      "rank_score": 64.3,
      "total_class": 8
    },
    {
      "ClassName": "10th",
      "SectionName": "A",
      "SubjectName": "Mathematics",
      "TeacherName": "Avinash Jain",
      "Teacher_ProfileLink": "https://www.fillmurray.com/640/360",
      "Total_Per": 93,
      "Rank": 5,
      "course_completed": 90,
      "assessment_taken": 83,
      "avg_attendance_in_exam": 25,
      "rank_score": 74.3,
      "total_class": 14
    },
    {
      "ClassName": "10th",
      "SectionName": "A",
      "SubjectName": "Mathematics",
      "TeacherName": "Amit Jain",
      "Teacher_ProfileLink": "https://www.fillmurray.com/640/360",
      "Total_Per": 90,
      "Rank": 6,
      "course_completed": 88,
      "assessment_taken": 15,
      "avg_attendance_in_exam": 85,
      "rank_score": 24.3,
      "total_class": 4
    },
    {
      "ClassName": "10th",
      "SectionName": "A",
      "SubjectName": "Science",
      "TeacherName": "Saurabh Jain",
      "Teacher_ProfileLink": "https://placebeard.it/640x360",
      "Total_Per": 80,
      "Rank": 7,
      "course_completed": 98,
      "assessment_taken": 45,
      "avg_attendance_in_exam": 25,
      "rank_score": 74.3,
      "total_class": 24
    },
    {
      "ClassName": "12th",
      "SectionName": "B",
      "SubjectName": "Mathematics",
      "TeacherName": "Ankit Vishwkarma",
      "Teacher_ProfileLink": "https://www.placecage.com/640/360",
      "Total_Per": 70,
      "Rank": 8,
      "course_completed": 90,
      "assessment_taken": 17,
      "avg_attendance_in_exam": 55.2,
      "rank_score": 45,
      "total_class": 11
    },
    {
      "ClassName": "12th",
      "SectionName": "O",
      "SubjectName": "Social Studies",
      "TeacherName": "Sunil Tale",
      "Teacher_ProfileLink": "https://www.stevensegallery.com/640/360",
      "Total_Per": 78,
      "Rank": 9,
      "course_completed": 88,
      "assessment_taken": 56,
      "avg_attendance_in_exam": 23.11,
      "rank_score": 21.31,
      "total_class": 43
    },
    {
      "ClassName": "10th",
      "SectionName": "A",
      "SubjectName": "Mathematics",
      "TeacherName": "Avinash Jain",
      "Teacher_ProfileLink": "https://www.fillmurray.com/640/360",
      "Total_Per": 93,
      "Rank": 10,
      "course_completed": 90,
      "assessment_taken": 56,
      "avg_attendance_in_exam": 23.11,
      "rank_score": 21.31,
      "total_class": 43
    },
    {
      "ClassName": "10th",
      "SectionName": "A",
      "SubjectName": "Mathematics",
      "TeacherName": "Amit Jain",
      "Teacher_ProfileLink": "https://www.fillmurray.com/640/360",
      "Total_Per": 90,
      "Rank": 11,
      "course_completed": 88,
      "assessment_taken": 45,
      "avg_attendance_in_exam": 25,
      "rank_score": 74.3,
      "total_class": 24
    },
    {
      "ClassName": "10th",
      "SectionName": "A",
      "SubjectName": "Science",
      "TeacherName": "Saurabh Jain",
      "Teacher_ProfileLink": "https://placebeard.it/640x360",
      "Total_Per": 80,
      "Rank": 12,
      "course_completed": 98,
      "assessment_taken": 56,
      "avg_attendance_in_exam": 23.11,
      "rank_score": 21.31,
      "total_class": 43
    },
    {
      "ClassName": "12th",
      "SectionName": "B",
      "SubjectName": "Mathematics",
      "TeacherName": "Ankit Vishwkarma",
      "Teacher_ProfileLink": "https://www.placecage.com/640/360",
      "Total_Per": 70,
      "Rank": 13,
      "course_completed": 90,
      "assessment_taken": 45,
      "avg_attendance_in_exam": 25,
      "rank_score": 74.3,
      "total_class": 24
    },
    {
      "ClassName": "12th",
      "SectionName": "O",
      "SubjectName": "Social Studies",
      "TeacherName": "Sunil Tale",
      "Teacher_ProfileLink": "https://www.stevensegallery.com/640/360",
      "Total_Per": 78,
      "Rank": 14,
      "course_completed": 88,
      "assessment_taken": 56,
      "avg_attendance_in_exam": 23.11,
      "rank_score": 21.31,
      "total_class": 43
    },
    {
      "ClassName": "10th",
      "SectionName": "A",
      "SubjectName": "Mathematics",
      "TeacherName": "Avinash Jain",
      "Teacher_ProfileLink": "https://www.fillmurray.com/640/360",
      "Total_Per": 93,
      "Rank": 15,
      "course_completed": 90,
      "assessment_taken": 45,
      "avg_attendance_in_exam": 25,
      "rank_score": 74.3,
      "total_class": 24
    },
    {
      "ClassName": "10th",
      "SectionName": "A",
      "SubjectName": "Mathematics",
      "TeacherName": "Amit Jain",
      "Teacher_ProfileLink": "https://www.fillmurray.com/640/360",
      "Total_Per": 90,
      "Rank": 16,
      "course_completed": 88,
      "assessment_taken": 45,
      "avg_attendance_in_exam": 15,
      "rank_score": 74.3,
      "total_class": 24
    },
    {
      "ClassName": "10th",
      "SectionName": "A",
      "SubjectName": "Science",
      "TeacherName": "Saurabh Jain",
      "Teacher_ProfileLink": "https://placebeard.it/640x360",
      "Total_Per": 80,
      "Rank": 17,
      "course_completed": 98,
      "assessment_taken": 56,
      "avg_attendance_in_exam": 23.11,
      "rank_score": 21.31,
      "total_class": 43
    },
    {
      "ClassName": "12th",
      "SectionName": "B",
      "SubjectName": "Mathematics",
      "TeacherName": "Ankit Vishwkarma",
      "Teacher_ProfileLink": "https://www.placecage.com/640/360",
      "Total_Per": 70,
      "Rank": 18,
      "course_completed": 90,
      "assessment_taken": 45,
      "avg_attendance_in_exam": 25,
      "rank_score": 74.3,
      "total_class": 24
    },
    {
      "ClassName": "12th",
      "SectionName": "O",
      "SubjectName": "Social Studies",
      "TeacherName": "Sunil Tale",
      "Teacher_ProfileLink": "https://www.stevensegallery.com/640/360",
      "Total_Per": 78,
      "Rank": 19,
      "course_completed": 88,
      "assessment_taken": 56,
      "avg_attendance_in_exam": 23.11,
      "rank_score": 21.31,
      "total_class": 43
    },
    {
      "ClassName": "10th",
      "SectionName": "A",
      "SubjectName": "Mathematics",
      "TeacherName": "Avinash Jain",
      "Teacher_ProfileLink": "https://www.fillmurray.com/640/360",
      "Total_Per": 93,
      "Rank": 20,
      "course_completed": 90,
      "assessment_taken": 45,
      "avg_attendance_in_exam": 25,
      "rank_score": 74.3,
      "total_class": 24
    },
    {
      "ClassName": "10th",
      "SectionName": "A",
      "SubjectName": "Mathematics",
      "TeacherName": "Amit Jain",
      "Teacher_ProfileLink": "https://www.fillmurray.com/640/360",
      "Total_Per": 90,
      "Rank": 21,
      "course_completed": 88,
      "assessment_taken": 56,
      "avg_attendance_in_exam": 23.11,
      "rank_score": 21.31,
      "total_class": 43
    },
    {
      "ClassName": "10th",
      "SectionName": "A",
      "SubjectName": "Science",
      "TeacherName": "Saurabh Jain",
      "Teacher_ProfileLink": "https://placebeard.it/640x360",
      "Total_Per": 80,
      "Rank": 22,
      "course_completed": 98,
      "assessment_taken": 45,
      "avg_attendance_in_exam": 25,
      "rank_score": 74.3,
      "total_class": 24
    },
    {
      "ClassName": "12th",
      "SectionName": "B",
      "SubjectName": "Mathematics",
      "TeacherName": "Ankit Vishwkarma",
      "Teacher_ProfileLink": "https://www.placecage.com/640/360",
      "Total_Per": 70,
      "Rank": 23,
      "course_completed": 90,
      "assessment_taken": 56,
      "avg_attendance_in_exam": 23.11,
      "rank_score": 21.31,
      "total_class": 43
    },
    {
      "ClassName": "12th",
      "SectionName": "O",
      "SubjectName": "Social Studies",
      "TeacherName": "Sunil Tale",
      "Teacher_ProfileLink": "https://www.stevensegallery.com/640/360",
      "Total_Per": 78,
      "Rank": 24,
      "course_completed": 88,
      "assessment_taken": 45,
      "avg_attendance_in_exam": 25,
      "rank_score": 74.3,
      "total_class": 24
    },
    {
      "ClassName": "10th",
      "SectionName": "A",
      "SubjectName": "Mathematics",
      "TeacherName": "Avinash Jain",
      "Teacher_ProfileLink": "https://www.fillmurray.com/640/360",
      "Total_Per": 93,
      "Rank": 25,
      "course_completed": 90,
      "assessment_taken": 56,
      "avg_attendance_in_exam": 23.11,
      "rank_score": 21.31,
      "total_class": 43
    }
  ]
}

export const KEYAREASTOFIND= {
  "Low_Course_Completion": [
    {
      "ClassName": "10th",
      "SectionName": "A",
      "SubjectName": "Mathematics",
      "TeacherName": "Amit Jain",
      "Teacher_ProfileLink": "https://www.fillmurray.com/640/360",
      "YTD_Course_com": 65,
      "YTD_Assesment": 3,
      "Result": 74
    },
    {
      "ClassName": "10th",
      "SectionName": "A",
      "SubjectName": "Science",
      "TeacherName": "Saurabh Jain",
      "Teacher_ProfileLink": "https://placebeard.it/640x360",
      "YTD_Course_com": 55,
      "YTD_Assesment": 7,
      "Result": 94
    },
    {
      "ClassName": "12th",
      "SectionName": "B",
      "SubjectName": "Mathematics",
      "TeacherName": "Ankit Vishwkarma",
      "Teacher_ProfileLink": "https://www.placecage.com/640/360",
      "YTD_Course_com": 85,
      "YTD_Assesment": 4,
      "Result": 90
    },
    {
      "ClassName": "12th",
      "SectionName": "O",
      "SubjectName": "Social Studies",
      "TeacherName": "Sunil Tale",
      "Teacher_ProfileLink": "https://www.stevensegallery.com/640/360",
      "YTD_Course_com": 45,
      "YTD_Assesment": 9,
      "Result": 79
    },
    {
      "ClassName": "10th",
      "SectionName": "A",
      "SubjectName": "Mathematics",
      "TeacherName": "Avinash Jain",
      "Teacher_ProfileLink": "https://www.fillmurray.com/640/360",
      "YTD_Course_com": 62,
      "YTD_Assesment": 6,
      "Result": 78
    },
    {
      "ClassName": "10th",
      "SectionName": "A",
      "SubjectName": "Mathematics",
      "TeacherName": "Amit Jain",
      "Teacher_ProfileLink": "https://www.fillmurray.com/640/360",
      "YTD_Course_com": 65,
      "YTD_Assesment": 3,
      "Result": 74
    },
    {
      "ClassName": "10th",
      "SectionName": "A",
      "SubjectName": "Science",
      "TeacherName": "Saurabh Jain",
      "Teacher_ProfileLink": "https://placebeard.it/640x360",
      "YTD_Course_com": 55,
      "YTD_Assesment": 7,
      "Result": 94
    },
    {
      "ClassName": "12th",
      "SectionName": "B",
      "SubjectName": "Mathematics",
      "TeacherName": "Ankit Vishwkarma",
      "Teacher_ProfileLink": "https://www.placecage.com/640/360",
      "YTD_Course_com": 85,
      "YTD_Assesment": 4,
      "Result": 90
    },
    {
      "ClassName": "12th",
      "SectionName": "O",
      "SubjectName": "Social Studies",
      "TeacherName": "Sunil Tale",
      "Teacher_ProfileLink": "https://www.stevensegallery.com/640/360",
      "YTD_Course_com": 45,
      "YTD_Assesment": 9,
      "Result": 79
    },
    {
      "ClassName": "10th",
      "SectionName": "A",
      "SubjectName": "Mathematics",
      "TeacherName": "Avinash Jain",
      "Teacher_ProfileLink": "https://www.fillmurray.com/640/360",
      "YTD_Course_com": 62,
      "YTD_Assesment": 6,
      "Result": 78
    },
    {
      "ClassName": "10th",
      "SectionName": "A",
      "SubjectName": "Mathematics",
      "TeacherName": "Amit Jain",
      "Teacher_ProfileLink": "https://www.fillmurray.com/640/360",
      "YTD_Course_com": 65,
      "YTD_Assesment": 3,
      "Result": 74
    },
    {
      "ClassName": "10th",
      "SectionName": "A",
      "SubjectName": "Science",
      "TeacherName": "Saurabh Jain",
      "Teacher_ProfileLink": "https://placebeard.it/640x360",
      "YTD_Course_com": 55,
      "YTD_Assesment": 7,
      "Result": 94
    },
    {
      "ClassName": "12th",
      "SectionName": "B",
      "SubjectName": "Mathematics",
      "TeacherName": "Ankit Vishwkarma",
      "Teacher_ProfileLink": "https://www.placecage.com/640/360",
      "YTD_Course_com": 85,
      "YTD_Assesment": 4,
      "Result": 90
    },
    {
      "ClassName": "12th",
      "SectionName": "O",
      "SubjectName": "Social Studies",
      "TeacherName": "Sunil Tale",
      "Teacher_ProfileLink": "https://www.stevensegallery.com/640/360",
      "YTD_Course_com": 45,
      "YTD_Assesment": 9,
      "Result": 79
    },
    {
      "ClassName": "10th",
      "SectionName": "A",
      "SubjectName": "Mathematics",
      "TeacherName": "Avinash Jain",
      "Teacher_ProfileLink": "https://www.fillmurray.com/640/360",
      "YTD_Course_com": 62,
      "YTD_Assesment": 6,
      "Result": 78
    }
  ],
  "Exam_Results_Pending": [
    {
      "ClassName": "10th",
      "SectionName": "A",
      "SubjectName": "Mathematics",
      "TeacherName": "Amit Jain",
      "Teacher_ProfileLink": "https://www.fillmurray.com/640/360",
      "Exam_Date": "25/01/2020",
      "Pending_For": "22"
    },
    {
      "ClassName": "10th",
      "SectionName": "A",
      "SubjectName": "Science",
      "TeacherName": "Saurabh Jain",
      "Teacher_ProfileLink": "https://placebeard.it/640x360",
      "Exam_Date": "10/01/2020",
      "Pending_For": "7"
    },
    {
      "ClassName": "12th",
      "SectionName": "B",
      "SubjectName": "Mathematics",
      "TeacherName": "Ankit Vishwkarma",
      "Teacher_ProfileLink": "https://www.placecage.com/640/360",
      "Exam_Date": "07/01/2020",
      "Pending_For": "14"
    },
    {
      "ClassName": "12th",
      "SectionName": "O",
      "SubjectName": "Social Studies",
      "TeacherName": "Sunil Tale",
      "Teacher_ProfileLink": "https://www.stevensegallery.com/640/360",
      "Exam_Date": "01/02/2020",
      "Pending_For": "12"
    },
    {
      "ClassName": "10th",
      "SectionName": "A",
      "SubjectName": "Mathematics",
      "TeacherName": "Avinash Jain",
      "Teacher_ProfileLink": "https://www.fillmurray.com/640/360",
      "Exam_Date": "30/01/2020",
      "Pending_For": "20"
    },
    {
      "ClassName": "10th",
      "SectionName": "A",
      "SubjectName": "Mathematics",
      "TeacherName": "Amit Jain",
      "Teacher_ProfileLink": "https://www.fillmurray.com/640/360",
      "Exam_Date": "25/01/2020",
      "Pending_For": "22"
    },
    {
      "ClassName": "10th",
      "SectionName": "A",
      "SubjectName": "Science",
      "TeacherName": "Saurabh Jain",
      "Teacher_ProfileLink": "https://placebeard.it/640x360",
      "Exam_Date": "10/01/2020",
      "Pending_For": "7"
    },
    {
      "ClassName": "12th",
      "SectionName": "B",
      "SubjectName": "Mathematics",
      "TeacherName": "Ankit Vishwkarma",
      "Teacher_ProfileLink": "https://www.placecage.com/640/360",
      "Exam_Date": "07/01/2020",
      "Pending_For": "14"
    },
    {
      "ClassName": "12th",
      "SectionName": "O",
      "SubjectName": "Social Studies",
      "TeacherName": "Sunil Tale",
      "Teacher_ProfileLink": "https://www.stevensegallery.com/640/360",
      "Exam_Date": "01/02/2020",
      "Pending_For": "12"
    },
    {
      "ClassName": "10th",
      "SectionName": "A",
      "SubjectName": "Mathematics",
      "TeacherName": "Avinash Jain",
      "Teacher_ProfileLink": "https://www.fillmurray.com/640/360",
      "Exam_Date": "30/01/2020",
      "Pending_For": "20"
    },
    {
      "ClassName": "10th",
      "SectionName": "A",
      "SubjectName": "Mathematics",
      "TeacherName": "Amit Jain",
      "Teacher_ProfileLink": "https://www.fillmurray.com/640/360",
      "Exam_Date": "25/01/2020",
      "Pending_For": "22"
    },
    {
      "ClassName": "10th",
      "SectionName": "A",
      "SubjectName": "Science",
      "TeacherName": "Saurabh Jain",
      "Teacher_ProfileLink": "https://placebeard.it/640x360",
      "Exam_Date": "10/01/2020",
      "Pending_For": "7"
    },
    {
      "ClassName": "12th",
      "SectionName": "B",
      "SubjectName": "Mathematics",
      "TeacherName": "Ankit Vishwkarma",
      "Teacher_ProfileLink": "https://www.placecage.com/640/360",
      "Exam_Date": "07/01/2020",
      "Pending_For": "14"
    },
    {
      "ClassName": "12th",
      "SectionName": "O",
      "SubjectName": "Social Studies",
      "TeacherName": "Sunil Tale",
      "Teacher_ProfileLink": "https://www.stevensegallery.com/640/360",
      "Exam_Date": "01/02/2020",
      "Pending_For": "12"
    },
    {
      "ClassName": "10th",
      "SectionName": "A",
      "SubjectName": "Mathematics",
      "TeacherName": "Avinash Jain",
      "Teacher_ProfileLink": "https://www.fillmurray.com/640/360",
      "Exam_Date": "30/01/2020",
      "Pending_For": "20"
    }
  ],
  "No_Assessment_for_Long": [
    {
      "ClassName": "10th",
      "SectionName": "A",
      "SubjectName": "Mathematics",
      "TeacherName": "Amit Jain",
      "Teacher_ProfileLink": "https://www.fillmurray.com/640/360",
      "Exam_Date": "25/01/2020",
      "Pending_For": "22"
    },
    {
      "ClassName": "10th",
      "SectionName": "A",
      "SubjectName": "Science",
      "TeacherName": "Saurabh Jain",
      "Teacher_ProfileLink": "https://placebeard.it/640x360",
      "Exam_Date": "10/01/2020",
      "Pending_For": "7"
    },
    {
      "ClassName": "12th",
      "SectionName": "B",
      "SubjectName": "Mathematics",
      "TeacherName": "Ankit Vishwkarma",
      "Teacher_ProfileLink": "https://www.placecage.com/640/360",
      "Exam_Date": "07/01/2020",
      "Pending_For": "14"
    },
    {
      "ClassName": "12th",
      "SectionName": "O",
      "SubjectName": "Social Studies",
      "TeacherName": "Sunil Tale",
      "Teacher_ProfileLink": "https://www.stevensegallery.com/640/360",
      "Exam_Date": "01/02/2020",
      "Pending_For": "12"
    },
    {
      "ClassName": "10th",
      "SectionName": "A",
      "SubjectName": "Mathematics",
      "TeacherName": "Avinash Jain",
      "Teacher_ProfileLink": "https://www.fillmurray.com/640/360",
      "Exam_Date": "30/01/2020",
      "Pending_For": "20"
    },
    {
      "ClassName": "10th",
      "SectionName": "A",
      "SubjectName": "Mathematics",
      "TeacherName": "Amit Jain",
      "Teacher_ProfileLink": "https://www.fillmurray.com/640/360",
      "Exam_Date": "25/01/2020",
      "Pending_For": "22"
    },
    {
      "ClassName": "10th",
      "SectionName": "A",
      "SubjectName": "Science",
      "TeacherName": "Saurabh Jain",
      "Teacher_ProfileLink": "https://placebeard.it/640x360",
      "Exam_Date": "10/01/2020",
      "Pending_For": "7"
    },
    {
      "ClassName": "12th",
      "SectionName": "B",
      "SubjectName": "Mathematics",
      "TeacherName": "Ankit Vishwkarma",
      "Teacher_ProfileLink": "https://www.placecage.com/640/360",
      "Exam_Date": "07/01/2020",
      "Pending_For": "14"
    },
    {
      "ClassName": "12th",
      "SectionName": "O",
      "SubjectName": "Social Studies",
      "TeacherName": "Sunil Tale",
      "Teacher_ProfileLink": "https://www.stevensegallery.com/640/360",
      "Exam_Date": "01/02/2020",
      "Pending_For": "12"
    },
    {
      "ClassName": "10th",
      "SectionName": "A",
      "SubjectName": "Mathematics",
      "TeacherName": "Avinash Jain",
      "Teacher_ProfileLink": "https://www.fillmurray.com/640/360",
      "Exam_Date": "30/01/2020",
      "Pending_For": "20"
    },
    {
      "ClassName": "10th",
      "SectionName": "A",
      "SubjectName": "Mathematics",
      "TeacherName": "Amit Jain",
      "Teacher_ProfileLink": "https://www.fillmurray.com/640/360",
      "Exam_Date": "25/01/2020",
      "Pending_For": "22"
    },
    {
      "ClassName": "10th",
      "SectionName": "A",
      "SubjectName": "Science",
      "TeacherName": "Saurabh Jain",
      "Teacher_ProfileLink": "https://placebeard.it/640x360",
      "Exam_Date": "10/01/2020",
      "Pending_For": "7"
    },
    {
      "ClassName": "12th",
      "SectionName": "B",
      "SubjectName": "Mathematics",
      "TeacherName": "Ankit Vishwkarma",
      "Teacher_ProfileLink": "https://www.placecage.com/640/360",
      "Exam_Date": "07/01/2020",
      "Pending_For": "14"
    },
    {
      "ClassName": "12th",
      "SectionName": "O",
      "SubjectName": "Social Studies",
      "TeacherName": "Sunil Tale",
      "Teacher_ProfileLink": "https://www.stevensegallery.com/640/360",
      "Exam_Date": "01/02/2020",
      "Pending_For": "12"
    },
    {
      "ClassName": "10th",
      "SectionName": "A",
      "SubjectName": "Mathematics",
      "TeacherName": "Avinash Jain",
      "Teacher_ProfileLink": "https://www.fillmurray.com/640/360",
      "Exam_Date": "30/01/2020",
      "Pending_For": "20"
    }
  ]
}

export const CLASSWISEPERFORMANCE= {
  "Class_Wise_Performace": {
    "male": {
      "current_score": "82",
      "previous_score": "78",
      "academic_year": "2020/2021",
      "previous_academic_year": "2019/2020"
    },
    "female": {
      "current_score": "82",
      "previous_score": "58",
      "academic_year": "2020/2021",
      "previous_academic_year": "2019/2020"
    },
    "academic_year": [
      {
        "ClassName": "10th",
        "SectionName": "A",
        "Course_completed": 78,
        "Overall_Result": 96,
        "Total_Students": 25,
        "Class_Teacher": "Sourabh Jain",
        "Class_Teacher_Profile": "https://www.fillmurray.com/640/360",
        "assesment_taken": 25,
        "avg_attandance_in_exam": 80,
        "AY_avg_score": 70,
        "best_subject": "Science",
        "poor_subject": "Hindi",
        "previous_assesment_taken": 10,
        "previous_avg_attandance_in_exam": 80,
        "previous_AY_avg_score": 90
      },
      {
        "ClassName": "12th",
        "SectionName": "A",
        "Course_completed": 89,
        "Overall_Result": 90,
        "Total_Students": 35,
        "Class_Teacher": "Sameer Verma",
        "Class_Teacher_Profile": "https://www.fillmurray.com/640/360",
        "assesment_taken": 30,
        "avg_attandance_in_exam": 81,
        "AY_avg_score": 70,
        "best_subject": "Social Science",
        "poor_subject": "English",
        "previous_assesment_taken": 11,
        "previous_avg_attandance_in_exam": 88,
        "previous_AY_avg_score": 67
      },
      {
        "ClassName": "11th",
        "SectionName": "D",
        "Course_completed": 86,
        "Overall_Result": 91,
        "Total_Students": 20,
        "Class_Teacher": "Sohan Sharma",
        "Class_Teacher_Profile": "https://www.fillmurray.com/640/360",
        "assesment_taken": 21,
        "avg_attandance_in_exam": 85,
        "AY_avg_score": 77,
        "best_subject": "Hindi",
        "poor_subject": "English",
        "previous_assesment_taken": 22,
        "previous_avg_attandance_in_exam": 84,
        "previous_AY_avg_score": 75
      },
      {
        "ClassName": "9th",
        "SectionName": "C",
        "Course_completed": 82,
        "Overall_Result": 86,
        "Total_Students": 30,
        "Class_Teacher": "Atul Rathod",
        "Class_Teacher_Profile": "https://www.fillmurray.com/640/360",
        "assesment_taken": 19,
        "avg_attandance_in_exam": 89,
        "AY_avg_score": 88,
        "best_subject": "Sanskrit",
        "poor_subject": "English",
        "previous_assesment_taken": 22,
        "previous_avg_attandance_in_exam": 88,
        "previous_AY_avg_score": 86
      },
      {
        "ClassName": "8th",
        "SectionName": "C",
        "Course_completed": 90,
        "Overall_Result": 91,
        "Total_Students": 32,
        "Class_Teacher": "Arvind Kejriwal",
        "Class_Teacher_Profile": "https://www.fillmurray.com/640/360",
        "assesment_taken": 22,
        "avg_attandance_in_exam": 84,
        "AY_avg_score": 80,
        "best_subject": "English",
        "poor_subject": "Economics",
        "previous_assesment_taken": 23,
        "previous_avg_attandance_in_exam": 83,
        "previous_AY_avg_score": 70
      },
      {
        "ClassName": "10th",
        "SectionName": "A",
        "Course_completed": 78,
        "Overall_Result": 96,
        "Total_Students": 25,
        "Class_Teacher": "Sourabh Jain",
        "Class_Teacher_Profile": "https://www.fillmurray.com/640/360",
        "assesment_taken": 25,
        "avg_attandance_in_exam": 80,
        "AY_avg_score": 70,
        "best_subject": "Science",
        "poor_subject": "Hindi",
        "previous_assesment_taken": 10,
        "previous_avg_attandance_in_exam": 80,
        "previous_AY_avg_score": 90
      },
      {
        "ClassName": "12th",
        "SectionName": "A",
        "Course_completed": 89,
        "Overall_Result": 90,
        "Total_Students": 35,
        "Class_Teacher": "Sameer Verma",
        "Class_Teacher_Profile": "https://www.fillmurray.com/640/360",
        "assesment_taken": 30,
        "avg_attandance_in_exam": 81,
        "AY_avg_score": 70,
        "best_subject": "Social Science",
        "poor_subject": "English",
        "previous_assesment_taken": 11,
        "previous_avg_attandance_in_exam": 88,
        "previous_AY_avg_score": 67
      },
      {
        "ClassName": "11th",
        "SectionName": "D",
        "Course_completed": 86,
        "Overall_Result": 91,
        "Total_Students": 20,
        "Class_Teacher": "Sohan Sharma",
        "Class_Teacher_Profile": "https://www.fillmurray.com/640/360",
        "assesment_taken": 21,
        "avg_attandance_in_exam": 85,
        "AY_avg_score": 77,
        "best_subject": "Hindi",
        "poor_subject": "English",
        "previous_assesment_taken": 22,
        "previous_avg_attandance_in_exam": 84,
        "previous_AY_avg_score": 75
      },
      {
        "ClassName": "9th",
        "SectionName": "C",
        "Course_completed": 82,
        "Overall_Result": 86,
        "Total_Students": 30,
        "Class_Teacher": "Atul Rathod",
        "Class_Teacher_Profile": "https://www.fillmurray.com/640/360",
        "assesment_taken": 19,
        "avg_attandance_in_exam": 89,
        "AY_avg_score": 88,
        "best_subject": "Sanskrit",
        "poor_subject": "English",
        "previous_assesment_taken": 22,
        "previous_avg_attandance_in_exam": 88,
        "previous_AY_avg_score": 86
      },
      {
        "ClassName": "8th",
        "SectionName": "C",
        "Course_completed": 90,
        "Overall_Result": 91,
        "Total_Students": 32,
        "Class_Teacher": "Arvind Kejriwal",
        "Class_Teacher_Profile": "https://www.fillmurray.com/640/360",
        "assesment_taken": 22,
        "avg_attandance_in_exam": 84,
        "AY_avg_score": 80,
        "best_subject": "English",
        "poor_subject": "Economics",
        "previous_assesment_taken": 23,
        "previous_avg_attandance_in_exam": 83,
        "previous_AY_avg_score": 70
      },
      {
        "ClassName": "10th",
        "SectionName": "A",
        "Course_completed": 78,
        "Overall_Result": 96,
        "Total_Students": 25,
        "Class_Teacher": "Sourabh Jain",
        "Class_Teacher_Profile": "https://www.fillmurray.com/640/360",
        "assesment_taken": 25,
        "avg_attandance_in_exam": 80,
        "AY_avg_score": 70,
        "best_subject": "Science",
        "poor_subject": "Hindi",
        "previous_assesment_taken": 10,
        "previous_avg_attandance_in_exam": 80,
        "previous_AY_avg_score": 90
      },
      {
        "ClassName": "12th",
        "SectionName": "A",
        "Course_completed": 89,
        "Overall_Result": 90,
        "Total_Students": 35,
        "Class_Teacher": "Sameer Verma",
        "Class_Teacher_Profile": "https://www.fillmurray.com/640/360",
        "assesment_taken": 30,
        "avg_attandance_in_exam": 81,
        "AY_avg_score": 70,
        "best_subject": "Social Science",
        "poor_subject": "English",
        "previous_assesment_taken": 11,
        "previous_avg_attandance_in_exam": 88,
        "previous_AY_avg_score": 67
      },
      {
        "ClassName": "11th",
        "SectionName": "D",
        "Course_completed": 86,
        "Overall_Result": 91,
        "Total_Students": 20,
        "Class_Teacher": "Sohan Sharma",
        "Class_Teacher_Profile": "https://www.fillmurray.com/640/360",
        "assesment_taken": 21,
        "avg_attandance_in_exam": 85,
        "AY_avg_score": 77,
        "best_subject": "Hindi",
        "poor_subject": "English",
        "previous_assesment_taken": 22,
        "previous_avg_attandance_in_exam": 84,
        "previous_AY_avg_score": 75
      },
      {
        "ClassName": "9th",
        "SectionName": "C",
        "Course_completed": 82,
        "Overall_Result": 86,
        "Total_Students": 30,
        "Class_Teacher": "Atul Rathod",
        "Class_Teacher_Profile": "https://www.fillmurray.com/640/360",
        "assesment_taken": 19,
        "avg_attandance_in_exam": 89,
        "AY_avg_score": 88,
        "best_subject": "Sanskrit",
        "poor_subject": "English",
        "previous_assesment_taken": 22,
        "previous_avg_attandance_in_exam": 88,
        "previous_AY_avg_score": 86
      },
      {
        "ClassName": "8th",
        "SectionName": "C",
        "Course_completed": 90,
        "Overall_Result": 91,
        "Total_Students": 32,
        "Class_Teacher": "Arvind Kejriwal",
        "Class_Teacher_Profile": "https://www.fillmurray.com/640/360",
        "assesment_taken": 22,
        "avg_attandance_in_exam": 84,
        "AY_avg_score": 80,
        "best_subject": "English",
        "poor_subject": "Economics",
        "previous_assesment_taken": 23,
        "previous_avg_attandance_in_exam": 83,
        "previous_AY_avg_score": 70
      },
      {
        "ClassName": "10th",
        "SectionName": "A",
        "Course_completed": 78,
        "Overall_Result": 96,
        "Total_Students": 25,
        "Class_Teacher": "Sourabh Jain",
        "Class_Teacher_Profile": "https://www.fillmurray.com/640/360",
        "assesment_taken": 25,
        "avg_attandance_in_exam": 80,
        "AY_avg_score": 70,
        "best_subject": "Science",
        "poor_subject": "Hindi",
        "previous_assesment_taken": 10,
        "previous_avg_attandance_in_exam": 80,
        "previous_AY_avg_score": 90
      },
      {
        "ClassName": "12th",
        "SectionName": "A",
        "Course_completed": 89,
        "Overall_Result": 90,
        "Total_Students": 35,
        "Class_Teacher": "Sameer Verma",
        "Class_Teacher_Profile": "https://www.fillmurray.com/640/360",
        "assesment_taken": 30,
        "avg_attandance_in_exam": 81,
        "AY_avg_score": 70,
        "best_subject": "Social Science",
        "poor_subject": "English",
        "previous_assesment_taken": 11,
        "previous_avg_attandance_in_exam": 88,
        "previous_AY_avg_score": 67
      },
      {
        "ClassName": "11th",
        "SectionName": "D",
        "Course_completed": 86,
        "Overall_Result": 91,
        "Total_Students": 20,
        "Class_Teacher": "Sohan Sharma",
        "Class_Teacher_Profile": "https://www.fillmurray.com/640/360",
        "assesment_taken": 21,
        "avg_attandance_in_exam": 85,
        "AY_avg_score": 77,
        "best_subject": "Hindi",
        "poor_subject": "English",
        "previous_assesment_taken": 22,
        "previous_avg_attandance_in_exam": 84,
        "previous_AY_avg_score": 75
      },
      {
        "ClassName": "9th",
        "SectionName": "C",
        "Course_completed": 82,
        "Overall_Result": 86,
        "Total_Students": 30,
        "Class_Teacher": "Atul Rathod",
        "Class_Teacher_Profile": "https://www.fillmurray.com/640/360",
        "assesment_taken": 19,
        "avg_attandance_in_exam": 89,
        "AY_avg_score": 88,
        "best_subject": "Sanskrit",
        "poor_subject": "English",
        "previous_assesment_taken": 22,
        "previous_avg_attandance_in_exam": 88,
        "previous_AY_avg_score": 86
      },
      {
        "ClassName": "8th",
        "SectionName": "C",
        "Course_completed": 90,
        "Overall_Result": 91,
        "Total_Students": 32,
        "Class_Teacher": "Arvind Kejriwal",
        "Class_Teacher_Profile": "https://www.fillmurray.com/640/360",
        "assesment_taken": 22,
        "avg_attandance_in_exam": 84,
        "AY_avg_score": 80,
        "best_subject": "English",
        "poor_subject": "Economics",
        "previous_assesment_taken": 23,
        "previous_avg_attandance_in_exam": 83,
        "previous_AY_avg_score": 70
      },
      {
        "ClassName": "10th",
        "SectionName": "A",
        "Course_completed": 78,
        "Overall_Result": 96,
        "Total_Students": 25,
        "Class_Teacher": "Sourabh Jain",
        "Class_Teacher_Profile": "https://www.fillmurray.com/640/360",
        "assesment_taken": 25,
        "avg_attandance_in_exam": 80,
        "AY_avg_score": 70,
        "best_subject": "Science",
        "poor_subject": "Hindi",
        "previous_assesment_taken": 10,
        "previous_avg_attandance_in_exam": 80,
        "previous_AY_avg_score": 90
      },
      {
        "ClassName": "12th",
        "SectionName": "A",
        "Course_completed": 89,
        "Overall_Result": 90,
        "Total_Students": 35,
        "Class_Teacher": "Sameer Verma",
        "Class_Teacher_Profile": "https://www.fillmurray.com/640/360",
        "assesment_taken": 30,
        "avg_attandance_in_exam": 81,
        "AY_avg_score": 70,
        "best_subject": "Social Science",
        "poor_subject": "English",
        "previous_assesment_taken": 11,
        "previous_avg_attandance_in_exam": 88,
        "previous_AY_avg_score": 67
      },
      {
        "ClassName": "11th",
        "SectionName": "D",
        "Course_completed": 86,
        "Overall_Result": 91,
        "Total_Students": 20,
        "Class_Teacher": "Sohan Sharma",
        "Class_Teacher_Profile": "https://www.fillmurray.com/640/360",
        "assesment_taken": 21,
        "avg_attandance_in_exam": 85,
        "AY_avg_score": 77,
        "best_subject": "Hindi",
        "poor_subject": "English",
        "previous_assesment_taken": 22,
        "previous_avg_attandance_in_exam": 84,
        "previous_AY_avg_score": 75
      },
      {
        "ClassName": "9th",
        "SectionName": "C",
        "Course_completed": 82,
        "Overall_Result": 86,
        "Total_Students": 30,
        "Class_Teacher": "Atul Rathod",
        "Class_Teacher_Profile": "https://www.fillmurray.com/640/360",
        "assesment_taken": 19,
        "avg_attandance_in_exam": 89,
        "AY_avg_score": 88,
        "best_subject": "Sanskrit",
        "poor_subject": "English",
        "previous_assesment_taken": 22,
        "previous_avg_attandance_in_exam": 88,
        "previous_AY_avg_score": 86
      },
      {
        "ClassName": "8th",
        "SectionName": "C",
        "Course_completed": 90,
        "Overall_Result": 91,
        "Total_Students": 32,
        "Class_Teacher": "Arvind Kejriwal",
        "Class_Teacher_Profile": "https://www.fillmurray.com/640/360",
        "assesment_taken": 22,
        "avg_attandance_in_exam": 84,
        "AY_avg_score": 80,
        "best_subject": "English",
        "poor_subject": "Economics",
        "previous_assesment_taken": 23,
        "previous_avg_attandance_in_exam": 83,
        "previous_AY_avg_score": 70
      },
      {
        "ClassName": "10th",
        "SectionName": "A",
        "Course_completed": 78,
        "Overall_Result": 96,
        "Total_Students": 25,
        "Class_Teacher": "Sourabh Jain",
        "Class_Teacher_Profile": "https://www.fillmurray.com/640/360",
        "assesment_taken": 25,
        "avg_attandance_in_exam": 80,
        "AY_avg_score": 70,
        "best_subject": "Science",
        "poor_subject": "Hindi",
        "previous_assesment_taken": 10,
        "previous_avg_attandance_in_exam": 80,
        "previous_AY_avg_score": 90
      },
      {
        "ClassName": "12th",
        "SectionName": "A",
        "Course_completed": 89,
        "Overall_Result": 90,
        "Total_Students": 35,
        "Class_Teacher": "Sameer Verma",
        "Class_Teacher_Profile": "https://www.fillmurray.com/640/360",
        "assesment_taken": 30,
        "avg_attandance_in_exam": 81,
        "AY_avg_score": 70,
        "best_subject": "Social Science",
        "poor_subject": "English",
        "previous_assesment_taken": 11,
        "previous_avg_attandance_in_exam": 88,
        "previous_AY_avg_score": 67
      },
      {
        "ClassName": "11th",
        "SectionName": "D",
        "Course_completed": 86,
        "Overall_Result": 91,
        "Total_Students": 20,
        "Class_Teacher": "Sohan Sharma",
        "Class_Teacher_Profile": "https://www.fillmurray.com/640/360",
        "assesment_taken": 21,
        "avg_attandance_in_exam": 85,
        "AY_avg_score": 77,
        "best_subject": "Hindi",
        "poor_subject": "English",
        "previous_assesment_taken": 22,
        "previous_avg_attandance_in_exam": 84,
        "previous_AY_avg_score": 75
      },
      {
        "ClassName": "9th",
        "SectionName": "C",
        "Course_completed": 82,
        "Overall_Result": 86,
        "Total_Students": 30,
        "Class_Teacher": "Atul Rathod",
        "Class_Teacher_Profile": "https://www.fillmurray.com/640/360",
        "assesment_taken": 19,
        "avg_attandance_in_exam": 89,
        "AY_avg_score": 88,
        "best_subject": "Sanskrit",
        "poor_subject": "English",
        "previous_assesment_taken": 22,
        "previous_avg_attandance_in_exam": 88,
        "previous_AY_avg_score": 86
      },
      {
        "ClassName": "8th",
        "SectionName": "C",
        "Course_completed": 90,
        "Overall_Result": 91,
        "Total_Students": 32,
        "Class_Teacher": "Arvind Kejriwal",
        "Class_Teacher_Profile": "https://www.fillmurray.com/640/360",
        "assesment_taken": 22,
        "avg_attandance_in_exam": 84,
        "AY_avg_score": 80,
        "best_subject": "English",
        "poor_subject": "Economics",
        "previous_assesment_taken": 23,
        "previous_avg_attandance_in_exam": 83,
        "previous_AY_avg_score": 70
      }
    ]
  }
}

export const CHAPTERSTUDENTWISE= {
  "chapter_student_wise": {
    "data": [
      {
        "student_name": "Shubham Verma",
        "student_profile_link": "https://randomuser.me/api/portraits/men/79.jpg",
        "chapter 1": 65,
        "chapter 2": 65,
        "chapter 3": 65,
        "chapter 4": 65,
        "chapter 5": 65,
        "chapter 6": 65,
        "overall_score": 65
      },
      {
        "student_name": "Sambit Patidar",
        "student_profile_link": "https://randomuser.me/api/portraits/men/7.jpg",
        "chapter 1": 52,
        "chapter 2": 52,
        "chapter 3": 52,
        "chapter 4": 52,
        "chapter 5": 52,
        "chapter 6": 52,
        "overall_score": 52
      },
      {
        "student_name": "Rahul Roy",
        "student_profile_link": "https://randomuser.me/api/portraits/men/9.jpg",
        "chapter 1": 80,
        "chapter 2": 80,
        "chapter 3": 80,
        "chapter 4": 80,
        "chapter 5": 80,
        "chapter 6": 80,
        "overall_score": 80
      },
      {
        "student_name": "Ravi Sharma",
        "student_profile_link": "https://randomuser.me/api/portraits/men/12.jpg",
        "chapter 1": 74,
        "chapter 2": 74,
        "chapter 3": 74,
        "chapter 4": 74,
        "chapter 5": 74,
        "chapter 6": 74,
        "overall_score": 74
      },
      {
        "student_name": "Rajesh Kumar",
        "student_profile_link": "https://randomuser.me/api/portraits/men/14.jpg",
        "chapter 1": 71,
        "chapter 2": 71,
        "chapter 3": 71,
        "chapter 4": 71,
        "chapter 5": 71,
        "chapter 6": 71,
        "overall_score": 71
      },
      {
        "student_name": "Shubham Verma",
        "student_profile_link": "https://randomuser.me/api/portraits/men/79.jpg",
        "chapter 1": 65,
        "chapter 2": 65,
        "chapter 3": 65,
        "chapter 4": 65,
        "chapter 5": 65,
        "chapter 6": 65,
        "overall_score": 65
      },
      {
        "student_name": "Shubham Verma",
        "student_profile_link": "https://randomuser.me/api/portraits/men/79.jpg",
        "chapter 1": 65,
        "chapter 2": 65,
        "chapter 3": 65,
        "chapter 4": 65,
        "chapter 5": 65,
        "chapter 6": 65,
        "overall_score": 65
      },
      {
        "student_name": "Sambit Patidar",
        "student_profile_link": "https://randomuser.me/api/portraits/men/7.jpg",
        "chapter 1": 52,
        "chapter 2": 52,
        "chapter 3": 52,
        "chapter 4": 52,
        "chapter 5": 52,
        "chapter 6": 52,
        "overall_score": 52
      },
      {
        "student_name": "Rahul Roy",
        "student_profile_link": "https://randomuser.me/api/portraits/men/9.jpg",
        "chapter 1": 80,
        "chapter 2": 80,
        "chapter 3": 80,
        "chapter 4": 80,
        "chapter 5": 80,
        "chapter 6": 80,
        "overall_score": 80
      },
      {
        "student_name": "Ravi Sharma",
        "student_profile_link": "https://randomuser.me/api/portraits/men/12.jpg",
        "chapter 1": 74,
        "chapter 2": 74,
        "chapter 3": 74,
        "chapter 4": 74,
        "chapter 5": 74,
        "chapter 6": 74,
        "overall_score": 74
      },
      {
        "student_name": "Rajesh Kumar",
        "student_profile_link": "https://randomuser.me/api/portraits/men/14.jpg",
        "chapter 1": 71,
        "chapter 2": 71,
        "chapter 3": 71,
        "chapter 4": 71,
        "chapter 5": 71,
        "chapter 6": 71,
        "overall_score": 71
      },
      {
        "student_name": "Shubham Verma",
        "student_profile_link": "https://randomuser.me/api/portraits/men/79.jpg",
        "chapter 1": 65,
        "chapter 2": 65,
        "chapter 3": 65,
        "chapter 4": 65,
        "chapter 5": 65,
        "chapter 6": 65,
        "overall_score": 65
      },
      {
        "student_name": "Shubham Verma",
        "student_profile_link": "https://randomuser.me/api/portraits/men/79.jpg",
        "chapter 1": 65,
        "chapter 2": 65,
        "chapter 3": 65,
        "chapter 4": 65,
        "chapter 5": 65,
        "chapter 6": 65,
        "overall_score": 65
      },
      {
        "student_name": "Sambit Patidar",
        "student_profile_link": "https://randomuser.me/api/portraits/men/7.jpg",
        "chapter 1": 52,
        "chapter 2": 52,
        "chapter 3": 52,
        "chapter 4": 52,
        "chapter 5": 52,
        "chapter 6": 52,
        "overall_score": 52
      },
      {
        "student_name": "Rahul Roy",
        "student_profile_link": "https://randomuser.me/api/portraits/men/9.jpg",
        "chapter 1": 80,
        "chapter 2": 80,
        "chapter 3": 80,
        "chapter 4": 80,
        "chapter 5": 80,
        "chapter 6": 80,
        "overall_score": 80
      },
      {
        "student_name": "Ravi Sharma",
        "student_profile_link": "https://randomuser.me/api/portraits/men/12.jpg",
        "chapter 1": 74,
        "chapter 2": 74,
        "chapter 3": 74,
        "chapter 4": 74,
        "chapter 5": 74,
        "chapter 6": 74,
        "overall_score": 74
      },
      {
        "student_name": "Rajesh Kumar",
        "student_profile_link": "https://randomuser.me/api/portraits/men/14.jpg",
        "chapter 1": 71,
        "chapter 2": 71,
        "chapter 3": 71,
        "chapter 4": 71,
        "chapter 5": 71,
        "chapter 6": 71,
        "overall_score": 71
      },
      {
        "student_name": "Shubham Verma",
        "student_profile_link": "https://randomuser.me/api/portraits/men/79.jpg",
        "chapter 1": 65,
        "chapter 2": 65,
        "chapter 3": 65,
        "chapter 4": 65,
        "chapter 5": 65,
        "chapter 6": 65,
        "overall_score": 65
      },
      {
        "student_name": "Shubham Verma",
        "student_profile_link": "https://randomuser.me/api/portraits/men/79.jpg",
        "chapter 1": 65,
        "chapter 2": 65,
        "chapter 3": 65,
        "chapter 4": 65,
        "chapter 5": 65,
        "chapter 6": 65,
        "overall_score": 65
      },
      {
        "student_name": "Sambit Patidar",
        "student_profile_link": "https://randomuser.me/api/portraits/men/7.jpg",
        "chapter 1": 52,
        "chapter 2": 52,
        "chapter 3": 52,
        "chapter 4": 52,
        "chapter 5": 52,
        "chapter 6": 52,
        "overall_score": 52
      },
      {
        "student_name": "Rahul Roy",
        "student_profile_link": "https://randomuser.me/api/portraits/men/9.jpg",
        "chapter 1": 80,
        "chapter 2": 80,
        "chapter 3": 80,
        "chapter 4": 80,
        "chapter 5": 80,
        "chapter 6": 80,
        "overall_score": 80
      },
      {
        "student_name": "Ravi Sharma",
        "student_profile_link": "https://randomuser.me/api/portraits/men/12.jpg",
        "chapter 1": 74,
        "chapter 2": 74,
        "chapter 3": 74,
        "chapter 4": 74,
        "chapter 5": 74,
        "chapter 6": 74,
        "overall_score": 74
      },
      {
        "student_name": "Rajesh Kumar",
        "student_profile_link": "https://randomuser.me/api/portraits/men/14.jpg",
        "chapter 1": 71,
        "chapter 2": 71,
        "chapter 3": 71,
        "chapter 4": 71,
        "chapter 5": 71,
        "chapter 6": 71,
        "overall_score": 71
      },
      {
        "student_name": "Shubham Verma",
        "student_profile_link": "https://randomuser.me/api/portraits/men/79.jpg",
        "chapter 1": 65,
        "chapter 2": 65,
        "chapter 3": 65,
        "chapter 4": 65,
        "chapter 5": 65,
        "chapter 6": 65,
        "overall_score": 65
      }
    ],
    "subject_names": [
      {
        "chapter_total_score_per": 80,
        "chaptername": "chapter 1"
      },
      {
        "chapter_total_score_per": 90.86,
        "chaptername": "chapter 2"
      },
      {
        "chapter_total_score_per": 50.5,
        "chaptername": "chapter 3"
      },
      {
        "chapter_total_score_per": 45.39,
        "chaptername": "chapter 4"
      },
      {
        "chapter_total_score_per": 70.5,
        "chaptername": "chapter 5"
      },
      {
        "chapter_total_score_per": 45.39,
        "chaptername": "chapter 6"
      }
    ]
  }
}

export const RESULTOVERVIEW = {
  "result": [
    {
      "className": "10th",
      "sectionName": "A",
      "teacherName": "Amit Jain",
      "teacher_profilelink": "https://www.fillmurray.com/640/360",
      "first_division": "87.5",
      "second_division": "60",
      "third_division": "20",
      "failed": "2",
      "previous_first_division": "57.5",
      "previous_second_division": "30",
      "previous_third_division": "70",
      "previous_failed": "10",
      "remark": "3 Students Fail in in 1 subject and 2 Students Fail in in more than 1 subject"
    },
    {
      "className": "10th",
      "sectionName": "A",
      "teacherName": "Saurabh Jain",
      "teacher_profilelink": "https://placebeard.it/640x360",
      "first_division": "30.5",
      "second_division": "64",
      "third_division": "26",
      "failed": "12",
      "previous_first_division": "57.5",
      "previous_second_division": "30",
      "previous_third_division": "70",
      "previous_failed": "10",
      "remark": "1 Students Fail in in 4 subject"
    },
    {
      "className": "12th",
      "sectionName": "B",
      "teacherName": "Ankit Vishwkarma",
      "teacher_profilelink": "https://www.placecage.com/640/360",
      "first_division": "50.5",
      "second_division": "44",
      "third_division": "22",
      "failed": "11",
      "previous_first_division": "67.5",
      "previous_second_division": "90",
      "previous_third_division": "77",
      "previous_failed": "17",
      "remark": "3 Students topped with same percentage"
    },
    {
      "className": "12th",
      "sectionName": "O",
      "teacherName": "Sunil Tale",
      "teacher_profilelink": "https://www.stevensegallery.com/640/360",
      "first_division": "67",
      "second_division": "34",
      "third_division": "22.6",
      "failed": "6",
      "previous_first_division": "51.5",
      "previous_second_division": "39",
      "previous_third_division": "34",
      "previous_failed": "6",
      "remark": "All top 5 student get equal marks in class."
    },
    {
      "className": "10th",
      "sectionName": "A",
      "teacherName": "Avinash Jain",
      "teacher_profilelink": "https://www.fillmurray.com/640/360",
      "first_division": "22",
      "second_division": "24",
      "third_division": "21",
      "failed": "56",
      "previous_first_division": "57.5",
      "previous_second_division": "30",
      "previous_third_division": "70",
      "previous_failed": "10",
      "remark": "All top 2 student get equal marks in class."
    },
    {
      "className": "10th",
      "sectionName": "A",
      "teacherName": "Amit Jain",
      "teacher_profilelink": "https://www.fillmurray.com/640/360",
      "first_division": "87.5",
      "second_division": "60",
      "third_division": "20",
      "failed": "2",
      "previous_first_division": "57.5",
      "previous_second_division": "30",
      "previous_third_division": "70",
      "previous_failed": "10",
      "remark": "3 Students Fail in in 1 subject and 2 Students Fail in in more than 1 subject"
    },
    {
      "className": "10th",
      "sectionName": "A",
      "teacherName": "Saurabh Jain",
      "teacher_profilelink": "https://placebeard.it/640x360",
      "first_division": "30.5",
      "second_division": "64",
      "third_division": "26",
      "failed": "12",
      "previous_first_division": "57.5",
      "previous_second_division": "30",
      "previous_third_division": "70",
      "previous_failed": "10",
      "remark": "1 Students Fail in in 4 subject"
    },
    {
      "className": "12th",
      "sectionName": "B",
      "teacherName": "Ankit Vishwkarma",
      "teacher_profilelink": "https://www.placecage.com/640/360",
      "first_division": "50.5",
      "second_division": "44",
      "third_division": "22",
      "failed": "11",
      "previous_first_division": "67.5",
      "previous_second_division": "90",
      "previous_third_division": "77",
      "previous_failed": "17",
      "remark": "3 Students topped with same percentage"
    },
    {
      "className": "12th",
      "sectionName": "O",
      "teacherName": "Sunil Tale",
      "teacher_profilelink": "https://www.stevensegallery.com/640/360",
      "first_division": "67",
      "second_division": "34",
      "third_division": "22.6",
      "failed": "6",
      "previous_first_division": "51.5",
      "previous_second_division": "39",
      "previous_third_division": "34",
      "previous_failed": "6",
      "remark": "All top 5 student get equal marks in class."
    },
    {
      "className": "10th",
      "sectionName": "A",
      "teacherName": "Avinash Jain",
      "teacher_profilelink": "https://www.fillmurray.com/640/360",
      "first_division": "22",
      "second_division": "24",
      "third_division": "21",
      "failed": "56",
      "previous_first_division": "57.5",
      "previous_second_division": "30",
      "previous_third_division": "70",
      "previous_failed": "10",
      "remark": "All top 2 student get equal marks in class."
    },
    {
      "className": "10th",
      "sectionName": "A",
      "teacherName": "Amit Jain",
      "teacher_profilelink": "https://www.fillmurray.com/640/360",
      "first_division": "87.5",
      "second_division": "60",
      "third_division": "20",
      "failed": "2",
      "previous_first_division": "57.5",
      "previous_second_division": "30",
      "previous_third_division": "70",
      "previous_failed": "10",
      "remark": "3 Students Fail in in 1 subject and 2 Students Fail in in more than 1 subject"
    },
    {
      "className": "10th",
      "sectionName": "A",
      "teacherName": "Saurabh Jain",
      "teacher_profilelink": "https://placebeard.it/640x360",
      "first_division": "30.5",
      "second_division": "64",
      "third_division": "26",
      "failed": "12",
      "previous_first_division": "57.5",
      "previous_second_division": "30",
      "previous_third_division": "70",
      "previous_failed": "10",
      "remark": "1 Students Fail in in 4 subject"
    },
    {
      "className": "12th",
      "sectionName": "B",
      "teacherName": "Ankit Vishwkarma",
      "teacher_profilelink": "https://www.placecage.com/640/360",
      "first_division": "50.5",
      "second_division": "44",
      "third_division": "22",
      "failed": "11",
      "previous_first_division": "67.5",
      "previous_second_division": "90",
      "previous_third_division": "77",
      "previous_failed": "17",
      "remark": "3 Students topped with same percentage"
    },
    {
      "className": "12th",
      "sectionName": "O",
      "teacherName": "Sunil Tale",
      "teacher_profilelink": "https://www.stevensegallery.com/640/360",
      "first_division": "67",
      "second_division": "34",
      "third_division": "22.6",
      "failed": "6",
      "previous_first_division": "51.5",
      "previous_second_division": "39",
      "previous_third_division": "34",
      "previous_failed": "6",
      "remark": "All top 5 student get equal marks in class."
    },
    {
      "className": "10th",
      "sectionName": "A",
      "teacherName": "Avinash Jain",
      "teacher_profilelink": "https://www.fillmurray.com/640/360",
      "first_division": "22",
      "second_division": "24",
      "third_division": "21",
      "failed": "56",
      "previous_first_division": "57.5",
      "previous_second_division": "30",
      "previous_third_division": "70",
      "previous_failed": "10",
      "remark": "All top 2 student get equal marks in class."
    },
    {
      "className": "10th",
      "sectionName": "A",
      "teacherName": "Amit Jain",
      "teacher_profilelink": "https://www.fillmurray.com/640/360",
      "first_division": "87.5",
      "second_division": "60",
      "third_division": "20",
      "failed": "2",
      "previous_first_division": "57.5",
      "previous_second_division": "30",
      "previous_third_division": "70",
      "previous_failed": "10",
      "remark": "3 Students Fail in in 1 subject and 2 Students Fail in in more than 1 subject"
    },
    {
      "className": "10th",
      "sectionName": "A",
      "teacherName": "Saurabh Jain",
      "teacher_profilelink": "https://placebeard.it/640x360",
      "first_division": "30.5",
      "second_division": "64",
      "third_division": "26",
      "failed": "12",
      "previous_first_division": "57.5",
      "previous_second_division": "30",
      "previous_third_division": "70",
      "previous_failed": "10",
      "remark": "1 Students Fail in in 4 subject"
    },
    {
      "className": "12th",
      "sectionName": "B",
      "teacherName": "Ankit Vishwkarma",
      "teacher_profilelink": "https://www.placecage.com/640/360",
      "first_division": "50.5",
      "second_division": "44",
      "third_division": "22",
      "failed": "11",
      "previous_first_division": "67.5",
      "previous_second_division": "90",
      "previous_third_division": "77",
      "previous_failed": "17",
      "remark": "3 Students topped with same percentage"
    },
    {
      "className": "12th",
      "sectionName": "O",
      "teacherName": "Sunil Tale",
      "teacher_profilelink": "https://www.stevensegallery.com/640/360",
      "first_division": "67",
      "second_division": "34",
      "third_division": "22.6",
      "failed": "6",
      "previous_first_division": "51.5",
      "previous_second_division": "39",
      "previous_third_division": "34",
      "previous_failed": "6",
      "remark": "All top 5 student get equal marks in class."
    },
    {
      "className": "10th",
      "sectionName": "A",
      "teacherName": "Avinash Jain",
      "teacher_profilelink": "https://www.fillmurray.com/640/360",
      "first_division": "22",
      "second_division": "24",
      "third_division": "21",
      "failed": "56",
      "previous_first_division": "57.5",
      "previous_second_division": "30",
      "previous_third_division": "70",
      "previous_failed": "10",
      "remark": "All top 2 student get equal marks in class."
    },
    {
      "className": "12th",
      "sectionName": "B",
      "teacherName": "Ankit Vishwkarma",
      "teacher_profilelink": "https://www.placecage.com/640/360",
      "first_division": "50.5",
      "second_division": "44",
      "third_division": "22",
      "failed": "11",
      "previous_first_division": "67.5",
      "previous_second_division": "90",
      "previous_third_division": "77",
      "previous_failed": "17",
      "remark": "3 Students topped with same percentage"
    },
    {
      "className": "12th",
      "sectionName": "O",
      "teacherName": "Sunil Tale",
      "teacher_profilelink": "https://www.stevensegallery.com/640/360",
      "first_division": "67",
      "second_division": "34",
      "third_division": "22.6",
      "failed": "6",
      "previous_first_division": "51.5",
      "previous_second_division": "39",
      "previous_third_division": "34",
      "previous_failed": "6",
      "remark": "All top 5 student get equal marks in class."
    },
    {
      "className": "10th",
      "sectionName": "A",
      "teacherName": "Avinash Jain",
      "teacher_profilelink": "https://www.fillmurray.com/640/360",
      "first_division": "22",
      "second_division": "24",
      "third_division": "21",
      "failed": "56",
      "previous_first_division": "57.5",
      "previous_second_division": "30",
      "previous_third_division": "70",
      "previous_failed": "10",
      "remark": "All top 2 student get equal marks in class."
    },
    {
      "className": "12th",
      "sectionName": "B",
      "teacherName": "Ankit Vishwkarma",
      "teacher_profilelink": "https://www.placecage.com/640/360",
      "first_division": "50.5",
      "second_division": "44",
      "third_division": "22",
      "failed": "11",
      "previous_first_division": "67.5",
      "previous_second_division": "90",
      "previous_third_division": "77",
      "previous_failed": "17",
      "remark": "3 Students topped with same percentage"
    },
    {
      "className": "12th",
      "sectionName": "O",
      "teacherName": "Sunil Tale",
      "teacher_profilelink": "https://www.stevensegallery.com/640/360",
      "first_division": "67",
      "second_division": "34",
      "third_division": "22.6",
      "failed": "6",
      "previous_first_division": "51.5",
      "previous_second_division": "39",
      "previous_third_division": "34",
      "previous_failed": "6",
      "remark": "All top 5 student get equal marks in class."
    },
    {
      "className": "10th",
      "sectionName": "A",
      "teacherName": "Avinash Jain",
      "teacher_profilelink": "https://www.fillmurray.com/640/360",
      "first_division": "22",
      "second_division": "24",
      "third_division": "21",
      "failed": "56",
      "previous_first_division": "57.5",
      "previous_second_division": "30",
      "previous_third_division": "70",
      "previous_failed": "10",
      "remark": "All top 2 student get equal marks in class."
    },
    {
      "className": "12th",
      "sectionName": "B",
      "teacherName": "Ankit Vishwkarma",
      "teacher_profilelink": "https://www.placecage.com/640/360",
      "first_division": "50.5",
      "second_division": "44",
      "third_division": "22",
      "failed": "11",
      "previous_first_division": "67.5",
      "previous_second_division": "90",
      "previous_third_division": "77",
      "previous_failed": "17",
      "remark": "3 Students topped with same percentage"
    },
    {
      "className": "12th",
      "sectionName": "O",
      "teacherName": "Sunil Tale",
      "teacher_profilelink": "https://www.stevensegallery.com/640/360",
      "first_division": "67",
      "second_division": "34",
      "third_division": "22.6",
      "failed": "6",
      "previous_first_division": "51.5",
      "previous_second_division": "39",
      "previous_third_division": "34",
      "previous_failed": "6",
      "remark": "All top 5 student get equal marks in class."
    },
    {
      "className": "10th",
      "sectionName": "A",
      "teacherName": "Avinash Jain",
      "teacher_profilelink": "https://www.fillmurray.com/640/360",
      "first_division": "22",
      "second_division": "24",
      "third_division": "21",
      "failed": "56",
      "previous_first_division": "57.5",
      "previous_second_division": "30",
      "previous_third_division": "70",
      "previous_failed": "10",
      "remark": "All top 2 student get equal marks in class."
    }            
  ],
  "previous_academic_year": "2019/20"
}
export const CLASSPERFORMANCEDETAILS= {
  "overall_details": {
    "total_student": 25,
    "total_boys": 16,
    "total_girls": 9,
    "total_subject": 8,
    "subject_list": [
      "Mathematics",
      "Physics",
      "Chemistry",
      "Social Studies",
      "Hindi",
      "English"
    ],
    "avg_score_per": 80,
    "boys_score_per": 50,
    "girls_score_per": 60,
    "data": [
      {
        "classname": "10th",
        "sectionName": "B",
        "subjectname": "Mathematics",
        "subject_teachername": "Punit Bhadoriya",
        "subject_teacher_profilelink": "https://randomuser.me/api/portraits/men/79.jpg",
        "course_completed_per": 67,
        "assesment_taken": 10,
        "avg_attendance_per": 82,
        "avg_score": 50,
        "highest_score_per": 70,
        "lowest_score_per": 10,
        "topper_student": "Juhi Singh"
      },
      {
        "classname": "10th",
        "sectionName": "B",
        "subjectname": "Physics",
        "subject_teachername": "Muskan Sinha",
        "subject_teacher_profilelink": "https://randomuser.me/api/portraits/men/79.jpg",
        "course_completed_per": 67,
        "assesment_taken": 10,
        "avg_attendance_per": 82,
        "avg_score": 50,
        "highest_score_per": 70,
        "lowest_score_per": 10,
        "topper_student": "Juhi Singh"
      },
      {
        "classname": "10th",
        "sectionName": "B",
        "subjectname": "Chemistry",
        "subject_teachername": "Abhishek Purohit",
        "subject_teacher_profilelink": "https://randomuser.me/api/portraits/men/19.jpg",
        "course_completed_per": 34,
        "assesment_taken": 54,
        "avg_attendance_per": 98,
        "avg_score": 67,
        "highest_score_per": 74,
        "lowest_score_per": 15,
        "topper_student": "Shivani Parmar"
      },
      {
        "classname": "10th",
        "sectionName": "B",
        "subjectname": "Social Science",
        "subject_teachername": "Chanda Chouhan",
        "subject_teacher_profilelink": "https://randomuser.me/api/portraits/women/19.jpg",
        "course_completed_per": 14,
        "assesment_taken": 34,
        "avg_attendance_per": 38,
        "avg_score": 47,
        "highest_score_per": 34,
        "lowest_score_per": 55,
        "topper_student": "Sakshi Mehta"
      },
      {
        "classname": "10th",
        "sectionName": "B",
        "subjectname": "Hindi",
        "subject_teachername": "J. S. Sisodiya",
        "subject_teacher_profilelink": "https://randomuser.me/api/portraits/men/45.jpg",
        "course_completed_per": 56,
        "assesment_taken": 24,
        "avg_attendance_per": 78,
        "avg_score": 57,
        "highest_score_per": 86,
        "lowest_score_per": 28,
        "topper_student": "Anil Mehta"
      },
      {
        "classname": "10th",
        "sectionName": "B",
        "subjectname": "English",
        "subject_teachername": "Renuka Das",
        "subject_teacher_profilelink": "https://randomuser.me/api/portraits/women/45.jpg",
        "course_completed_per": 86,
        "assesment_taken": 14,
        "avg_attendance_per": 88,
        "avg_score": 87,
        "highest_score_per": 99,
        "lowest_score_per": 28,
        "topper_student": "Anil Mehta"
      }
    ]
  },
  "class_level_subject_detail_data": {
    "subject_data": [
      {
        "classname": "10th",
        "sectionName": "B",
        "subjectname": "Mathematics",
        "subject_teachername": "Punit Bhadoriya",
        "subject_teacher_profilelink": "https://randomuser.me/api/portraits/men/79.jpg",
        "assesment_taken": 10,
        "avg_score": 50,
        "topper_student": "Avinash Sinha",
        "topper_student_profilelink": "https://randomuser.me/api/portraits/men/47.jpg",
        "topper_student_per": "95"
      },
      {
        "classname": "10th",
        "sectionName": "B",
        "subjectname": "Physics",
        "subject_teachername": "Muskan Sinha",
        "subject_teacher_profilelink": "https://randomuser.me/api/portraits/men/79.jpg",
        "assesment_taken": 10,
        "avg_score": 50,
        "topper_student": "Juhi Singh",
        "topper_student_profilelink": "https://randomuser.me/api/portraits/women/48.jpg",
        "topper_student_per": "91"
      },
      {
        "classname": "10th",
        "sectionName": "B",
        "subjectname": "Chemistry",
        "subject_teachername": "Abhishek Purohit",
        "subject_teacher_profilelink": "https://randomuser.me/api/portraits/men/19.jpg",
        "assesment_taken": 54,
        "avg_score": 67,
        "topper_student": "Shivani Parmar",
        "topper_student_profilelink": "https://randomuser.me/api/portraits/women/48.jpg",
        "topper_student_per": "79"
      },
      {
        "classname": "10th",
        "sectionName": "B",
        "subjectname": "Social Science",
        "subject_teachername": "Chanda Chouhan",
        "subject_teacher_profilelink": "https://randomuser.me/api/portraits/women/19.jpg",
        "assesment_taken": 34,
        "avg_score": 47,
        "topper_student": "Sakshi Mehta",
        "topper_student_profilelink": "https://randomuser.me/api/portraits/women/47.jpg",
        "topper_student_per": "88"
      },
      {
        "classname": "10th",
        "sectionName": "B",
        "subjectname": "Hindi",
        "subject_teachername": "J. S. Sisodiya",
        "subject_teacher_profilelink": "https://randomuser.me/api/portraits/men/45.jpg",
        "assesment_taken": 24,
        "avg_score": 57,
        "topper_student": "Mishbha Shah",
        "topper_student_profilelink": "https://randomuser.me/api/portraits/women/46.jpg",
        "topper_student_per": "98"
      },
      {
        "classname": "10th",
        "sectionName": "B",
        "subjectname": "English",
        "subject_teachername": "Renuka Das",
        "subject_teacher_profilelink": "https://randomuser.me/api/portraits/women/45.jpg",
        "assesment_taken": 14,
        "avg_score": 87,
        "topper_student": "Anil Mehta",
        "topper_student_profilelink": "https://randomuser.me/api/portraits/men/46.jpg",
        "topper_student_per": "99"
      }
    ],
    "student_data": [
      {
        "StudentName": "Ananya Jain",
        "Student_ProfileLink": "https://randomuser.me/api/portraits/women/51.jpg",
        "Mathematics": 78,
        "Physics": 64,
        "Chemistry": 60,
        "Social Science": 67,
        "Hindi": 77,
        "English": 90,
        "avg_Per": 76,
        "overall_score": 76,
        "result_status": "First Division"
      },
      {
        "StudentName": "Ananya Jain",
        "Student_ProfileLink": "https://randomuser.me/api/portraits/women/52.jpg",
        "Mathematics": 44,
        "Physics": 49,
        "Chemistry": 50,
        "Social Science": 67,
        "Hindi": 70,
        "English": 69,
        "avg_Per": 56,
        "overall_score": 67,
        "result_status": "Second Division"
      },
      {
        "StudentName": "Priti jha",
        "Student_ProfileLink": "https://randomuser.me/api/portraits/women/53.jpg",
        "Mathematics": 66,
        "Physics": 89,
        "Chemistry": 50,
        "Social Science": 77,
        "Hindi": 80,
        "English": 59,
        "avg_Per": 70,
        "overall_score": 84,
        "result_status": "First Division"
      },
      {
        "StudentName": "Sunny Baghel",
        "Student_ProfileLink": "https://randomuser.me/api/portraits/men/54.jpg",
        "Mathematics": 71,
        "Physics": 62,
        "Chemistry": 62,
        "Social Science": 62,
        "Hindi": 71,
        "English": 50,
        "avg_Per": 76,
        "overall_score": 64,
        "result_status": "First Division"
      },
      {
        "StudentName": "Aaditya Gupta",
        "Student_ProfileLink": "https://randomuser.me/api/portraits/men/55.jpg",
        "Mathematics": 64,
        "Physics": 44,
        "Chemistry": 55,
        "Social Science": 66,
        "Hindi": 73,
        "English": 59,
        "avg_Per": 66,
        "overall_score": 54,
        "result_status": "First Division"
      },
      {
        "StudentName": "Priti jha",
        "Student_ProfileLink": "https://randomuser.me/api/portraits/women/56.jpg",
        "Mathematics": 66,
        "Physics": 89,
        "Chemistry": 50,
        "Social Science": 77,
        "Hindi": 80,
        "English": 59,
        "avg_Per": 64,
        "overall_score": 76,
        "result_status": "First Division"
      },
      {
        "StudentName": "Ananya Jain",
        "Student_ProfileLink": "https://randomuser.me/api/portraits/women/57.jpg",
        "Mathematics": 78,
        "Physics": 64,
        "Chemistry": 60,
        "Social Science": 67,
        "Hindi": 77,
        "English": 90,
        "avg_Per": 76,
        "overall_score": 74,
        "result_status": "First Division"
      },
      {
        "StudentName": "Ananya Jain",
        "Student_ProfileLink": "https://randomuser.me/api/portraits/women/58.jpg",
        "Mathematics": 44,
        "Physics": 49,
        "Chemistry": 50,
        "Social Science": 67,
        "Hindi": 70,
        "English": 69,
        "avg_Per": 56,
        "overall_score": 52,
        "result_status": "Second Division"
      },
      {
        "StudentName": "Priti jha",
        "Student_ProfileLink": "https://randomuser.me/api/portraits/women/59.jpg",
        "Mathematics": 66,
        "Physics": 89,
        "Chemistry": 50,
        "Social Science": 77,
        "Hindi": 80,
        "English": 59,
        "avg_Per": 70,
        "overall_score": 80,
        "result_status": "First Division"
      },
      {
        "StudentName": "Sunny Baghel",
        "Student_ProfileLink": "https://randomuser.me/api/portraits/men/60.jpg",
        "Mathematics": 71,
        "Physics": 62,
        "Chemistry": 62,
        "Social Science": 62,
        "Hindi": 71,
        "English": 50,
        "avg_Per": 76,
        "overall_score": 90,
        "result_status": "First Division"
      },
      {
        "StudentName": "Aaditya Gupta",
        "Student_ProfileLink": "https://randomuser.me/api/portraits/men/61.jpg",
        "Mathematics": 64,
        "Physics": 44,
        "Chemistry": 55,
        "Social Science": 66,
        "Hindi": 73,
        "English": 59,
        "avg_Per": 66,
        "overall_score": 71,
        "result_status": "First Division"
      },
      {
        "StudentName": "Priti jha",
        "Student_ProfileLink": "https://randomuser.me/api/portraits/women/62.jpg",
        "Mathematics": 66,
        "Physics": 89,
        "Chemistry": 50,
        "Social Science": 77,
        "Hindi": 80,
        "English": 59,
        "avg_Per": 64,
        "overall_score": 69,
        "result_status": "First Division"
      },
      {
        "StudentName": "Ananya Jain",
        "Student_ProfileLink": "https://randomuser.me/api/portraits/women/63.jpg",
        "Mathematics": 78,
        "Physics": 64,
        "Chemistry": 60,
        "Social Science": 67,
        "Hindi": 77,
        "English": 90,
        "avg_Per": 76,
        "overall_score": 62,
        "result_status": "First Division"
      },
      {
        "StudentName": "Ananya Jain",
        "Student_ProfileLink": "https://randomuser.me/api/portraits/women/64.jpg",
        "Mathematics": 44,
        "Physics": 49,
        "Chemistry": 50,
        "Social Science": 67,
        "Hindi": 70,
        "English": 69,
        "avg_Per": 56,
        "overall_score": 46,
        "result_status": "Second Division"
      },
      {
        "StudentName": "Priti jha",
        "Student_ProfileLink": "https://randomuser.me/api/portraits/women/65.jpg",
        "Mathematics": 66,
        "Physics": 89,
        "Chemistry": 50,
        "Social Science": 77,
        "Hindi": 80,
        "English": 59,
        "avg_Per": 70,
        "overall_score": 67,
        "result_status": "First Division"
      },
      {
        "StudentName": "Sunny Baghel",
        "Student_ProfileLink": "https://randomuser.me/api/portraits/men/66.jpg",
        "Mathematics": 71,
        "Physics": 62,
        "Chemistry": 62,
        "Social Science": 62,
        "Hindi": 71,
        "English": 50,
        "avg_Per": 76,
        "overall_score": 60,
        "result_status": "First Division"
      },
      {
        "StudentName": "Aaditya Gupta",
        "Student_ProfileLink": "https://randomuser.me/api/portraits/men/67.jpg",
        "Mathematics": 64,
        "Physics": 44,
        "Chemistry": 55,
        "Social Science": 66,
        "Hindi": 73,
        "English": 59,
        "avg_Per": 66,
        "overall_score": 59,
        "result_status": "First Division"
      },
      {
        "StudentName": "Priti jha",
        "Student_ProfileLink": "https://randomuser.me/api/portraits/women/68.jpg",
        "Mathematics": 66,
        "Physics": 89,
        "Chemistry": 50,
        "Social Science": 77,
        "Hindi": 80,
        "English": 59,
        "avg_Per": 64,
        "overall_score": 88,
        "result_status": "First Division"
      },
      {
        "StudentName": "Ananya Jain",
        "Student_ProfileLink": "https://randomuser.me/api/portraits/women/69.jpg",
        "Mathematics": 78,
        "Physics": 64,
        "Chemistry": 60,
        "Social Science": 67,
        "Hindi": 77,
        "English": 90,
        "avg_Per": 76,
        "overall_score": 78,
        "result_status": "First Division"
      },
      {
        "StudentName": "Ananya Jain",
        "Student_ProfileLink": "https://randomuser.me/api/portraits/women/71.jpg",
        "Mathematics": 44,
        "Physics": 49,
        "Chemistry": 50,
        "Social Science": 67,
        "Hindi": 70,
        "English": 69,
        "avg_Per": 56,
        "overall_score": 57,
        "result_status": "Second Division"
      },
      {
        "StudentName": "Priti jha",
        "Student_ProfileLink": "https://randomuser.me/api/portraits/women/52.jpg",
        "Mathematics": 66,
        "Physics": 89,
        "Chemistry": 50,
        "Social Science": 77,
        "Hindi": 80,
        "English": 59,
        "avg_Per": 70,
        "overall_score": 83,
        "result_status": "First Division"
      },
      {
        "StudentName": "Sunny Baghel",
        "Student_ProfileLink": "https://randomuser.me/api/portraits/men/51.jpg",
        "Mathematics": 71,
        "Physics": 62,
        "Chemistry": 62,
        "Social Science": 62,
        "Hindi": 71,
        "English": 50,
        "avg_Per": 76,
        "overall_score": 65,
        "result_status": "First Division"
      },
      {
        "StudentName": "Aaditya Gupta",
        "Student_ProfileLink": "https://randomuser.me/api/portraits/men/53.jpg",
        "Mathematics": 64,
        "Physics": 44,
        "Chemistry": 55,
        "Social Science": 66,
        "Hindi": 73,
        "English": 59,
        "avg_Per": 66,
        "overall_score": 76,
        "result_status": "First Division"
      },
      {
        "StudentName": "Priti jha",
        "Student_ProfileLink": "https://randomuser.me/api/portraits/women/52.jpg",
        "Mathematics": 66,
        "Physics": 89,
        "Chemistry": 50,
        "Social Science": 77,
        "Hindi": 80,
        "English": 59,
        "avg_Per": 64,
        "overall_score": 84,
        "result_status": "First Division"
      },
      {
        "StudentName": "Ananya Jain",
        "Student_ProfileLink": "https://randomuser.me/api/portraits/women/51.jpg",
        "Mathematics": 78,
        "Physics": 64,
        "Chemistry": 60,
        "Social Science": 67,
        "Hindi": 77,
        "English": 90,
        "avg_Per": 76,
        "overall_score": 63,
        "result_status": "First Division"
      },
      {
        "StudentName": "Ananya Jain",
        "Student_ProfileLink": "https://randomuser.me/api/portraits/women/51.jpg",
        "Mathematics": 44,
        "Physics": 49,
        "Chemistry": 50,
        "Social Science": 67,
        "Hindi": 70,
        "English": 69,
        "avg_Per": 56,
        "overall_score": 52,
        "result_status": "Second Division"
      },
      {
        "StudentName": "Priti jha",
        "Student_ProfileLink": "https://randomuser.me/api/portraits/women/52.jpg",
        "Mathematics": 66,
        "Physics": 89,
        "Chemistry": 50,
        "Social Science": 77,
        "Hindi": 80,
        "English": 59,
        "avg_Per": 70,
        "overall_score": 83,
        "result_status": "First Division"
      },
      {
        "StudentName": "Sunny Baghel",
        "Student_ProfileLink": "https://randomuser.me/api/portraits/men/51.jpg",
        "Mathematics": 71,
        "Physics": 62,
        "Chemistry": 62,
        "Social Science": 62,
        "Hindi": 71,
        "English": 50,
        "avg_Per": 76,
        "overall_score": 65,
        "result_status": "First Division"
      },
      {
        "StudentName": "Aaditya Gupta",
        "Student_ProfileLink": "https://randomuser.me/api/portraits/men/53.jpg",
        "Mathematics": 64,
        "Physics": 44,
        "Chemistry": 55,
        "Social Science": 66,
        "Hindi": 73,
        "English": 59,
        "avg_Per": 66,
        "overall_score": 67,
        "result_status": "First Division"
      },
      {
        "StudentName": "Priti jha",
        "Student_ProfileLink": "https://randomuser.me/api/portraits/women/52.jpg",
        "Mathematics": 66,
        "Physics": 89,
        "Chemistry": 50,
        "Social Science": 77,
        "Hindi": 80,
        "English": 59,
        "avg_Per": 64,
        "overall_score": 83,
        "result_status": "First Division"
      }
    ]
  }
}

export const TEACHERPERFORMACEOVERVIEW= {
  "data": {
    "teachername": "Abhay Tilak",
    "teacherprofile": "https://randomuser.me/api/portraits/men/79.jpg",
    "subjectname": "Mathematics",
    "current_rank": "4",
    "previous_rank": "7",
    "academic_performance_view": {
      "class_and_sub_assigned": 8,
      "total_student": 40,
      "total_assesment": 20,
      "avg_attandance": 80,
      "avg_time": 4,
      "avg_score_completed": 70,
      "avg_assesment_class": 60,
      "avg_result": 84,
      "exam_difficulty_mix": 64,
      "exam_bloom_mix": 89,
      "data": [
        {
          "classname": "10th",
          "sectionName": "B",
          "subjectname": "Mathematics",
          "course_completed": 67,
          "assessment_taken": 18,
          "result": 70,
          "avg_attendance": 82
        },
        {
          "classname": "10th",
          "sectionName": "B",
          "subjectname": "Science",
          "course_completed": 80,
          "assessment_taken": 20,
          "result": 50,
          "avg_attendance": 80
        },
        {
          "classname": "10th",
          "sectionName": "B",
          "subjectname": "Physics",
          "course_completed": 89.9,
          "assessment_taken": 19,
          "result": 50.78,
          "avg_attendance": 40
        },
        {
          "classname": "10th",
          "sectionName": "B",
          "subjectname": "English",
          "course_completed": 29.9,
          "assessment_taken": 21,
          "result": 20.78,
          "avg_attendance": 10
        },
        {
          "classname": "10th",
          "sectionName": "B",
          "subjectname": "Mathematics",
          "course_completed": 67,
          "assessment_taken": 18,
          "result": 70,
          "avg_attendance": 82
        },
        {
          "classname": "10th",
          "sectionName": "B",
          "subjectname": "Science",
          "course_completed": 80,
          "assessment_taken": 20,
          "result": 50,
          "avg_attendance": 80
        },
        {
          "classname": "10th",
          "sectionName": "B",
          "subjectname": "Physics",
          "course_completed": 89.9,
          "assessment_taken": 22,
          "result": 50.78,
          "avg_attendance": 40
        },
        {
          "classname": "10th",
          "sectionName": "B",
          "subjectname": "English",
          "course_completed": 29.9,
          "assessment_taken": 21,
          "result": 20.78,
          "avg_attendance": 10
        },
        {
          "classname": "10th",
          "sectionName": "B",
          "subjectname": "Mathematics",
          "course_completed": 67,
          "assessment_taken": 16,
          "result": 70,
          "avg_attendance": 82
        },
        {
          "classname": "10th",
          "sectionName": "B",
          "subjectname": "Science",
          "course_completed": 80,
          "assessment_taken": 15,
          "result": 50,
          "avg_attendance": 80
        },
        {
          "classname": "10th",
          "sectionName": "B",
          "subjectname": "Physics",
          "course_completed": 89.9,
          "assessment_taken": 18,
          "result": 50.78,
          "avg_attendance": 40
        },
        {
          "classname": "10th",
          "sectionName": "B",
          "subjectname": "English",
          "course_completed": 29.9,
          "assessment_taken": 15,
          "result": 20.78,
          "avg_attendance": 10
        },
        {
          "classname": "10th",
          "sectionName": "B",
          "subjectname": "Mathematics",
          "course_completed": 67,
          "assessment_taken": 16,
          "result": 70,
          "avg_attendance": 82
        },
        {
          "classname": "10th",
          "sectionName": "B",
          "subjectname": "Science",
          "course_completed": 80,
          "assessment_taken": 20,
          "result": 50,
          "avg_attendance": 80
        },
        {
          "classname": "10th",
          "sectionName": "B",
          "subjectname": "Physics",
          "course_completed": 89.9,
          "assessment_taken": 22,
          "result": 50.78,
          "avg_attendance": 40
        },
        {
          "classname": "10th",
          "sectionName": "B",
          "subjectname": "English",
          "course_completed": 29.9,
          "assessment_taken": 18,
          "result": 20.78,
          "avg_attendance": 10
        }
      ]
    },
    "cognitive_performance_view": {
      "student_base": 320,
      "avg_score": 78,
      "lot_avg_score": 50,
      "hot_avg_score": 30,
      "data": [
        {
          "classname": "10th",
          "sectionName": "B",
          "subjectname": "Mathematics",
          "assesment_taken": 67,
          "result": 70,
          "understanding": 50,
          "remambering": 30,
          "application": 80,
          "creating": 66,
          "analysis": 40,
          "eveluation": 43
        },
        {
          "classname": "10th",
          "sectionName": "B",
          "subjectname": "Science",
          "assesment_taken": 62,
          "result": 50,
          "understanding": 60,
          "remambering": 36,
          "application": 87,
          "creating": 56,
          "analysis": 46,
          "eveluation": 43
        },
        {
          "classname": "10th",
          "sectionName": "B",
          "subjectname": "Science",
          "assesment_taken": 62,
          "result": 50,
          "understanding": 60,
          "remambering": 36,
          "application": 87,
          "creating": 56,
          "analysis": 46,
          "eveluation": 43
        },
        {
          "classname": "10th",
          "sectionName": "B",
          "subjectname": "Chemistry",
          "assesment_taken": 62,
          "result": 40,
          "understanding": 60,
          "remambering": 36,
          "application": 27,
          "creating": 76,
          "analysis": 44,
          "eveluation": 42
        },
        {
          "classname": "10th",
          "sectionName": "B",
          "subjectname": "Physics",
          "assesment_taken": 12,
          "result": 80,
          "understanding": 80,
          "remambering": 96,
          "application": 97,
          "creating": 96,
          "analysis": 76,
          "eveluation": 63
        },
        {
          "classname": "10th",
          "sectionName": "B",
          "subjectname": "Mathematics",
          "assesment_taken": 67,
          "result": 70,
          "understanding": 50,
          "remambering": 30,
          "application": 80,
          "creating": 66,
          "analysis": 40,
          "eveluation": 43
        },
        {
          "classname": "10th",
          "sectionName": "B",
          "subjectname": "Science",
          "assesment_taken": 62,
          "result": 50,
          "understanding": 60,
          "remambering": 36,
          "application": 87,
          "creating": 56,
          "analysis": 46,
          "eveluation": 43
        },
        {
          "classname": "10th",
          "sectionName": "B",
          "subjectname": "Science",
          "assesment_taken": 62,
          "result": 50,
          "understanding": 60,
          "remambering": 36,
          "application": 87,
          "creating": 56,
          "analysis": 46,
          "eveluation": 43
        },
        {
          "classname": "10th",
          "sectionName": "B",
          "subjectname": "Chemistry",
          "assesment_taken": 62,
          "result": 40,
          "understanding": 60,
          "remambering": 36,
          "application": 27,
          "creating": 76,
          "analysis": 44,
          "eveluation": 42
        },
        {
          "classname": "10th",
          "sectionName": "B",
          "subjectname": "Physics",
          "assesment_taken": 12,
          "result": 80,
          "understanding": 80,
          "remambering": 96,
          "application": 97,
          "creating": 96,
          "analysis": 76,
          "eveluation": 63
        },
        {
          "classname": "10th",
          "sectionName": "B",
          "subjectname": "Mathematics",
          "assesment_taken": 67,
          "result": 70,
          "understanding": 50,
          "remambering": 30,
          "application": 80,
          "creating": 66,
          "analysis": 40,
          "eveluation": 43
        },
        {
          "classname": "10th",
          "sectionName": "B",
          "subjectname": "Science",
          "assesment_taken": 62,
          "result": 50,
          "understanding": 60,
          "remambering": 36,
          "application": 87,
          "creating": 56,
          "analysis": 46,
          "eveluation": 43
        },
        {
          "classname": "10th",
          "sectionName": "B",
          "subjectname": "Science",
          "assesment_taken": 62,
          "result": 50,
          "understanding": 60,
          "remambering": 36,
          "application": 87,
          "creating": 56,
          "analysis": 46,
          "eveluation": 43
        },
        {
          "classname": "10th",
          "sectionName": "B",
          "subjectname": "Chemistry",
          "assesment_taken": 62,
          "result": 40,
          "understanding": 60,
          "remambering": 36,
          "application": 27,
          "creating": 76,
          "analysis": 44,
          "eveluation": 42
        },
        {
          "classname": "10th",
          "sectionName": "B",
          "subjectname": "Physics",
          "assesment_taken": 12,
          "result": 80,
          "understanding": 80,
          "remambering": 96,
          "application": 97,
          "creating": 96,
          "analysis": 76,
          "eveluation": 63
        }
      ]
    }
  }
}