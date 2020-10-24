import { environment } from '../../environments/environment';

const base_url = environment.base_url;

export class User {
    constructor(
        public name: string,
        public surnames: string,
        public email: string,
        public password?: string,
        public uid?: string,
    ) {}
}
