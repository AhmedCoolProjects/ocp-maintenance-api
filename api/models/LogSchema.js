import mongoose from "mongoose";

const LogSchema = new mongoose.Schema(
  {
    taskId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "operations",
    },
    message: {
      type: String,
    },
    date: {
      type: Date,
    },
    status: {
      type: String,
      enum: ["BAD", "GOOD", "PERFECT"],
    },
  },
  {
    timestamps: true,
  }
);

const Log = mongoose.model("logs", LogSchema);

export default Log;
