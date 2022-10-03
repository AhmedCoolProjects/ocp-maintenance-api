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

// GET Operation by Frq
export const getOperationsByFrq = async (req, res) => {
  try {
    const { frq } = req.params;
    const operations = await Operation.find({ Frq: frq });
    res.status(200).json(operations);
  } catch (er) {
    res.status(404).json({ message: er.messages });
  }
};

// GET Operation by status
export const getOperationsByStatus = async (req, res) => {
  try {
    const { status } = req.params;
    const operations = await Operation.find({ Status: status });
    res.status(200).json(operations);
  } catch (er) {
    res.status(404).json({ message: er.messages });
  }
};

// UPDATE OPERATION STATUS
export const updateOperationStatus = async (req, res) => {
  const { status, taskId } = req.body;
  try {
    const updatedOperation = await Operation.findByIdAndUpdate(
      taskId,
      { Status: status },
      { new: true }
    );
    res.status(200).json(updatedOperation);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
