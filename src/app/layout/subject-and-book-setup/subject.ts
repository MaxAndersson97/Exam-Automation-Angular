import { Book } from "./book";

export class Subject {
    isFirst: boolean;
    SubjectID: string;
    SubjectCode: string;
    SubjectName: string;
    IsSelected: boolean;
    Books: Array<Book>;
    listEASubjectBookMappingInfoMember: Array<Book>;
}
