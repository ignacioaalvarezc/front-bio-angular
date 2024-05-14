export interface SanitizedBox {
    sanitizedBoxId: number;
    numberBox: number;
    strawType: {strawTypeId: number};
    sanitized: { sanitizedId: number };
    responsible: { responsibleId: number};
    date: Date;
    filterDate: Date;
    hourSanitized: string,
    hourDryingBegin: string,
    hourDryingEnd:string,
    hoursBetweenDryingBeginAndEnding: number,
    weightBeforeDrying: number,
    wetWeight: number,
    weightAfterDrying: number,
    weightGainPercentage: number,
    waterRetentionPercentage: number,
    observations: string,
    state: boolean
}