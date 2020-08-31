const Employee = require("./Employee")


class Manager extends Employee {
    constructor(officeNum) {
        this.officeNum = officeNum;
    }

    getOfficeNum() {
        return (this.officeNum);
    }

        printInfo() {
            console.log(`${Employee.name} is in office # ${this.officeNum}`);
        }
  }
module.exports = Manager;