import mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define ticketSchema
const ticketSchema = new Schema(
  {
    eventId: { type: Schema.Types.ObjectId, ref: "Event", required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    ticketsPurchased: { type: Number, required: true },
    totalAmount: {
      type: Number,
      required: true,
    },
    purchasedAt: { type: Date, required: true },
  },
  { timestamps: true },
);

const Ticket = mongoose.model("Ticket", ticketSchema);
export default Ticket;
