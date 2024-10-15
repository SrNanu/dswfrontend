export interface Medic {
  id?: number;
  dni: string
  firstname: string
  lastname: string
  dniType: string
  username: string
  password: string
  medicalConsultationValue: number
  license: number
  consultationHours?: []
  specialty?: string
}