export enum MasterStatus { Active = 1, DeActive = 2, Suspend = 3 }

export enum BoardSegment { Board = 1, University = 2, MCQ = 3, ProfessionalExam = 4 }

export enum RegisterVia { Web = 1, Mobile = 2, ExamAutomation = 3 }

// tslint:disable-next-line:max-line-length
export enum UserProfileType { Student = 1, Employee = 2, Partner = 3, Director = 4, Principal = 5, VicePrincipal = 6, Supervisor = 7, Teacher = 8 }

export enum UserType { Indian = 1, Overseas = 2 }

export enum FeedType { Promotions = 1, Questions = 2, Suggestion_Tip = 3, Videos = 4, Blogs = 5 }

export enum QuestionCautionType { MasterQuestion = 1, SubQuestion = 2, QuestionBank = 3, TextBookSolution = 4, ImportaceQuestion = 5 }

export enum LikeDislikeResourceType { Feed = 1, Video = 2 }

export enum FavouriteResourceType { Feed = 1, Video = 2 }

export enum FeedTimeFilter { LastMonth = 30, LastWeek = 7, Today = 1 }

export enum WhoAreYou { Student = 1, Teacher = 2, Partner = 3 }

export enum MessageResourceType { Feed = 1, Video = 2 }

// tslint:disable-next-line:max-line-length
// export enum RegistrationFor { [Description("Smart Study App")]            Smart_Study_App = 1, [Description("Smart Study For Auto Exam")]            Smart_Study_For_Auto_Exam = 2 }

export enum ClientType { Exclusive = 1, Generic = 2, Referral = 3 }

export enum MockQuestionType { YesNo = 1, Single = 2, Multiple = 3, Text = 4 }

export enum QuestionType { MCQ = 1, Fillintheblanks = 2, TrueorFalse = 3, ShortAnswer = 4, MediumAnswer = 5, LongAnswer = 6 }

export enum QuestionCategory { MasterQuestion = 1, SubQuestion = 2 }

export enum ChapterTopicSource { PaperSet = 1, QuestionBank = 2, TextBookSolution = 3 }

export enum QuestionMappingType { ChapterMapping = 1, TopicMapping = 2 }

export enum SBQTType { SamplePaperQuestion = 1, QuestionBank = 2, TestBookSolution = 3 }

// tslint:disable-next-line:max-line-length
// export enum StudentNameFormat { [Description("First Middle Last")]            First_Middle_Last = 1, [Description("Last Middle First")]            Last_Middle_First = 2 }