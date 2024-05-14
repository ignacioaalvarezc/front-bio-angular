export interface ExtraTask {
    extraTaskId: number;
    responsible: { responsibleId: number};
    activity: { activityId: number};
    date: Date;
    filterDate: Date;
    startTaskTime: string,
    endTaskTime: string;
    totalTaskHours: number;
}