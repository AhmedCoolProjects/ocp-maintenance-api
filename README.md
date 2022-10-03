# OCP Maintenance API (Express.js)

## GET

- `/api/v1/operations` - returns all operations
- `/api/v1/operations/:day` - returns operations for a specific day
- `/api/v1/operations/done` - returns all done operations
- `/api/v1/operations/waiting` - returns all waiting operations

## POST

- `/api/v1/operations/finish/:id` - finish operation
- `/api/v1/operations/finish-waiting/:id` - finish waiting operation
- `/api/v1/operations/startdate` - set start date

## Description

You ll have a list of tasks: **Daily**, **Fortnightly**, **Monthly**, **HalfYearly**, **Yearly**, **BiYearly**.

And you ll have a suggestion for tasks to do **today**. How it's calculated?

- Daily: every day
- Fortnightly: int(1/14)+1 of the rest fortnightly tasks (waiting)
- Monthly: int(1/30)+1 of the rest monthly tasks (waiting)
- HalfYearly: int(1/182)+1 of the rest halfyearly tasks (waiting)
- Yearly: int(1/365)+1 of the rest yearly tasks (waiting)
- BiYearly: int(1/730)+1 of the rest biyearly tasks (waiting)
