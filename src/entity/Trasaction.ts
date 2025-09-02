import { SubPeriod } from "./SubPeriod";

export interface Transaction {
    id: number;
    description: string;
    amount: number;
    date: Date;
    subPeriod: SubPeriod
}
