export interface Sanitized {
    sanitizedId: number;
    responsibles: {
        responsibleId: number;
        name: string;
    },
    strawTypes: {
        strawTypeId: number;
        name: string;
    },
    date: Date;
    startTime: Date;
    endTime: Date;
    totalHours: number;
    observations: string;
}