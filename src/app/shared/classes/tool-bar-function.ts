export class ToolBarFunction {
  title: string;
  definition: any;
  cssClasses?: Array<string>;
  iconClass?: Array<string>;

  constructor(title: string, definition: any, cssClasses?: Array<string>, iconClass?: Array<string>) {
    this.title = title;
    this.definition = definition;
    this.cssClasses = cssClasses;
    this.iconClass = iconClass;
  }
}
