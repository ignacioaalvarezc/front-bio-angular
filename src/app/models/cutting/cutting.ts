export interface Cutting {
    cuttingId: number;
    responsibles: {
        responsibleId: number;
        name: string;
    },
    cutTypes: {
        cutTypeId: number;
        name: string;
    },
    totalWeight: number;
    totalStraws: number;
    date: Date;
    startTime: Date;
    endTime: Date;
    totalHours: number;
    observations: string;
}