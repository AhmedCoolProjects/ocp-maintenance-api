import Operation from "../models/OpSchema.js";
import Log from "../models/LogSchema.js";

const FrqOperations = {
  daily: 1,
  twoWeeks: 15,
  monthly: 30,
  halfYearly: 182,
  yearly: 365,
  twoYears: 730,
};
const StatusLog = {
  bad: "BAD",
  good: "GOOD",
  perfect: "PERFECT",
};
const StatusOperations = {
  waiting: "WAITING",
  required: "REQUIRED",
  inProgress: "IN PROGRESS",
  done: "DONE",
  cancelled: "CANCELLED",
  lateness: "LATENESS",
  soLate: "SO LATE",
};

// checkDailyTasks
export const checkDailyTasks = async () => {
  try {
    // get waiting tasks
    const waitingTasks = await Operation.find({
      Frq: FrqOperations.daily,
      Status: StatusOperations.waiting,
    });
    // set status to required
    waitingTasks.forEach(async (task) => {
      await task.findByIdAndUpdate(
        task._id,
        { Status: StatusOperations.required },
        { new: true }
      );
    });
    if (waitingTasks.length > 0) {
      console.log("waitingTasks.length > 0");
      return;
    }
    // get required tasks
    const requiredTasks = await Operation.find({
      Status: StatusOperations.required,
      Frq: FrqOperations.daily,
    });
    // add to OutOfDate now date
    requiredTasks.forEach((task) => {
      task.OutOfDate.push({ date: new Date() });
      task.save();
    });
    // add a Log
    requiredTasks.forEach((task) => {
      const log = new Log({
        tokenId: task._id,
        status: StatusLog.bad,
        date: new Date(),
        message: "Task was required, But not done in time !",
      });
      log.save();
    });
    // get done tasks
    const doneTasks = await Operation.find({
      Status: StatusOperations.done,
      Frq: FrqOperations.daily,
    });
    // change status to required
    doneTasks.forEach(async (task) => {
      await Operation.findByIdAndUpdate(
        task._id,
        {
          Status: StatusOperations.required,
        },
        { new: true }
      );
    });
  } catch (er) {
    return er;
  }
};

// checkTwoWeeksTasksBefore
export const checkTwoWeeksTasksBefore = async () => {
  try {
    // get waiting tasks
    const waitingTasks = await Operation.find({
      Frq: FrqOperations.twoWeeks,
      Status: StatusOperations.waiting,
    });
    // set status to required
    waitingTasks.forEach(async (task) => {
      await task.findByIdAndUpdate(
        task._id,
        { Status: StatusOperations.required },
        { new: true }
      );
    });
  } catch (er) {
    return er;
  }
};

// checkTwoWeeksTasksFinal
export const checkTwoWeeksTasksFinal = async () => {
  try {
    // get done tasks
    const doneTasks = await Operation.find({
      Status: StatusOperations.done,
      Frq: FrqOperations.twoWeeks,
    });
    // change status to waiting
    doneTasks.forEach(async (task) => {
      await Operation.findByIdAndUpdate(
        task._id,
        {
          Status: StatusOperations.waiting,
        },
        { new: true }
      );
    });
    // get required tasks
    const requiredTasks = await Operation.find({
      Status: StatusOperations.required,
      Frq: FrqOperations.twoWeeks,
    });
    // add to OutOfDate now date
    requiredTasks.forEach((task) => {
      task.OutOfDate.push({ date: new Date() });
      task.save();
    });
    // add a Log
    requiredTasks.forEach((task) => {
      const log = new Log({
        tokenId: task._id,
        status: StatusLog.bad,
        date: new Date(),
        message: "Task was required, But not done in time !",
      });
      log.save();
    });
    // reset required to waiting
    requiredTasks.forEach(async (task) => {
      await Operation.findByIdAndUpdate(
        task._id,
        {
          Status: StatusOperations.waiting,
        },
        { new: true }
      );
    });
  } catch (er) {
    return er;
  }
};

// checkMonthlyTasksBefore
export const checkMonthlyTasksBefore = async () => {
  try {
    // get waiting tasks
    const waitingTasks = await Operation.find({
      Frq: FrqOperations.monthly,
      Status: StatusOperations.waiting,
    });
    // set status to required
    waitingTasks.forEach(async (task) => {
      await task.findByIdAndUpdate(
        task._id,
        { Status: StatusOperations.required },
        { new: true }
      );
    });
  } catch (er) {
    return er;
  }
};

// checkMonthlyTasksFinal
export const checkMonthlyTasksFinal = async () => {
  try {
    // get done tasks
    const doneTasks = await Operation.find({
      Status: StatusOperations.done,
      Frq: FrqOperations.monthly,
    });
    // change status to waiting
    doneTasks.forEach(async (task) => {
      await Operation.findByIdAndUpdate(
        task._id,
        {
          Status: StatusOperations.waiting,
        },
        { new: true }
      );
    });
    // get required tasks
    const requiredTasks = await Operation.find({
      Status: StatusOperations.required,
      Frq: FrqOperations.monthly,
    });
    // add to OutOfDate now date
    requiredTasks.forEach((task) => {
      task.OutOfDate.push({ date: new Date() });
      task.save();
    });
    // add a Log
    requiredTasks.forEach((task) => {
      const log = new Log({
        tokenId: task._id,
        status: StatusLog.bad,
        date: new Date(),
        message: "Task was required, But not done in time !",
      });
      log.save();
    });
    // reset required to waiting
    requiredTasks.forEach(async (task) => {
      await Operation.findByIdAndUpdate(
        task._id,
        {
          Status: StatusOperations.waiting,
        },
        { new: true }
      );
    });
  } catch (er) {
    return er;
  }
};
