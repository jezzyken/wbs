const express = require("express");
const router = express.Router();
const Consumer = require("../models/Consumer");

router.get("/", async (req, res) => {
  try {
    const results = await Consumer.find().sort({ createdAt: -1 }).lean();

    const consumers = results.map(item => ({
      ...item, fullName: `${item.firstName} ${item.lastName}`
    }))
    console.log(consumers)
    res.json(consumers);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const consumer = await Consumer.findById(req.params.id);
    if (!consumer)
      return res.status(404).json({ message: "Consumer not found" });
    res.json(consumer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const consumer = new Consumer(req.body);
    consumer._user = "67aa10cc67f0bfdc2b8de9ea";
    await consumer.save();
    res.status(201).json(consumer);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const consumer = await Consumer.findOne({ _id: req.params.id });
    if (!consumer)
      return res.status(404).json({ message: "Consumer not found" });

    consumer._user = "67aa10cc67f0bfdc2b8de9ea";
    Object.assign(consumer, req.body);
    await consumer.save();
    res.json(consumer);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const before = await Consumer.findById(req.params.id);
    const result = await Consumer.findByIdAndUpdate(
      req.params.id,
      {
        isArchived: !before.isArchived,
        archivedAt: !before.isArchived ? new Date() : null,
      },
      { new: true }
    );

    if (!result) {
      return res.status(404).json({ message: "Consumer not found" });
    }

    res.json({
      message: `Consumer ${
        result.isArchived ? "archived" : "unarchived"
      } successfully`,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
