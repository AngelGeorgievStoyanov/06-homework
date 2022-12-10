import { User, UserRegister } from "../model/users";


export type IdType = number ;


export interface Identifiable<K> {
  
    id: K;
}



export type Optional<T> = T | undefined;


export interface UserListener {
    (user: User | UserRegister) : void;
}

export interface UserListenerLogin {
    (username: string ,password:string) : void;
}


export interface UserUpdateListener {
    (todo: User) : void;
}


