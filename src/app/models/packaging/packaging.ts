export interface Packaging {
    packagingId: number;
    responsibles: { responsibleId: number };
    date: Date;
    startTime: Date;
    endTime: Date;
    totalHours: number;
}