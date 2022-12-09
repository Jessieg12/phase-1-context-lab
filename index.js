/* Your Code Here */

const createEmployeeRecord = (empArray) => {
 let empObj = {
    firstName: empArray[0],
    familyName: empArray[1],
    title: empArray[2],
    payPerHour: empArray[3],
    timeInEvents: [],
    timeOutEvents: []
 }
 return empObj
}

const createEmployeeRecords = (empObj) => {
    return empObj.map(array => createEmployeeRecord(array))
}

function createTimeInEvent(dateStamp){
    let dateStampSplit = dateStamp.split(' ')
    let date = dateStampSplit[0]
    let time = dateStampSplit[1]
    const TimeIn = {
        type: 'TimeIn',
        hour: parseInt(time),
        date: date
    }
    this.timeInEvents.push(TimeIn)
    return this
}

function createTimeOutEvent(dateStamp){
    let dateStampSplit = dateStamp.split(' ')
    let date = dateStampSplit[0]
    let time = dateStampSplit[1]
    const TimeOut = {
        type: 'TimeOut',
        hour: parseInt(time),
        date: date
    }
    this.timeOutEvents.push(TimeOut)
    return this
}

// const createTimeInEvent = (dateStamp) => {
//     let [YMD, time] = dateStamp.split(' ')
//     // let YMD = split[0]
//     // let time = split[1]
//     let obj = {
//         type: "TimeIn",
//         hour: parseInt(time, 10),
//         YMD
//     }
//     this.timeInEvents.push(obj)
//     return this
// }

function hoursWorkedOnDate(dateStamp){
    let timeInEvent = this.timeInEvents.find((e) => {
        return e.date === dateStamp
    })
    let timeOutEvent = this.timeOutEvents.find((e)=> {
        return e.date === dateStamp
    })
    let workedHoursOnDate = (timeOutEvent.hour - timeInEvent.hour) /100
    return workedHoursOnDate
}

function wagesEarnedOnDate(dateStamp){
    return hoursWorkedOnDate.call(this, dateStamp) *this.payPerHour
}

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

function findEmployeeByFirstName(collection, firstNameString){
    let emp = collection.find((e) =>{
        return e.firstName === firstNameString
    })
    return emp
}

function calculatePayroll(empArray){
    return empArray.reduce(function(e, allWages){
        return e + allWagesFor.call(allWages)
    }, 0)
}