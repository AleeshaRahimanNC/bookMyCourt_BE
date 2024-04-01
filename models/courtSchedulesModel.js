const mongoose = require("mongoose");
const courtSchedulesSchema = mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  slot: {
    type: Object,
    required: true,
  },
  cost: {
    type: Number,
    required: true,
  },
  bookedBy: {
    type: mongoose.Types.ObjectId,
    ref: "users",
  },
  cancellation: {
    type: Array,
  },
  courtId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  paymentOrders: {
    type: Array,
  },
});

const CourtSchedules = mongoose.model("courtSchedules", courtSchedulesSchema);
courtSchedulesSchema.index({date:1, 'slot.id':1, courtId:1}, {unique:true})
module.exports = CourtSchedules;
