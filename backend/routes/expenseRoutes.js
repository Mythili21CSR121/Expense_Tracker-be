import express from 'express'
import Expense from '../models/expenseModel.js'

const router = express.Router()

// ADD AN EXPENSE
// Add a new expense
router.post('/', async (req, res) => {
  const { description, amount, transactionType, date } = req.body;
  try {
    const newExpense = new Expense({ description, amount, transactionType, date });
    await newExpense.save();
    const expenses = await Expense.find();
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// GET ALL EXPENSES
router.get('/', async (req, res) => {
  try {
    const expenses = await Expense.find().sort({ createdAt: -1 })
    res.status(200).json(expenses)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to retrieve expenses' })
  }
})

// GET FEW RECENT EXPENSES
router.get('/recent', async (req, res) => {
  try {
    const expenses = await Expense.find().limit(5).sort({ createdAt: -1 })
    res.status(200).json(expenses)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to retrieve recent expenses' })
  }
})

// UPDATE AN EXPENSE
router.put('/:id', async (req, res) => {
  try {
    const expenseUpdate = await Expense.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body
      },
      {
        new: true
      }
    )
    res.status(200).json(expenseUpdate)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to update expense' })
  }
})

// DELETE AN EXPENSE
router.delete('/:id', async (req, res) => {
  try {
    const expenseDelete = await Expense.findByIdAndDelete(req.params.id)
    res.status(200).json({ message: 'Transaction Deleted Successfully' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to delete expense' })
  }
})

export default router
