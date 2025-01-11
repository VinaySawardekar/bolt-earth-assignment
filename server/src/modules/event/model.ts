import mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define eventSchema
const eventSchema = new Schema(
  {
    name: { type: String, required: true },
    date: { type: Date, required: false },
    totalTickets: { type: Number, required: true },
    availableTickets: {
      type: Number,
      required: true,
    },
    ticketPrice: {
      type: Number,
      required: true,
    },
    description: { type: String, required: false },
    status: {
      type: String,
      unique: false,
      default: "active",
      enum: ["active", "inactive", "soldout"],
    },
    category: { type: String, required: false, default: "Comedy" },
    duration: { type: String, required: false, default: "1hr" },
    location: { type: String, required: false, default: "India" },
  },
  { timestamps: true },
);

const Event = mongoose.model("Event", eventSchema);
export default Event;
