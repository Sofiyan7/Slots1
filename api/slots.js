const connectDB = require("./_db");
const Slot = require("./_slotModel");

const DEFAULT_SLOTS = ["08:00", "08:15", "08:30", "08:45"];

module.exports = async (req, res) => {
  await connectDB();

  // Initialize slots if empty
  const count = await Slot.countDocuments();
  if (count === 0) {
    await Slot.insertMany(DEFAULT_SLOTS.map((time) => ({ time, name: null })));
  }

  const slots = await Slot.find().sort({ time: 1 });
  res.status(200).json(slots);
};
