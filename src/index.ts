
/* IMPORT */

import vscode from 'vscode';
import * as Commands from './commands';

/* MAIN */

const activate = (): void => {

  vscode.commands.registerCommand ( 'openInNPM.open', Commands.open );

};

/* EXPORT */

export {activate};
