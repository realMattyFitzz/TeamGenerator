const inquirer = require("inquirer")


// TODO: Write code to define and export the Employee class
class Employee {
    constructor(id, name, email) {
        this.id = id;
        this.name = name;
        this.email = email;
    }

    getName() {
        return(this.name);
    }

    getId(){
        return(this.id);
    }

    getEmail(){
        return(this.email);
    }

    getRole(){
        return('Employee');
    }

        printInfo() {
            console.log(`This employee is ${this.name}`);
            console.log(`This employee has an id of ${this.id}`);
            console.log(`This employee has an email of ${this.email}`);
        }
  }
module.exports = Employee;