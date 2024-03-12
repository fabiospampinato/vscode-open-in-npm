
/* IMPORT */

import {openInExternal} from 'vscode-extras';
import {castArray, getPackagesFromEditor, getPackagesFromProject, getPackagesFromPrompt} from './utils';

/* MAIN */

const open = async ( names?: string | string[] ): Promise<void> => {

  names ||= getPackagesFromEditor () || await getPackagesFromPrompt ( getPackagesFromProject () );

  if ( !names?.length ) return;

  for ( const name of castArray ( names ) ) {

    const url = `https://www.npmjs.com/package/${name}`;

    openInExternal ( url );

  }

};

/* EXPORT */

export {open};
