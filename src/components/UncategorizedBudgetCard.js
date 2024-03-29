import React from "react"
import BudgetCard from "./BudgetCard"
import { UNCATEGORIZED_ID } from "./contexts/BudgetsContext"

export default function UncategorizedBudgetCard(props) {
    const { getBudgetExpenses } = useBudgets()
    const amount = getBudgetExpenses(UNCATEGORIZED_ID).reduce(
        (total, expense) => total + expense.amount,
        0
    )
    if (amount === 0) return null
    return (
        <BudgetCard amount={amount} name="uncategorized" gray {...props} />
    )
}