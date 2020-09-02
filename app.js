
// Constructors
const Manager = require("./script/manager");
const Engineer = require("./script/engineer");
const Intern = require("./script/intern");

// NPM Modules
const inquirer = require("inquirer");
// Node Modules
const path = require("path");
const fs = require("fs");
// const {
//     addEmployee,
//     internPrompt,
//     managerPrompt,
//     engineerPrompt,
// } = require("./script/prompts");

// const OUTPUT_DIR = path.resolve(__dirname, "output");
// const outputPath = path.join(OUTPUT_DIR, "final.html");

// const render = require("./script/htmlRenderer");

// This array fills in with employee data.
const teamMembers = [];
// Manager will change-- can't be a const. 
let manager;
// This info is for the HTML.
let teamTitle;



function managerData() {
    inquirer.prompt([
        {
            type: "input",
            message: "What is the name of this team/project?",
            name: "teamTitle"
        },
        {
            type: "input",
            message: "Who is the manager of this project?",
            name: "managerName"
        },
        {
            type: "input",
            message: "What is the manager's ID?",
            name: "managerID"
        },
        {
            type: "input",
            message: "What is the manager's email?",
            name: "managerEmail"
        },
        {
            type: "input",
            message: "What is the manager's office number?",
            name: "officeNumber"
        }]).then(managerAnswers => {
            manager = new Manager(managerAnswers.managerName, managerAnswers.managerID, managerAnswers.managerEmail, managerAnswers.officeNum);
            teamTitle = managerAnswers.teamTitle;
            console.log("Now we will ask for employee information.")
            lesserEmployeeData();
        });
}

function lesserEmployeeData() {
    inquirer.prompt([
        {
            type: "list",
            message: "What is this employee's role?",
            name: "employeeRole",
            choices: ["Intern", "Engineer"]
        },

        {
            type: "input",
            message: "What is the employee's name?",
            name: "employeeName"
        },
        {
            type: "input",
            message: "What is the employee's id?",
            name: "employeeId"
        },
        {
            type: "input",
            message: "What is the employee's email?",
            name: "employeeEmail"
        },
        {
            type: "input",
            message: "What is the Engineer's Github?",
            name: "github",
            when: (userInput) => userInput.employeeRole === "Engineer"
        },
        {
            type: "input",
            message: "What's the Intern's school?",
            name: "school",
            when: (userInput) => userInput.employeeRole === "Intern"
        },
        {
            type: "confirm",
            name: "newEmployee",
            message: "Would you like to add another team member?"
        }
    ]).then(answers => {

        if (answers.employeeRole === "Intern") {
            const employee = new Intern(answers.employeeName, answers.employeeId, answers.employeeEmail, answers.school);
            teamMembers.push(employee);
        } else if (answers.employeeRole === "Engineer") {

            teamMembers.push(new Engineer(answers.employeeName, answers.employeeId, answers.employeeEmail, answers.github));
        }
        if (answers.newEmployee === true) {
            lesserEmployeeData();
        } else { return (lesserEmployeeData()); }


        var main = fs.readFileSync('./html/main.html', 'utf8');

        main = main.replace(/{{teamTitle}}/g, teamTitle);


        var managerCard = fs.readFileSync('./html/Manager.html', 'utf8');
        managerCard = managerCard.replace('{{name}}', manager.getName());
        managerCard = managerCard.replace('{{role}}', manager.getRole());
        managerCard = managerCard.replace('{{id}}', manager.getId());
        managerCard = managerCard.replace('{{email}}', manager.getEmail());
        managerCard = managerCard.replace('{{officeNumber}}', manager.getOfficeNum());



        var cards = managerCard;
        for (var i = 0; i < teamMembers.length; i++) {
            var employee = teamMembers[i];

            cards += renderEmployee(employee);
        }


        main = main.replace('{{cards}}', cards);

        fs.writeFileSync('./output/final.html', main);


        console.log("The final.html has been generated in output");

    });
}



function renderEmployee(employee) {
    if (employee.getRole() === "Intern") {
        var internCard = fs.readFileSync('./html/Intern.html', 'utf8');
        internCard = internCard.replace('{{name}}', employee.getName());
        internCard = internCard.replace('{{role}}', employee.getRole());
        internCard = internCard.replace('{{id}}', employee.getId());
        internCard = internCard.replace('{{email}}', employee.getEmail());
        internCard = internCard.replace('{{school}}', employee.getSchool());
        return internCard;
    } else if (employee.getRole() === "Engineer") {
        var engineerCard = fs.readFileSync('./html/Engineer.html', 'utf8');
        engineerCard = engineerCard.replace('{{name}}', employee.getName());
        engineerCard = engineerCard.replace('{{role}}', employee.getRole());
        engineerCard = engineerCard.replace('{{id}}', employee.getId());
        engineerCard = engineerCard.replace('{{email}}', employee.getEmail());
        engineerCard = engineerCard.replace('{{github}}', employee.getGithub());
        return engineerCard;
    }
}

managerData();



