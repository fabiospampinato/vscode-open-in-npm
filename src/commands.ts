
/* IMPORT */

import * as _ from 'lodash';
import * as openPath from 'open';
import * as path from 'path';
import * as vscode from 'vscode';
import Utils from './utils';

/* COMMANDS */

async function open ( pkg?: string | string[] ) {

  /* SELECTIONS */

  if ( !pkg ) {

    const editor = vscode.window.activeTextEditor;

    if ( editor ) {

      const {document, selections} = editor,
            texts = _.compact ( selections.map ( selection => document.getText ( selection ) ) );

      if ( texts.length ) {

        pkg = texts;

      }

    }

  }

  /* PROJECT NAME */

  let projectName;

  if ( !pkg ) {

    const editor = vscode.window.activeTextEditor,
          editorPath = editor && editor.document.uri.fsPath,
          rootPath = Utils.folder.getRootPath ( editorPath );

    if ( rootPath ) {

      const projectPath = await Utils.folder.getWrapperPathOf ( rootPath, editorPath || rootPath, 'package.json' );

      if ( projectPath ) {

        const packagePath = path.join ( projectPath, 'package.json' ),
              packageContent = await Utils.file.read ( packagePath ),
              packageObj = _.attempt ( JSON.parse, packageContent ),
              isNPMPackage = !_.isError ( packageObj ) && packageObj.name;

        if ( isNPMPackage ) {

          projectName = packageObj.name;

        }

      }

    }

  }

  /* INPUT BOX */

  if ( !pkg ) {

    pkg = await vscode.window.showInputBox ({
      placeHolder: 'NPM package name...',
      value: projectName
    });

  }

  /* OPEN */

  if ( pkg ) {

    _.castArray ( pkg ).map ( pkg => openPath ( `https://www.npmjs.com/package/${pkg}` ) );

  }

}

/* EXPORT */

export {open};
