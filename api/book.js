const connectDB = require("./_db");
const Slot = require("./_slotModel");

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const { time, name } = req.body;

  if (!time || !name) {
    return res.status(400).json({ message: "Invalid request" });
  }

  await connectDB();

  const slot = await Slot.findOneAndUpdate(
    { time, name: null },
    { name: name.trim() },
    { new: true }
  );

  if (!slot) {
    return res.status(409).json({ message: "Slot already booked" });
  }

  res.status(200).json({ message: "Slot booked successfully" });
};
