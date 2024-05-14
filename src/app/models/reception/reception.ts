export interface Reception {
    receptionId: number;
    responsible: string;
    acceptedBales: number;
    rejectedBales: number;
    date: Date;
    startTime: Date,
    endTime: Date;
    totalHours: number;
    observations: string;
}