import { HealthInsurance } from "./healthInsurance";

export interface Patient {
    id?: number;
    firstname: string;
    lastname: string;
    dni: string;
    phoneNumber: string;
    address: string;
    email: string;
    birthDate: Date;
    grupoSanguineo: string;
    antecedentesPersonales: string;
    antecedentesFamiliares: string;
    healthInsurance: HealthInsurance;
}