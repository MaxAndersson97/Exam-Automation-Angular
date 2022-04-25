import { ValidationMessage } from './validationmessage';

export class Staff {
    StudentID: string;
    InstituteID: string;
    UserID: string;
    FirstName: string;
    LastName: string;
    MiddleName: string;
    Role: string;
    Gender: string;
    DOB: string;
    Address: string;
    Landmark: string;
    CountryID: string;
    CountryName: string;
    StateID: string;
    StateName: string;
    City: string;
    Pincode: string;
    AadharNumber: string;
    Mobile: string;
    Email: string;
    SecondaryEmail: string;
    Password: string;
    ConfirmPassword: string;
    ListUserValidationInfoMember: ValidationMessage[];
}
