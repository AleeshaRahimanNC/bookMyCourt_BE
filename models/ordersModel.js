const mongoose = require("mongoose");
const orderSchema = mongoose.Schema({
  courtId: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "courts",
  },
  slotIds: {
    type: Array,
    required: true,
  },
  totalCost: {
    type: Number,
    required: true,
  },
  status: {
    type: Number,
    default: 1,
    // 1 started,
    // 2 successfull,
    // 3 failed
    // 4 refund
  },
  createdOn: {
    type: Date,
    default: new Date(),
  },
  bookedBy: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "users",
  },
  slotDate: {
    type: Date,
  }
});

const orders = mongoose.model("orders", orderSchema);
module.exports = orders;
