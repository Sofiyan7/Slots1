const connectDB = require("./_db");
const Slot = require("./_slotModel");

const DEFAULT_SLOTS = ["08:00", "08:15", "08:30", "08:45"];

module.exports = async (req, res) => {
  // Allow only GET requests
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  try {
    await connectDB();

    // Initialize slots if collection is empty
    const count = await Slot.countDocuments();

    if (count === 0) {
      await Slot.insertMany(
        DEFAULT_SLOTS.map((time) => ({ time, name: null })),
        { ordered: false } // prevents duplicate key errors
      );
    }

    const slots = await Slot.find().sort({ time: 1 });
    res.status(200).json(slots);
  } catch (err) {
    console.error("Slots API error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
