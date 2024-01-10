import { Button, Stack } from "react-bootstrap";
import Container from "react-bootstrap/Container"
import AddBudgetModal from "./components/AddBudgetModal"
import AddExpenseModal from "./components/AddExpenseModal"
import ViewExpensesModal from "./components/ViewExpensesModal"
import BudgetCard from "./components/BudgetCard";
import UncategorizedBudgetCard from "./components/UncategorizedBudgetCard";
import TotalBudgetCard from "./components/TotalBudgetCard";
import { useState } from "react"
import { useBudgets } from "./contexts/BudgetsContext"

function App() {
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false)
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false)
  const [AddExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState()
  const [ViewExpensesModalId, setViewExpensesModalBudgetId] = useState()
  const { budgets, getBudgetExpenses } = useBudgets()

  function openAddExpenseModal(budgetId) {
    setShowAddBudgetModal(true)
    setAddExpenseModalBudgetId(budgetId)
  }

  return ( 
  <>
  <Container>
    <Stack direction="horizontal" gap="2" className="my-4">
      <h1 className="me-auto">Budgets</h1>
      <Button variant="primary" onclick={() => setShowAddBudgetModal(true)}>
        Add Budget
        </Button>
      <Button variant="outline-primary"
       onClick={openAddExpenseModal} >
        Add Expense
        </Button>
    </Stack>
    <div style= {{ display:"grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px, 1fr))",
    gap: "1rem",
  alignItems: "flex-start",
  }}>
    {budgets.map(budget => {
      const amount = getBudgetExpenses(budget.id).reduce((total,
        expense) => total + expense.amount,
        )
    return (
      <BudgetCard
      key={budget.id}
      name={budget.name}
      gray
      amount={amount}
      max={budget.max}
      onAddExpenseClick={() => openAddExpenseModal(budget.id)}
      onViewExpensesClick={() => setViewExpensesModalBudgetId(budget.id)}
       />
    )
   } )}
   <UncategorizedBudgetCard onAddExpenseClick={openAddExpenseModal}
   onViewExpensesClick={setViewExpensesModalBudgetId(UNCATEGORIZED_BUDGET_ID)}/>
   
   <TotalBudgetCard/>
  </div>
  </Container>
  <AddBudgetModal 
  show={showAddExpenseModal}
  handleClose={() =>
  setShowAddBudgetModal(false)} />

  <AddExpenseModal
  defaultBudgetId={AddExpenseModalBudgetId} 
  show={true}
  handleClose={() => setShowAddExpenseModal(false)}/>

  <ViewExpensesModal
  budgetId={ViewExpensesModalBudgetId} 
  handleClose={() => setViewExpensesModalBudgetId(false)}  
  />
  </>
  )
}

export default App;

