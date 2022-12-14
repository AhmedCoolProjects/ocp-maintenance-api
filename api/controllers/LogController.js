import Log from "../models/LogSchema.js";

// GET ALL
export const getLogs = async (req, res) => {
  try {
    const logs = await Log.find();
    res.status(200).json(logs);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Get How Many Logs with the same date day
export const getLogsByDate = async (req, res) => {
  try {
    const listLogsDays = await Log.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: "%d", date: "$date" } },
          count: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json(listLogsDays);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// ADD LOG
export const addLog = async (req, res) => {
  const { taskId, message, date, status } = req.body;
  const newLog = new Log({ taskId, message, date, status });
  try {
    await newLog.save();
    res.status(201).json(newLog);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
