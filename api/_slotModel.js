const mongoose = require("mongoose");

const slotSchema = new mongoose.Schema({
  time: { type: String, unique: true },
  name: { type: String, default: null },
});

module.exports = mongoose.models.Slot || mongoose.model("Slot", slotSchema);
