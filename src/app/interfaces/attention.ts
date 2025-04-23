import { ConsultationHours } from "./consultationHours";
import { Medic } from "./medic";
import { Patient } from "./patient";

export interface Attention {
    id?: number;

    date: Date;

    paymentDate?: String

    result?: string

    reason?: string

    observation?: string;

    dateCancelled?: string;

    consultationHours: ConsultationHours;

    patient:Patient;

}
