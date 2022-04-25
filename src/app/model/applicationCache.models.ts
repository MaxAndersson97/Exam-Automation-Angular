export class baseCacheModel{
    public userEmail : String | undefined;
    public dateTime : Date | undefined;
    public issuedDate : Date | undefined;
}

export class AvailableCreditsCacheModel extends baseCacheModel {
    public FreePaperGenerationCount : number =0;
    public PaperCreatedCount : number =0;
    public ValidityDate : string = undefined;
}
