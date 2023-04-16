import type { SemVer } from 'semver'

export interface WidgetConstructorProps {
  name: string
  author: string
  copyright: string
  version: SemVer
}

export default class Widget {
  public version: SemVer

  public name: string
  public author: string

  public component: JSX.Element

  constructor(
    component: JSX.Element,
    { name, author, version }: WidgetConstructorProps
  ) {
    this.component = component
    this.name = name
    this.author = author
    this.version = version
  }
}
