export interface entityWithoutId {
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    rePass: string;
    gender: string;
    role: string;
    imageUrl?: string;
    description?: string;
    timeCreated: string ;
    timeEdited?: string;
}