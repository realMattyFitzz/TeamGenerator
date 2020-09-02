const inquirer = require("inquirer");

function managerPrompt() {
    inquirer.prompt([
        {
            message: "What is your managers name?",
            name: "name",
        },
        {
            message: "What is your managers id?",
            name: "id",
        },
        {
            message: "What is your managers office number?",
            name: "officeNum",
        },
        {
            message: "What is your managers name?",
            name: "name",
        },
        {
            message: "What is your managers email?",
            name: "email",
        },

    ]).then(function (manager) {
        console.log(manager);
        addEmployee();

    })
};


function engineerPrompt() {
    inquirer.prompt([
        {
            message: "What is your engineers name?",
            name: "name",
        },
        {
            message: "What is your engineers id?",
            name: "id",
        },
        {
            message: "What is your engineers GitHub?",
            name: "github",
        },
        {
            message: "What is your managers name?",
            name: "name",
        },
        {
            message: "What is your managers email?",
            name: "email",
        },

    ]).then(function (engineer) {
        console.log(engineer);
        addEmployee();
    });
}


function addEmployee() {
    inquirer
        .prompt([
            {
                type: "list",
                message: "Who would you like to add to the team?",
                name: "engineerOrIntern",
                choices: ["Engineer", "Intern", "Quit"],
            }
        ]).then(function (manager) {
            console.log(manager);
            inquirer
                .prompt([
                    {
                        type: "list",
                        message: "Who would you like to add to the team?",
                        name: "engineerOrIntern",
                        choices: ["Engineer", "Intern", "Quit"],
                    },
                ])
                .then(function ({ engineerOrIntern }) {
                    if (engineerOrIntern === "Engineer") {
                        engineerPrompt();
                    } else if (engineerOrIntern === "Intern") {

                    } else {

                    }
                });
        })
};

module.exports = {
    addEmployee,
    managerPrompt,
    engineerPrompt,
}