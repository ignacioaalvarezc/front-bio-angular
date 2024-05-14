export interface Package {
    packageId: number;
    packaging: { packagingId: number };
    boxType: { boxTypeId: number };
    responsible: { responsibleId: number };
    date: Date;
    filterDate: Date;
    hour: Date;
    boxAmount: number;
    strawAmount: number;
    weightRejected: number;
    strawRejected: number;

}