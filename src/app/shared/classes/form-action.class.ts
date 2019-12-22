interface ActionCSSClasses {
  buttonClasses?: string | Array<string>;
  iconClasses?: string | Array<string>;
}

export class FormActionClass {
  name: string;
  method: any;
  actionCSSClasses?: ActionCSSClasses;
  showButtonLabels: boolean;

  constructor(name: string, method: any, actionCSSClasses?: ActionCSSClasses, showButtonLabels: boolean = true) {
   this.name = name;
   this.method = method;
   this.actionCSSClasses = actionCSSClasses;
   this.showButtonLabels = showButtonLabels;
  }
}
