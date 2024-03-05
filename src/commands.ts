
/* IMPORT */

import vscode from 'vscode';
import {castArray, getPackagesFromEditor, getPackagesFromProject, getPackagesFromPrompt} from './utils';

/* MAIN */

const open = async ( names?: string | string[] ): Promise<void> => {

  names ||= getPackagesFromEditor () || await getPackagesFromPrompt ( getPackagesFromProject () );

  if ( !names?.length ) return;

  for ( const name of castArray ( names ) ) {

    const url = `https://www.npmjs.com/package/${name}`;

    vscode.env.openExternal ( vscode.Uri.parse ( url ) );

  }

};

/* EXPORT */

export {open};
