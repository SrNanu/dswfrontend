import { ConsultationHours } from "./consultationHours.js";
import { Specialty } from "./specialty";
import { UserBase } from "./userBase";
export interface Medic extends UserBase {
  id?: number;
  dni: string
  firstname: string
  lastname: string
  dniType: string
  medicalConsultationValue: number
  license: number
  consultationHours?: ConsultationHours[]
  specialty: Specialty
}