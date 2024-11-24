const vscode = require('vscode');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	context.subscriptions.push(
		vscode.commands.registerCommand('server-console-log.isClient', function() {
			try {
				// Get the active text editor
				const editor = vscode.window.activeTextEditor;
				if (!editor) {
					console.log('No active text editor');
					return;
				}
	
				const document = editor.document;
				const text = document.getText();
				const edit = new vscode.WorkspaceEdit();
	
				// Case 1: Has console.log but no 'use client' - Add it
				if (text.includes('console.log') && !text.includes('use client')) {
					edit.insert(document.uri, new vscode.Position(0, 0), '"use client" // added by Server Console Log\n\n');
					vscode.workspace.applyEdit(edit).then(success => {
						if (success) {
							console.log('Successfully added "use client" directive');
						} else {
							console.log('Failed to add "use client" directive');
						}
					});
				}
				// Case 2: No console.log but has 'use client' - Remove it
				else if (!text.includes('console.log') && text.includes('"use client" // added by Server Console Log')) {
					// Find the range of 'use client' and any following whitespace
					const lines = text.split('\n');
					let lineIndex = 0;
					let deleteRange;
	
					for (let i = 0; i < lines.length; i++) {
						if (lines[i].includes('use client')) {
							lineIndex = i;
							// Calculate how many empty lines follow
							let emptyLinesAfter = 0;
							while (i + 1 < lines.length && lines[i + 1].trim() === '') {
								emptyLinesAfter++;
								i++;
							}
							// Create range from start of 'use client' line to end of last empty line
							deleteRange = new vscode.Range(
								new vscode.Position(lineIndex, 0),
								new vscode.Position(lineIndex + emptyLinesAfter + 1, 0)
							);
							break;
						}
					}
	
					if (deleteRange) {
						edit.delete(document.uri, deleteRange);
						vscode.workspace.applyEdit(edit).then(success => {
							if (success) {
								console.log('Successfully removed "use client" directive');
							} else {
								console.log('Failed to remove "use client" directive');
							}
						});
					}
				}
			} catch (error) {
				console.error('Error in server-console-log.isClient command:', error);
			}
		})
	);
	
	// Add a save event listener that executes the command
	context.subscriptions.push(
		vscode.workspace.onDidSaveTextDocument(() => {
			vscode.commands.executeCommand('server-console-log.isClient');
		})
	);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
