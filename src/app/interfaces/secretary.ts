import { UserBase } from "./userBase";

export interface Secretary extends UserBase {
    id?: number;
    firstname: string;
    lastname: string;
    mail: string;
    dniType: string;
    dni: number;
    bornDate: Date;
}