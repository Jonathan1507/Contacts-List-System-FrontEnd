import { Contact } from '../models/contact.model';

export interface LoadContacts{
    total: number;
    contacts: Contact[];
}
