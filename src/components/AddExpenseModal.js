import { Form, Modal, Button } from "react-bootstrap"
import { useRef } from "react"
import { useBudgets } from "../contexts/BudgetsContext"
import { UNCATEGORIZED_ID } from "./contexts/BudgetsContext"

export default function AddExpenseModal({ show, handleClose, defaultBudgetId }) {
    const descriptionRef = useRef()
    const amountRef = useRef()
    const budgetIdRef = useRef()
    const { addexpense, budgets } = useBudgets()

    function handleSubmit(e) {
        e.preventDefault()
        addExpense({
            description: descriptionRef.current.value,
            amount: parseFloat(amountRef.current.value),
            budgetId: budgetIdRef.current.value
        })
        handleClose()
    }
    return (
        <div>
            <Modal show={show } onHide={handleClose}>
                <Form onSubmit={handleSubmit}>
                    <Modal.Header closeButton>
                        <Modal.Title>New Expense</Modal.Title>
                    </Modal.Header>
                    <Modal.body>
                        <Form.Group className="mb-3" controlId="Description">
                            <Form.Label>Description</Form.Label>
                            <Form.Control ref={nameRef} type="text" required:min={0}/>
                        </Form.Group>
                    </Modal.body>
                    <Form.Group className="mb-1" controlId="amount">
                            <Form.Label>Amount</Form.Label>
                            <Form.Control 
                            ref={amountRef}
                            type="number"
                             required
                             min={0}
                            step={0.01}/>
                        </Form.Group>
                        <Form.Group className="mb-1" controlId="budgetId">
                            <Form.Label>Budget</Form.Label>
                            <Form.Select 
                            defaultValue={defaultBudgetId}
                            ref={budgetIdRef}>
                                <option id={UNCATEGORIZED_ID}>Uncategorized</option>
                            {budgets.map(budget => {
                                <option key={budget.id} value={budget.id}>
                                    {budget.name}
                                </option>
                            })}
                            </Form.Select>
                        </Form.Group>
                        <div className="d-flex justify-content-end">
                            <Button variant="primary"type="submit">
                                Add
                                </Button>

                        </div>

                </Form>

            </Modal>
        </div>
    )
}