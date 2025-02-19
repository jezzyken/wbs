const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const expenseSchema = new Schema({
  date: {
    type: Date,
  },
  amount: {
    type: Number,
  },
  expenseType: {
    type: String,
  },
  description: {
    type: String,
  },
  isArchived: {
    type: Boolean,
    default: false,
  },
  archivedBy: {
    type: String,
    ref: "User",
    default: "67ac4a5736ca228e4e71f829",
  },
});

module.exports = mongoose.model("Expense", expenseSchema);
