const express = require("express");
const router = express.Router();
const Payment = require("../models/Payment");
const Expense = require("../models/Expense");
const Bill = require("../models/Bill");

// Daily Collections Report
router.get("/collections/daily", async (req, res) => {
  try {
    const { date } = req.query;
    const startDate = new Date(date);
    startDate.setHours(0, 0, 0, 0);

    const endDate = new Date(date);
    endDate.setHours(23, 59, 59, 999);

    const collections = await Payment.find({
      createdAt: { $gte: startDate, $lte: endDate },
      status: "completed",
    })
      .populate({
        path: "consumerId",
        select:
          "firstName lastName middleName nameExtension accountNo fullAddress",
      })
      .populate({
        path: "billId",
        select: "billNo amount dueDate",
      })
      .populate({
        path: "selectedFees.billId",
        select: "billNo amount dueDate",
      })
      .sort({ createdAt: -1 })
      .then((payments) =>
        payments.filter(
          (payment) =>
            payment.consumerId && typeof payment.consumerId === "object"
        )
      );

    const summary = {
      totalAmount: collections.reduce(
        (sum, payment) => sum + payment.amount,
        0
      ),
      totalReceived: collections.reduce(
        (sum, payment) => sum + payment.amountReceived,
        0
      ),
      totalChange: collections.reduce(
        (sum, payment) => sum + payment.change,
        0
      ),
      totalTransactions: collections.length,
      byPaymentMethod: collections.reduce((acc, payment) => {
        acc[payment.paymentMethod] =
          (acc[payment.paymentMethod] || 0) + payment.amount;
        return acc;
      }, {}),
      byPaymentType: collections.reduce((acc, payment) => {
        acc[payment.paymentType] =
          (acc[payment.paymentType] || 0) + payment.amount;
        return acc;
      }, {}),
    };

    res.json({ collections, summary });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Monthly Collections Report
router.get("/collections/monthly", async (req, res) => {
  try {
    const { month, year } = req.query;
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0, 23, 59, 59, 999);

    const collections = await Payment.find({
      createdAt: { $gte: startDate, $lte: endDate },
      status: "completed",
    })
      .populate({
        path: "consumerId",
        select:
          "firstName lastName middleName nameExtension accountNo fullAddress",
      })
      .populate({
        path: "billId",
        select: "billNo amount dueDate",
      })
      .populate({
        path: "selectedFees.billId",
        select: "billNo amount dueDate",
      })
      .sort({ createdAt: -1 })
      .then((payments) =>
        payments.filter(
          (payment) =>
            payment.consumerId && typeof payment.consumerId === "object"
        )
      );

    const dailySummary = collections.reduce((acc, payment) => {
      const date = payment.createdAt.toISOString().split("T")[0];
      if (!acc[date]) {
        acc[date] = {
          total: 0,
          transactions: 0,
          byPaymentType: {},
          byPaymentMethod: {},
        };
      }
      acc[date].total += payment.amount;
      acc[date].transactions += 1;
      acc[date].byPaymentType[payment.paymentType] =
        (acc[date].byPaymentType[payment.paymentType] || 0) + payment.amount;
      acc[date].byPaymentMethod[payment.paymentMethod] =
        (acc[date].byPaymentMethod[payment.paymentMethod] || 0) +
        payment.amount;
      return acc;
    }, {});

    const summary = {
      totalAmount: collections.reduce(
        (sum, payment) => sum + payment.amount,
        0
      ),
      totalReceived: collections.reduce(
        (sum, payment) => sum + payment.amountReceived,
        0
      ),
      totalChange: collections.reduce(
        (sum, payment) => sum + payment.change,
        0
      ),
      totalTransactions: collections.length,
      byPaymentMethod: collections.reduce((acc, payment) => {
        acc[payment.paymentMethod] =
          (acc[payment.paymentMethod] || 0) + payment.amount;
        return acc;
      }, {}),
      byPaymentType: collections.reduce((acc, payment) => {
        acc[payment.paymentType] =
          (acc[payment.paymentType] || 0) + payment.amount;
        return acc;
      }, {}),
      dailySummary,
    };

    res.json({ collections, summary });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Daily Expenses Report
router.get("/expenses/daily", async (req, res) => {
  try {
    const { date } = req.query;
    const startDate = new Date(date);
    startDate.setHours(0, 0, 0, 0);

    const endDate = new Date(date);
    endDate.setHours(23, 59, 59, 999);

    const expenses = await Expense.find({
      date: { $gte: startDate, $lte: endDate },
    }).sort({ date: -1 });

    const summary = {
      totalAmount: expenses.reduce((sum, expense) => sum + expense.amount, 0),
      byExpenseType: expenses.reduce((acc, expense) => {
        acc[expense.expenseType] =
          (acc[expense.expenseType] || 0) + expense.amount;
        return acc;
      }, {}),
      totalTransactions: expenses.length,
    };

    res.json({ expenses, summary });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Monthly Expenses Report
router.get("/expenses/monthly", async (req, res) => {
  try {
    const { month, year } = req.query;
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0, 23, 59, 59, 999);

    const expenses = await Expense.find({
      date: { $gte: startDate, $lte: endDate },
    }).sort({ date: -1 });

    const dailySummary = expenses.reduce((acc, expense) => {
      const date = expense.date.toISOString().split("T")[0];
      if (!acc[date]) {
        acc[date] = {
          total: 0,
          transactions: 0,
          byExpenseType: {},
        };
      }
      acc[date].total += expense.amount;
      acc[date].transactions += 1;
      acc[date].byExpenseType[expense.expenseType] =
        (acc[date].byExpenseType[expense.expenseType] || 0) + expense.amount;
      return acc;
    }, {});

    const summary = {
      totalAmount: expenses.reduce((sum, expense) => sum + expense.amount, 0),
      byExpenseType: expenses.reduce((acc, expense) => {
        acc[expense.expenseType] =
          (acc[expense.expenseType] || 0) + expense.amount;
        return acc;
      }, {}),
      totalTransactions: expenses.length,
      dailySummary,
    };

    res.json({ expenses, summary });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Annual Summary Report
router.get("/annual-summary", async (req, res) => {
  try {
    const { year } = req.query;
    const startDate = new Date(year, 0, 1);
    const endDate = new Date(year, 11, 31, 23, 59, 59, 999);

    const [collections, expenses] = await Promise.all([
      Payment.find({
        createdAt: { $gte: startDate, $lte: endDate },
        status: "completed",
      }),
      Expense.find({
        date: { $gte: startDate, $lte: endDate },
      }),
    ]);

    const monthlySummary = Array.from({ length: 12 }, (_, month) => {
      const monthCollections = collections.filter(
        (p) => p.createdAt.getMonth() === month
      );
      const monthExpenses = expenses.filter((e) => e.date.getMonth() === month);

      return {
        month: month + 1,
        collections: {
          total: monthCollections.reduce((sum, p) => sum + p.amount, 0),
          count: monthCollections.length,
          byPaymentType: monthCollections.reduce((acc, p) => {
            acc[p.paymentType] = (acc[p.paymentType] || 0) + p.amount;
            return acc;
          }, {}),
        },
        expenses: {
          total: monthExpenses.reduce((sum, e) => sum + e.amount, 0),
          count: monthExpenses.length,
          byExpenseType: monthExpenses.reduce((acc, e) => {
            acc[e.expenseType] = (acc[e.expenseType] || 0) + e.amount;
            return acc;
          }, {}),
        },
        netIncome:
          monthCollections.reduce((sum, p) => sum + p.amount, 0) -
          monthExpenses.reduce((sum, e) => sum + e.amount, 0),
      };
    });

    const summary = {
      year,
      totalCollections: collections.reduce((sum, p) => sum + p.amount, 0),
      totalExpenses: expenses.reduce((sum, e) => sum + e.amount, 0),
      netIncome:
        collections.reduce((sum, p) => sum + p.amount, 0) -
        expenses.reduce((sum, e) => sum + e.amount, 0),
      totalTransactions: {
        collections: collections.length,
        expenses: expenses.length,
      },
      monthlySummary,
    };

    res.json({ summary });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
