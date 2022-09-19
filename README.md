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
