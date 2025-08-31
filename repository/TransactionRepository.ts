import { Transaction } from "@/entity/Trasaction";
import * as SQLite from "expo-sqlite"
import { subPeriodRepository } from "./subPeriodRepository";


const db = await SQLite.openDatabaseAsync("finansel.db");



export const TransactionRepository = {

    createTransaction:async (transaction: Transaction):Promise<void>=>{
        const transactionSubPeriod = await subPeriodRepository.findById(transaction.subPeriod.id);
        if (!transactionSubPeriod) throw new Error("SubPeriod not found, all trasactions must be tied to a subPeriod");
        db.withTransactionAsync(async()=>{
            db.runAsync(`INSERT INTO TRANSACTION (DESCRIPTION, AMOUNT, DATE, SUB_PERIOD) VALUES (?, ?, ?, ?)`, 
                [transaction.description, 
                    transaction.amount, 
                    transaction.date.toISOString().split('T')[0], 
                    transaction.subPeriod.id]);
        })

    },
    findAllTransactionsInDate: async (date: Date): Promise<Transaction[]> => {
        const parsedDate = date.toISOString().split('T')[0];
        const result = await db.getAllAsync<Transaction>(`SELECT * FROM TRANSACTION WHERE DATE = ?`, [parsedDate]);
        const transactionsWithSubPeriod = await Promise.all(result.map(async (tx) => {
            const subPeriod = await subPeriodRepository.findById(tx.subPeriod.id);
            return { ...tx, subPeriod };
        }));

        return transactionsWithSubPeriod;
    },
    findTransactionbyId: async (id: number): Promise<Transaction | null> => {
        const result = await db.getFirstAsync<Transaction>(`SELECT * FROM TRANSACTION WHERE ID = ?`, [id]);
        if (!result) return null;

        const subPeriod = await subPeriodRepository.findById(result.subPeriod.id);
        return { ...result, subPeriod };
    },
    
    updateTransaction : async(transaction:Transaction):Promise<void>=>{
        throw new Error("Not working dont use");
    },
    deleteTrasaction: async(id:number):Promise<void>=>{
        db.withTransactionAsync(async()=>{
            db.runAsync(`DELETE FROM TRANSACTION WHERE ID = ?`, [id]);
        })
    }







}