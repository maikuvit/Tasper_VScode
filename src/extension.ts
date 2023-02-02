// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import path = require('path');
import * as vscode from 'vscode';


// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	console.log('Tasper utility correctly installed!');

	let disposabledlv2 = vscode.commands.registerCommand('tasper-utility.exec_tasper_dlv2', (filePath : string) => {
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

	context.subscriptions.push(disposabledlv2);


	let disposableclingo = vscode.commands.registerCommand('tasper-utility.exec_tasper_clingo', (filePath : string) => {
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

		const task = new vscode.Task(
			{ type: "tasper" },
			vscode.TaskScope.Workspace,
			"execute",
			"tasper",
			new vscode.ShellExecution("npm exec tasper -- test ".concat( pathToPass , " --solver=clingo "), {
				cwd: __dirname,
			  })
		  );
	  
		  vscode.tasks.executeTask(task).then(() => {
			vscode.window.showInformationMessage(
				"Test executed with Clingo"
			);
		  });

	});
	context.subscriptions.push(disposableclingo);
}

// This method is called when your extension is deactivated
export function deactivate() {}
