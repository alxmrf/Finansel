import IncomeCategory from "./IncomeCategory";

export interface IncomePeriod {
    id: number;
    name: string;
    totalIncome: number;
    budgetedAmount: number;
    startDate: string;
    endDate: string;
    incomeCategory:IncomeCategory;
}
