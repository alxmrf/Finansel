import { IncomePeriod } from "./IncomePeriod";

export interface SubPeriod{
    id: number;
    name: string;
    budgetedAmount: number;
    startDate: Date;
    endDate: Date;
    incomePeriod: IncomePeriod;
}