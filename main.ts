#! /usr/bin/env node
import inquirer from 'inquirer';

let todos: string[] = [];

async function addTask() {
    let option = await inquirer.prompt([
        { name: 'addTask', message: 'Add Task', type: 'input' },
        { name: 'addMore', message: 'Add More Task?', type: 'confirm', default: 'true' }
    ]);
    todos.push(option.addTask);
    console.log(todos);
    return option.addMore;
}

async function removeTask() {
    let option = await inquirer.prompt([
        { name: 'removeTask', message: 'Remove Task', type: 'input' },
        { name: 'removeMore', message: 'Remove More Task?', type: 'confirm', default: 'true' }
    ]);
    todos = todos.filter(task => task !== option.removeTask);
    console.log(todos);
    return option.removeMore;
}

async function main() {
    let condition = true;
    while (condition) {
        let user = await inquirer.prompt({ name: 'options', message: 'What would you like to do?', type: 'list', choices: ['Add Task', 'Remove Task', 'Show Task', 'Exit'] });
        switch (user.options) {
            case 'Add Task':
                condition = await addTask();
                break;
            case 'Remove Task':
                condition = await removeTask();
                break;
            case 'Show Task':
                console.log(todos);
                break;
            case 'Exit':
                condition = false;
                break;
            default:
                console.log("Select from given options");
        }
    }
}

main();