import { createContext, ReactNode, useEffect, useState } from "react";

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
}

interface TansactionsProviderProps {
    children: ReactNode
}

export const TransactionsContext = createContext({} as TansactionsContextType)

export function TransactionsProvider({ children }: TansactionsProviderProps) {

    const [transactions, setTransactions] = useState<Transaction[]>([])

    async function loadTransactions() {
        const response = await fetch("http://localhost:3333/transactions")
        const data = await response.json();

        setTransactions(data);
    }

    useEffect(() => {
        loadTransactions();
    }, [])

    return(        
        <TransactionsContext.Provider value={{ transactions }}>
            {children}
        </TransactionsContext.Provider>
    )
}