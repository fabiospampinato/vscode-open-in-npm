
/* IMPORT */

import findUp from 'find-up-json';
import vscode from 'vscode';
import {getProjectRootPath} from 'vscode-extras';

/* MAIN */

const castArray = <T> ( value: T | T[] ): T[] => {

  return Array.isArray ( value ) ? value : [value];

};

const getPackagesFromEditor = (): string[] | undefined => {

  const {activeTextEditor} = vscode.window;

  if ( !activeTextEditor ) return;

  const {document, selections} = activeTextEditor;
  const texts = selections.map ( selection => document.getText ( selection ) ).filter ( Boolean );

  if ( !texts.length ) return;

  return texts;

};

const getPackagesFromProject = (): string | undefined => {

  const repoPath = getProjectRootPath ();

  if ( !repoPath ) return;

  const pkg = findUp ( 'package.json', repoPath )?.content;

  if ( !pkg ) return;

  const isPackage = ( 'name' in pkg ) && isString ( pkg.name );

  if ( !isPackage ) return;

  return pkg.name;

};

const getPackagesFromPrompt = async ( value?: string ): Promise<string | undefined> => {

  return await vscode.window.showInputBox ({
    placeHolder: 'NPM package name...',
    value
  });

};

const isString = ( value: unknown ): value is string => {

  return typeof value === 'string';

};

/* EXPORT */

export {castArray, getPackagesFromEditor, getPackagesFromProject, getPackagesFromPrompt, isString};
