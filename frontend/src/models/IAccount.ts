import { ContactsInterface } from "./IContact";
import { OldusersInterface } from "./IOlduser";
import { ReligionsInterface } from "./IReligion";
import { SexsInterface } from "./ISex";
import { UsersInterface } from "./IUser";

export interface AccountInterface {
    ID: string,
    Address: string,
    Province: string
    UserID: string,
    User: UsersInterface,
    SexID: string,
    Sex: SexsInterface,
    ContactID: string,
    Contact: ContactsInterface,
    OlduserID: string,
    Olduser: OldusersInterface,
    ReligionID: string,
    Religion: ReligionsInterface,



}