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
