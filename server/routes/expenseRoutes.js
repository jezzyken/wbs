const express = require("express");
const router = express.Router();
const Expense = require("../models/Expense");

router.get("/", async (req, res) => {
  try {
    const expenses = await Expense.find({ isArchived: { $ne: true } });
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.get("/:id", async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);
    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }
    res.json(expense);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  const expense = new Expense({
    expenseId: req.body.expenseId,
    date: req.body.date,
    amount: req.body.amount,
    expenseType: req.body.expenseType,
    description: req.body.description,
  });

  try {
    const newExpense = await expense.save();
    res.status(201).json(newExpense);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);
    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    expense.expenseId = req.body.expenseId || expense.expenseId;
    expense.date = req.body.date || expense.date;
    expense.amount = req.body.amount || expense.amount;
    expense.expenseType = req.body.expenseType || expense.expenseType;
    expense.description = req.body.description || expense.description;

    const updatedExpense = await expense.save();
    res.json(updatedExpense);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);

    console.log(expense)
    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    const result = await Expense.findByIdAndUpdate(
      req.params.id,
      {
        isArchived: !expense.isArchived,
      },
      { new: true }
    );

    res.json({
      message: `Expense ${
        result.isArchived ? "archived" : "unarchived"
      } successfully`,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
