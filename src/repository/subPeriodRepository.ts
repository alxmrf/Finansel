import { SubPeriod } from "@/src/entity/SubPeriod";
import * as SQLite from "expo-sqlite";
import incomeCategoryRepository from "./incomeCategoriesRepository";
import incomePeriodRepository from "./incomePeriodRepository";

const db = await SQLite.openDatabaseAsync("finansel.db");

export const subPeriodRepository = {


    addSubPeriod: async (subPeriod: SubPeriod): Promise<void> => {
        const sql = `INSERT INTO SUB_PERIOD (NAME, BUDGETED_AMOUNT, START_DATE, END_DATE, INCOME_PERIOD_ID)
                     VALUES (?, ?, ?, ?, ?)`;

        const incomePeriod= await incomePeriodRepository.findById(subPeriod.incomePeriod.id);
        if(!incomePeriod) throw new Error("Income period not found for the given ID");
        const startDateParsed = subPeriod.startDate.toISOString().split('T')[0];
        const endDateParsed = subPeriod.endDate.toISOString().split('T')[0];

        await db.withTransactionAsync(async () => {
            await db.runAsync(sql, [
                subPeriod.name,
                subPeriod.budgetedAmount,
                startDateParsed,
                endDateParsed,
                subPeriod.incomePeriod.id
            ]);
        });
    },
    listAllSubPeriods: async (): Promise<SubPeriod[]> => {
        const sql = `SELECT * FROM SUB_PERIOD`;
        const result = await db.getAllAsync<SubPeriod>(sql);
        return await Promise.all(result.map((row: any) => (
            incomePeriodRepository.findById(row.INCOME_PERIOD_ID).then((ip) => ({
                id: row.ID,
                name: row.NAME,
                budgetedAmount: row.BUDGETED_AMOUNT,
                startDate: new Date(row.START_DATE),
                endDate: new Date(row.END_DATE),
                incomePeriod: ip
            })))
        ));
    },
    findSubPeriodByDate: async (date:Date): Promise<SubPeriod> => {
        const parsed_date:string = date.toISOString().split('T')[0];
        const result = await db.getFirstAsync<SubPeriod>(`SELECT * FROM SUB_PERIOD WHERE START_DATE <= ? AND END_DATE >= ?`,
             [parsed_date, parsed_date]);
    
        if (!result) {
            throw new Error("SubPeriod not found for the given date");
        }

        const incomePeriod = await incomePeriodRepository.findById(result.incomePeriod.id);

        if (!incomePeriod) {
            throw new Error("IncomePeriod not found for the given SubPeriod");
        }

        const resultWithIncomeCategory = {
            ...result,
            incomePeriod
        }
        return resultWithIncomeCategory;
    },
    findById: async (id:number): Promise<SubPeriod> => {

        const result = await db.getFirstAsync<SubPeriod>(`SELECT * FROM SUB_PERIOD WHERE ID = ?`, [id]);

        if (!result) {
            throw new Error("SubPeriod not found");
        }

        const incomePeriod = await incomePeriodRepository.findById(result.incomePeriod.id);

        if (!incomePeriod) {
            throw new Error("IncomePeriod not found for the given SubPeriod");
        }

        const resultWithIncomePeriod = {
            ...result,
            incomePeriod
        };
        return resultWithIncomePeriod;
    },
    update: async (subPeriod: SubPeriod): Promise<void> => {
        throw new Error("Not working dont use");

        if (!subPeriod.id) {
            throw new Error("SubPeriod ID is required for update");
        }

        let query = `UPDATE SUB_PERIOD SET`

        if(subPeriod.name) query += ` NAME = ?,`

        if(subPeriod.budgetedAmount) query += ` BUDGETED_AMOUNT = ?,`

        if(subPeriod.startDate) query += ` START_DATE = ?,`

        if(subPeriod.endDate) query += ` END_DATE = ?,`

        if(subPeriod.incomePeriod.id) {
            if(await incomeCategoryRepository.findIncomeCategoryByID(subPeriod.incomePeriod.id) != null) {
                query += ` INCOME_CATEGORY_ID = ?`
            }
            else{
                throw new Error("IncomePeriod not found the database may be wrong");
            }
        }

        query += ` WHERE ID = ?`

        
        

       /* await db.withTransactionAsync(async ()=>{
            await db.runAsync(query, 
                        [subPeriod.name,
                        subPeriod.budgetedAmount,
                        subPeriod.startDate,
                        subPeriod.endDate,
                        subPeriod.incomePeriod.id,
                        subPeriod.id]);
            });*/
    },
    delete: async (id:number): Promise<void> => {
        const sql = `DELETE FROM SUB_PERIOD WHERE ID = ?`;
        await db.withTransactionAsync(async () => {
            await db.runAsync(sql, [id]);
        });
    },
}
