import { ConsultationHours } from "./consultationHours";
import { Medic } from "./medic";
import { Patient } from "./patient";

export interface Attention {
    id?: number;

    date: Date;

    paymentDate?: Date

    result?: string

    reason?: string

    currentIllness?: string

    vitalSigns?: string

    physicalExamination?: string;

    diagnosis?: string;

    treatment?: string;

    observation?: string;

    dateCancelled?: Date;

    consultationHours: ConsultationHours;

    patient:Patient;

}
