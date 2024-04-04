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
  courtId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  orderId: {
    type: mongoose.Types.ObjectId,
    ref: "orders",
  }
});

const CourtSchedules = mongoose.model("courtSchedules", courtSchedulesSchema);
courtSchedulesSchema.index({date:1, 'slot.id':1, courtId:1}, {unique:true})
module.exports = CourtSchedules;
