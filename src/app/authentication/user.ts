export class User {
    constructor(
        public accessToken: string,
        public tokenType: string,
        public expiresIn: number,
        public userName: string,
        public roles: string,
        public issued: Date,
        public expires: Date,
        public data: any,
        public InstituteUrl: string,
    ) { }
}

