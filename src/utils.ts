
/* IMPORT */

import vscode from 'vscode';
import {getPackage, prompt} from 'vscode-extras';

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

  const pkg = getPackage ()?.content;
  const isPackage = isObject ( pkg ) && ( 'name' in pkg ) && isString ( pkg.name );

  if ( !isPackage ) return;

  return `${pkg.name}`;

};

const getPackagesFromPrompt = async ( value?: string ): Promise<string | undefined> => {

  return prompt.string ( 'NPM package name...', value );

};

const isObject = ( value: unknown ): value is object => {

  return typeof value === 'object' && value !== null;

};

const isString = ( value: unknown ): value is string => {

  return typeof value === 'string';

};

/* EXPORT */

export {castArray, getPackagesFromEditor, getPackagesFromProject, getPackagesFromPrompt, isObject, isString};
