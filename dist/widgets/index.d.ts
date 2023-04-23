/// <reference types="react" />
import type { SemVer } from 'semver';
export interface WidgetConstructorProps {
    name: string;
    author: string;
    version: SemVer;
}
export default class Widget {
    version: SemVer;
    name: string;
    author: string;
    component: React.FunctionComponent;
    constructor(component: React.FunctionComponent, { name, author, version }: WidgetConstructorProps);
}
