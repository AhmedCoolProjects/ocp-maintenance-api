import Operation from "../models/OpSchema.js";

// GET ALL
export const getOperations = async (req, res) => {
  try {
    const operations = await Operation.find();
    res.status(200).json(operations);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
