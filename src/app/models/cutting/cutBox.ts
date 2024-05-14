export interface CutBox {
    cutBoxId: number;
    amount: number;
    cutType: {cutTypeId: number};
    cutting: { cuttingId: number };
    responsible: { responsibleId: number};
    date: Date;
    filterDate: Date;
    hour: Date;
    weight: number;
}