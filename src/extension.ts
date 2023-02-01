// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import path = require('path');
import * as vscode from 'vscode';


// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "tasper-utility" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('tasper-utility.exec_tasper', (filePath : string) => {
		let pathToPass : string;

		if(filePath){
			pathToPass = filePath.toString()
		}

		else{
			if(vscode.workspace.workspaceFolders)
				{
					pathToPass = vscode.workspace.workspaceFolders[0].uri.toString()
				}
			else {
				return}
		}
					
		pathToPass = path.resolve( pathToPass.replace("file:/",""));

		console.log(pathToPass)
		const task = new vscode.Task(
			{ type: "tasper" },
			vscode.TaskScope.Workspace,
			"execute",
			"tasper",
			new vscode.ShellExecution("npm exec tasper -- test ".concat( pathToPass , " --solver=dlv2 "), {
				cwd: __dirname,
			  })
		  );
	  
		  vscode.tasks.executeTask(task).then(() => {
			vscode.window.showInformationMessage(
				"Test executed with DLV2"
			);
		  });

	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
