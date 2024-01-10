import { Modal, Button, Stack } from "react-bootstrap"
import { useBudgets } from "../contexts/BudgetsContext"
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "./contexts/BudgetsContext"
import { currencyFormatter } from "./utilis"

export default function ViewExpensesModal({ budgetId, handleClose }) {
    const { getBudgetExpenses, Budgets, deleteBudget, deleteExpense} =
    useBudgets()
    
    const expenses = getBudgetExpenses(budgetId)
    const budget = 
    UNCATEGORIZED_BUDGET_ID === budgetId
    ? { name: "uncategorized", id: UNCATEGORIZED_BUDGET_ID}
    : Budgets.find(b => b.id === budgetId)
    return (
        <div>
            <Modal show={budgetId != null} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            <Stack direction="horizontal" gap="2">
                                <div>Expenses - {budget?.name}</div>
                                {budgetId !== UNCATEGORIZED_BUDGET_ID && (
                                    <Button
                                    onClick={() => {
                                        deleteBudget(budget)
                                        handleClose()
                                    }}
                                    variant="outline-danger">
                                        Delete
                                        </Button>
                                    )}
                            </Stack>

                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <stack direction="vertical" gap="3">
                         {expenses.map(expense => {
                           <stack direction="horizontal"
                           gap="2" key={expense.id}>
                            <div className="me-auto fs-4">{expense.description}</div>
                            <div className="fs-5">{currencyFormatter.format(expense.amount)}
                            </div>
                            <Button onClick= {() => deleteExpense(expense)} size="sm" variant="outline-danger">
                                &times;
                                </Button>
                           </stack> 
                         })}
                        </stack>
                    </Modal.Body>
                        

            </Modal>
        </div>
    )
}