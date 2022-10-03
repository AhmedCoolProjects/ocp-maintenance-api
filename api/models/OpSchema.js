import mongoose from "mongoose";

const outOfDateSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
});

const OpSchema = new mongoose.Schema(
  {
    Lign: {
      type: String,
    },
    ActivityCode: {
      type: String,
    },
    Asset: {
      type: String,
    },
    Plan: {
      type: String,
    },
    "Lign Status": {
      type: String,
    },
    Description: {
      type: String,
    },
    Frq: {
      type: Number,
    },
    EmployesNbr: {
      type: Number,
    },
    TimeNeeded: {
      type: Number,
    },
    Status: {
      type: String,
      enum: [
        "WAITING",
        "REQUIRED",
        "IN_PROGRESS",
        "DONE",
        "CANCELLED",
        "LATENESS",
        "SO LATE",
      ],
      default: "WAITING",
    },
    OutOfDate: {
      type: [outOfDateSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const Operation = mongoose.model("operations", OpSchema);

export default Operation;
