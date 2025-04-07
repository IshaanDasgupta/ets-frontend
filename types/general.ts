export enum HomeType {
    USER_HOME = "user-home",
    HELPER_HOME = "helper-home",
    HELP_IN_PROGRESS = "help-in-progress",
}

export enum Relation {
    FATHER = "Father",
    MOTHTER = "Mother",
    GUARDIN = "Gardian",
    NONE = "None",
}

export interface UserMetadata {
    id: string;
    first_name: string;
    last_name: string;
    phone_no: string;
    gender: string;
    address: string;
    dob: string;
    blood_type: string;
    emergency_contact?: {
        first_name: string;
        last_name: string;
        phone_no: string;
        relation: Relation;
    };
    vehicle_details?: {
        name: string;
        number: string;
        color: string;
    };
}
