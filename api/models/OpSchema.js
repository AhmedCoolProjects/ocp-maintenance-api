import mongoose from "mongoose";

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
      type: String,
    },
    EmployesNbr: {
      type: Number,
    },
    TimeNeeded: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const Operation = mongoose.model("operations", OpSchema);

export default Operation;
