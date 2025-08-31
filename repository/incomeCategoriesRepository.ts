import IncomeCategory from "@/entity/IncomeCategory"
import * as sqldatabase from "expo-sqlite"



const table  = "INCOME_CATEGORY"
const incomeCategoryRepository = {
    
    createIncomeCategory: async (incomeCategory:IncomeCategory):Promise<void>=>{
        const db = await sqldatabase.openDatabaseAsync("finansel.db")
        await db.withTransactionAsync(async ()=>{
            db.runAsync(`INSERT INTO ${table} i (i.NAME, i.IS_INVESTABLE) VALUES(?,?)`, [
                incomeCategory.name,
                incomeCategory.isInvestable ? 1 : 0
            ])
        })
    },
    findAllIcomeCategories: async (): Promise<IncomeCategory[]> => {
        const db = await sqldatabase.openDatabaseAsync("finansel.db")
        const result = await db.getAllAsync<IncomeCategory>(`SELECT * FROM ${table}`)
        return result;
    },
    findIncomeCategoryByName:async (name:string)=>{
        const db = await sqldatabase.openDatabaseAsync("finansel.db")
        const result = await db.getAllAsync<IncomeCategory>(`SELECT * FROM ${table} i WHERE i.NAME = ?`,[
            name
        ])

        return result;
    },
    findIncomeCategoryByID:async (id:number): Promise<IncomeCategory | null>=>{
        const db = await sqldatabase.openDatabaseAsync("finansel.db")
        const result = await db.getFirstAsync<IncomeCategory>(`SELECT * FROM ${table} i WHERE i.ID = ?`,[
            id
        ])

        return result;
    },
    updateIncomeCategory: async (incomeCategory:IncomeCategory): Promise<void>=>{
                throw new Error("Not working dont use");

        const db = await sqldatabase.openDatabaseAsync("finansel.db")
        if(!incomeCategory.id) throw new Error("Income category ID is required for update")
        await db.withTransactionAsync(async ()=>{
            db.runAsync(`UPDATE ${table} SET NAME = ?, IS_INVESTABLE = ? WHERE ID = ?`, [
                incomeCategory.name,
                incomeCategory.isInvestable ? 1 : 0
            ])  
        })
    },
    deleteIncomeCategory: async (id:number): Promise<void>=>{
        const db = await sqldatabase.openDatabaseAsync("finansel.db")
        await db.withTransactionAsync(async ()=>{
            db.runAsync(`DELETE FROM ${table} WHERE ID = ?`, [
                id
            ])  
        })

    }

}
export default incomeCategoryRepository