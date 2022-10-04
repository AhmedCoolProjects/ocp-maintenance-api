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

// GET Operation by _id
export const getOperationsById = async (req, res) => {
  try {
    const { id } = req.params;
    const operations = await Operation.findById(id);
    res.status(200).json(operations);
  } catch (er) {
    res.status(404).json({ message: er.messages });
  }
};

// GET Suggestion Tasks
export const getSuggestionTasks = async (req, res) => {
  try {
    // get current day
    var today = new Date();
    var day = today.getDate();
    // get twoweeks suggestion tasks
    const twoWeeksOperations = await Operation.find({
      Frq: 15,
      Status: "WAITING",
    });
    // get day/15 * twoWeeksOperations.length suggestion tasks
    const suggestionTwoWeeksTasks = twoWeeksOperations.slice(
      0,
      Math.floor((day * twoWeeksOperations.length) / 15)
    );
    // get monthly suggestion tasks
    const monthlyOperations = await Operation.find({
      Frq: 30,
      Status: "WAITING",
    });
    // get day/30 * monthlyOperations.length suggestion tasks
    const suggestionMonthlyTasks = monthlyOperations.slice(
      0,
      Math.floor((day * monthlyOperations.length) / 30)
    );
    // combine twoWeeks and monthly suggestion tasks
    const suggestionTasks = suggestionTwoWeeksTasks.concat(
      suggestionMonthlyTasks
    );
    res.status(200).json(suggestionTasks);
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
