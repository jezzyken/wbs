const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Payment = require("../models/Payment");
const Consumer = require("../models/Consumer");
const Bill = require("../models/Bill");
const PaymentHistory = require("../models/PaymentHistory");

router.get("/", async (req, res) => {
  try {
    const payments = await Payment.find()
      .populate("consumerId", "firstName lastName consumerId")
      .populate("billId")
      .populate("processedBy", "username firstName lastName")
      .sort({ createdAt: -1 });
    res.json(payments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id)
      .populate("consumerId", "firstName lastName consumerId")
      .populate("billId")
      .populate("processedBy", "username firstName lastName");
    if (!payment) return res.status(404).json({ message: "Payment not found" });
    res.json(payment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const {
      consumerData,
      amount,
      amountReceived,
      change,
      paymentType,
      selectedFees,
      status,
      notes,
      paymentMethod,
      consumerId,
    } = req.body;

    let paymentConsumerId = consumerId;
    let paymentResult;

    if (paymentType === "MEMBERSHIP_FEE") {
      const newConsumer = new Consumer({
        accountNo: consumerData.accountNo,
        firstName: consumerData.firstName,
        lastName: consumerData.lastName,
        middleName: consumerData.middleName || undefined,
        nameExtension: consumerData.nameExtension || undefined,
        fullAddress: consumerData.fullAddress || undefined,
        purok: consumerData.purok || undefined,
        contactNumber: consumerData.contactNumber || undefined,
        email: consumerData.email || undefined,
        status: "active",
        isArchived: false,
      });

      const savedConsumer = await newConsumer.save({ session });
      paymentConsumerId = savedConsumer._id;
      paymentResult = { consumer: savedConsumer };
    } else if (paymentType === "BILL_PAYMENT") {
      const billUpdates = [];

      for (const fee of selectedFees) {
        if (fee.name === "Current Bill" && fee.billId) {
          billUpdates.push({
            billId: fee.billId,
            amount: fee.amount,
          });
        } else if (fee.name === "Unpaid Balance" && fee.billIds) {
          fee.billIds.forEach((billId) => {
            billUpdates.push({
              billId,
              amount: fee.amount / fee.billIds.length,
            });
          });
        }
      }

      for (const update of billUpdates) {
        await Bill.findByIdAndUpdate(
          update.billId,
          {
            $set: {
              status: "paid",
              paidAmount: update.amount,
              paymentDate: new Date(),
            },
          },
          { session }
        );
      }

      if (selectedFees.some((fee) => fee.name === "Reconnection Fee")) {
        await Consumer.findByIdAndUpdate(
          consumerId,
          {
            $set: {
              status: "active",
              lastPaymentDate: new Date(),
            },
          },
          { session }
        );
      }
    }

    const paymentData = {
      consumerId: paymentConsumerId,
      amount,
      amountReceived,
      change,
      paymentType,
      selectedFees,
      status,
      notes,
      paymentMethod,
    };

    const payment = new Payment(paymentData);
    await payment.save({ session });

    const paymentHistoryData = {
      consumerId: paymentConsumerId,
      paymentId: payment._id,
      actionType: "payment_received",
      amount: payment.amount,
      description:
        paymentType === "MEMBERSHIP_FEE"
          ? `Initial membership payment received via ${paymentMethod}`
          : `Payment received via ${paymentMethod} for ${selectedFees
              .map((fee) => fee.name)
              .join(", ")}`,
    };

    await PaymentHistory.create([paymentHistoryData], { session });

    await session.commitTransaction();

    paymentResult = {
      ...paymentResult,
      payment,
      paymentHistory: paymentHistoryData,
    };

    res.status(201).json(paymentResult);
  } catch (error) {
    await session.abortTransaction();

    if (error.code === 11000) {
      return res.status(400).json({
        error:
          "Account number already exists. Please use a different account number.",
      });
    }

    console.error("Payment processing error:", error);
    res.status(400).json({ error: error.message });
  } finally {
    session.endSession();
  }
});

router.put("/:id", async (req, res) => {
  try {
    const payment = await Payment.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!payment) return res.status(404).json({ message: "Payment not found" });
    res.json(payment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
