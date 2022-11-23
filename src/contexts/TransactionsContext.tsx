import { ReactNode, useCallback, useEffect, useState } from 'react'
import { createContext } from 'use-context-selector'
import { api } from '../lib/axios'

interface Transaction {
  id: number
  description: string
  type: string
  price: number
  category: 'income' | 'outcome'
  createAt: string
}

interface CreateTransactionInput {
  description: string
  price: number
  category: string
  type: 'income' | 'outcome'
}

interface TansactionsContextType {
  transactions: Transaction[]
  fetchTransactions: (query?: string) => Promise<void> // vois pois ela nao tem retorno
  createTransaction: (data: CreateTransactionInput) => Promise<void>
}

interface TansactionsProviderProps {
  children: ReactNode
}

export const TransactionsContext = createContext({} as TansactionsContextType)

export function TransactionsProvider({ children }: TansactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  const fetchTransactions = useCallback(async (query?: string) => {
    const response = await api.get('transactions', {
      params: {
        _sort: 'createAt',
        _order: 'desc',
        q: query,
      },
    }) // parans é objeto dee configuraçoes

    setTransactions(response.data)
  },[])

  const createTransaction = useCallback(
    async (data: CreateTransactionInput) => {
      const { description, price, category, type } = data

      const response = await api.post('transactions', {
        description,
        price,
        category,
        type,
        createAt: new Date(),
      })

    setTransactions((state) => [response.data, ...state])
  },[])

  useEffect(() => {
    fetchTransactions()
  }, [fetchTransactions])

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        fetchTransactions,
        createTransaction,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  )
}
