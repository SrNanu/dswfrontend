import { Medic } from "./medic";

export interface ConsultationHours {
    id?: number;
    day: string;
    startTime: string;
    //endTime: string;
    medic: Medic;
}