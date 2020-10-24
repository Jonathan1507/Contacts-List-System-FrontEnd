export class User {

    constructor(
        public name: string,
        public surnames: string,
        public email: string,
        public password?: string,
        public uid?: string,
    ) {}
}
