import { useContext, useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { Summary } from "../../components/Summary";
import { TransactionsContext } from "../../contexts/TransactionsContext";
import { dateFormatter, priceFormatter } from "../../utils/formatter";
import { SearchForm } from "./components/SearchForm";
import { PriceHighlight, TransactionsContainer, TransactionsTable } from "./styles";

interface Transaction {
    id: number;
    description: string;
    type: string;
    price: number;
    category: 'income' | 'outcome';
    createAt: string;
}

export function Transactions(){
    const { transactions } = useContext(TransactionsContext)

    /* const [transactions, setTransactions] = useState<Transaction[]>([])

    async function loadTransactions() {
        const response = await fetch("http://localhost:3333/transactions")
        const data = await response.json();

        setTransactions(data);
    }

    useEffect(() => {
        loadTransactions();
    }, []) */ // foi movido para transactioncontest.tsx

    /* useEffect(() => {
        fetch("http://localhost:3333/transactions").then(response => {
        response.json().then( data => 
            console.log(data)
        )
    })
    }, []) vai executar apenas uma vez pois o array de dependecias esta vazio */

    /* fetch("http://localhost:3333/transactions").then(response => {
        console.log(response)
    }) renderiza todas vez que executar essa função, por isso é melhor usar useEfect */



    return (
        <div>
            <Header/>
            <Summary />

            <TransactionsContainer>
                <SearchForm />
            <TransactionsTable>
                <tbody>
                    {transactions.map(transaction => {
                        return (
                            <tr key={transaction.id}>
                                <td width='50%'>{transaction.description}</td>
                                <td>
                                    <PriceHighlight variant={transaction.type}>
                                        {transaction.type === 'outcome' && '- '}
                                        {priceFormatter.format(transaction.price)}
                                    </PriceHighlight>
                                </td>
                                <td>{transaction.category}</td>
                                <td>{dateFormatter.format(new Date(transaction.createAt))}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </TransactionsTable>
            </TransactionsContainer>
        </div>
    )
} 