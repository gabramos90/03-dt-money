import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../lib/axios";

interface Transaction {
    id: number;
    description: string;
    type: string;
    price: number;
    category: 'income' | 'outcome';
    createAt: string;
}

interface TansactionsContextType {
    transactions: Transaction[];
    fetchTransactions: (query?: string) => Promise<void> //vois pois ela nao tem retorno
}

interface TansactionsProviderProps {
    children: ReactNode
}

export const TransactionsContext = createContext({} as TansactionsContextType)

export function TransactionsProvider({ children }: TansactionsProviderProps) {

    const [transactions, setTransactions] = useState<Transaction[]>([])

    async function fetchTransactions(query?: string) {
        const response = await api.get('transactions', {
            params: {
                q: query,
            }
        }) // parans é objeto dee configuraçoes


        setTransactions(response.data);
    }

    useEffect(() => {
        fetchTransactions();
    }, [])

    return(        
        <TransactionsContext.Provider value={{
             transactions,
             fetchTransactions
            }}>
            {children}
        </TransactionsContext.Provider>
    )
}