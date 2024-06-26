const ORDERS = require("../models/ordersModel");
const COURT_SCHEDULES_MODEL = require("../models/courtSchedulesModel");
const Razorpay = require("razorpay");
const crypto=require('crypto');

const orders = async (req, res) => {
  try {
    const slotData = await COURT_SCHEDULES_MODEL.find({
      _id: { $in: req.body.slotIds },
    });
    let totalCost = null;
    for (let slot of slotData) {
      if (slotData.bookedBy) {
        res.status(400).json({ message: "slot has already occupied" });
        return;
      } else {
        totalCost += slot.cost;
      }
    }
    const instance = new Razorpay({
      key_id: process.env.RP_KEY_ID,
      key_secret: process.env.RP_SECRET_KEY,
    });

    const newOrder = await ORDERS({
      courtId: req.body.courtId,
      slotIds: req.body.slotIds,
      totalCost: totalCost,
      bookedBy: req.userId,
    }).save();

    const options = {
      amount: totalCost * 100,
      currency: "INR",
      receipt: newOrder._id,
    };

    const order = await instance.orders.create(options);

    if (!order) return res.status(500).send("Some error occured");

    res.status(200).json(order);
  } catch (error) {
    console.log(error);
  }
};

const verify = async (req, res) => {
  try {
    // getting the details back from our font-end
    const {
        orderCreationId,
        razorpayPaymentId,
        razorpayOrderId,
        razorpaySignature,
        slotIds,
        courtId,
        receipt,
        date
    } = req.body;

    // Creating our own digest
    // The format should be like this:
    // digest = hmac_sha256(orderCreationId + "|" + razorpayPaymentId, secret);
    const shasum = crypto.createHmac("sha256", process.env.RP_SECRET_KEY,);

    shasum.update(`${orderCreationId}|${razorpayPaymentId}`);

    const digest = shasum.digest("hex");

    // comaparing our digest with the actual signature
    if (digest !== razorpaySignature)
        return res.status(400).json({ msg: "Transaction not legit!" });


      await COURT_SCHEDULES_MODEL.updateMany({_id:{$in:slotIds}},{$set:{bookedBy:req.userId,orderId:receipt}})
      await ORDERS.updateOne({_id:receipt},{$set:{status:2,bookedBy:req.userId,courtId:courtId,date:new Date(date)}})
    // THE PAYMENT IS LEGIT & VERIFIED
    // YOU CAN SAVE THE DETAILS IN YOUR DATABASE IF YOU WANT

    res.json({
        msg: "Booking Completed Successfully",
        orderId: razorpayOrderId,
        paymentId: razorpayPaymentId,
    });
} catch (error) {
  console.log(error);
    res.status(500).send(error);
}
};

module.exports = { orders, verify };
