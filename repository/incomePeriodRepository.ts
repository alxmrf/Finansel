import { IncomePeriod } from "@/entity/IncomePeriod";
import * as sqldb from "expo-sqlite";
import incomeCategoryRepository from "./incomeCategoriesRepository";

const db = await sqldb.openDatabaseAsync("finansel.db");

const table = "INCOME_PERIOD"

const incomePeriodRepository = {
    create: async (data:IncomePeriod):Promise<void> => {
        const sql = ``;
        return db.withTransactionAsync(async () => {
            await db.runAsync(`INSERT INTO ${table} (NAME, TOTAL_INCOME, BUDGETED_AMOUNT, START_DATE, END_DATE, INCOME_CATEGORY_ID)
                     VALUES (?, ?, ?, ?, ?, ?)`, 
                     [data.name,
                        data.totalIncome,
                        data.budgetedAmount,
                        data.startDate,
                        data.endDate,
                        data.incomeCategory.id]);
        });
    },
    findIncomePeriodByDate: async (date:Date): Promise<IncomePeriod> => {
        const parsed_date:string = date.toISOString().split('T')[0];
        const result = await db.getFirstAsync<IncomePeriod>(`SELECT * FROM ${table} WHERE START_DATE <= ? AND END_DATE >= ?`,
             [parsed_date, parsed_date]);
    
        if (!result) {
            throw new Error("IncomePeriod not found for the given date");
        }

        const incomePeriod = await incomeCategoryRepository.findIncomeCategoryByID(result.incomeCategory.id);
        
        if (!incomePeriod) {
            throw new Error("IncomeCategory not found for the IncomePeriod");
        }

        const resultWithIncomeCategory = {
                id: result.id,
                name: result.name,
                totalIncome: result.totalIncome,
                budgetedAmount: result.budgetedAmount,
                startDate: result.startDate,
                endDate: result.endDate,
                incomeCategory: {
                id: incomePeriod.id,
                name: incomePeriod?.name,
                isInvestable: incomePeriod?.isInvestable }}
        return resultWithIncomeCategory;


    },
    findById: async (id:number): Promise<IncomePeriod> => {

        const result = await db.getFirstAsync<IncomePeriod>(`SELECT * FROM ${table} WHERE ID = ?`, [id]);

        if (!result) {
            throw new Error("IncomePeriod not found");
        }

        const incomeCategory = await incomeCategoryRepository.findIncomeCategoryByID(result.incomeCategory.id);

        if (!incomeCategory) {
            throw new Error("IncomeCategory not found for the IncomePeriod");
        }

        const resultWithIncomeCategory = {
            id: result.id,
            name: result.name,
            totalIncome: result.totalIncome,
            budgetedAmount: result.budgetedAmount,
            startDate: result.startDate,
            endDate: result.endDate,
            incomeCategory: {
                id: incomeCategory.id,
                name: incomeCategory?.name,
                isInvestable: incomeCategory?.isInvestable
            }
        };
        return resultWithIncomeCategory;

    },
    findAll: async () :Promise<IncomePeriod[]> => {

        const result = await db.getAllAsync<IncomePeriod>(`SELECT * FROM ${table}`);
        if (!result) {
            throw new Error("No IncomePeriods found");
        }

        const resultWithIncomeCategory = result.map(async (incomePeriod) => {
            const incomeCategory = await incomeCategoryRepository.findIncomeCategoryByID(incomePeriod.incomeCategory.id);
            if (!incomeCategory) {
                throw new Error("IncomeCategory not found for the IncomePeriod");
            }
            return {
                ...incomePeriod,
                incomeCategory:incomeCategory
            };
        });
        return Promise.all(resultWithIncomeCategory);
    },
    //NOT WORKING DONT USE
    update: async (incomePeriod: IncomePeriod): Promise<void> => {

        throw new Error("Not working dont use");
        if (!incomePeriod.id) {
            throw new Error("IncomePeriod ID is required for update");
        }
        
        let query = `UPDATE ${table} SET`

        if(incomePeriod.name) query += ` NAME = ?,`

        if(incomePeriod.totalIncome) query += ` TOTAL_INCOME = ?,`

        if(incomePeriod.budgetedAmount) query += ` BUDGETED_AMOUNT = ?,`

        if(incomePeriod.startDate) query += ` START_DATE = ?,`

        if(incomePeriod.endDate) query += ` END_DATE = ?,`

        if(incomePeriod.incomeCategory.id) {
            if(await incomeCategoryRepository.findIncomeCategoryByID(incomePeriod.incomeCategory.id) != null) {
                query += ` INCOME_CATEGORY_ID = ?`
            }
        }

        query += ` WHERE ID = ?`

        await db.withTransactionAsync(async ()=>{
            await db.runAsync(query, 
                     [incomePeriod.name,
                      incomePeriod.totalIncome,
                      incomePeriod.budgetedAmount,
                      incomePeriod.startDate,
                      incomePeriod.endDate,
                      incomePeriod.incomeCategory.id,
                      incomePeriod.id]);
        });
    },
    delete: async (id:number): Promise<void> => {
        const sql = `DELETE FROM ${table} WHERE ID = ?`;
        await db.withTransactionAsync(async () => {
            await db.runAsync(sql, [id]);
        });
    },

}

export default incomePeriodRepository;