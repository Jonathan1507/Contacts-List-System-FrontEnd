interface _ContactUser {
    _id: string;
    name: string;
    email: string;
}

export class Contact {
    constructor(
        public name: string,
        public surnames: string,
        public email: string,
        public phone: string,
        public user?: _ContactUser,
        public _id?: string
    ) {}
}
