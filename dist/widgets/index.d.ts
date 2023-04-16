/// <reference types="react" />
import type { SemVer } from 'semver';
export interface WidgetConstructorProps {
    name: string;
    author: string;
    copyright: string;
    version: SemVer;
}
export default class Widget {
    version: SemVer;
    name: string;
    author: string;
    component: JSX.Element;
    constructor(component: JSX.Element, { name, author, version }: WidgetConstructorProps);
}
