import { Identifiable, IdType } from "../shared/common-types";
import { toIsoDate } from "../shared/utils";


export enum UserGender {
    MALE = 1, FEMALE
}

export enum UserRole {
    USER = 1, ADMIN
}

export enum UserStatus {
    ACTIVE = 1, SUSPENDED, DEACTIVATED
}

export class User implements Identifiable<IdType> {
    constructor(

        public id: IdType,
        public firstName: string,
        public lastName: string,
        public username: string,
        public password: string,
        public rePass: string,
        public gender: UserGender = UserGender.MALE,
        public role: UserRole = UserRole.USER,
        public imageUrl?: string,
        public description?: string,
        public timeCreated: string = toIsoDate(new Date()),
        public timeEdited?: string,
        public status: UserStatus=UserStatus.ACTIVE

    ) { }
}


export class UserRegister implements Omit<User, 'id'>{
    constructor(
        public firstName: string,
        public lastName: string,
        public username: string,
        public password: string,
        public rePass: string,
        public gender: UserGender = UserGender.MALE,
        public role: UserRole = UserRole.USER,
        public imageUrl?: string,
        public description?: string,
        public timeCreated: string = toIsoDate(new Date()),
        public timeEdited?: string,
        public status: UserStatus=UserStatus.ACTIVE

    ) { }
}

