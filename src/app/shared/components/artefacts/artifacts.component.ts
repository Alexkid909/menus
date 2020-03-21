import {Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {CrudStateEnum} from '../../enums/crud-state.enum';
import {FormFieldClass} from '../../interfaces/form-field.class';
import {FormFieldGroupClass} from '../../classes/form-field-group.class';
import {FormActionClass} from '../../classes/form-action.class';
import { ToolBarFunctionClass} from '../../classes/tool-bar-function.class';

@Component({
  selector: 'app-artifacts',
  templateUrl: './artifacts.component.html',
  styleUrls: ['./artifacts.component.scss']
})
export class ArtifactsComponent implements OnInit {

  @Input() artifactName: string;
  toolbarClasses: string;
  @Input() artifacts: Array<any>;
  @Input() crudState: CrudStateEnum;
  @Input() sideBarTitle: string;
  @Input() formFields: Array<FormFieldClass>;
  @Input() formFieldsModel: Array<FormFieldGroupClass>;
  @Input() formInProgress = false;
  @Input() formSuccessful: boolean;
  @Input() formErrors: Array<string> = [];
  @Input() formActions: Array<FormActionClass>;
  @Input() toolbarFunctions: Array<ToolBarFunctionClass>;
  @Input() deleteButtonFunction: ToolBarFunctionClass;
  @Input() sideBarOpen: boolean;
  @Input() currentArtifactId: string;
  @Output() artifactClicked: EventEmitter<any> = new EventEmitter<any>();



  constructor() { }

  ngOnInit() {
    this.toolbarClasses = `toolbar-artifacts toolbar-${this.artifactName}`;
  }

  onArtifactClicked(artifact: any) {
    this.artifactClicked.emit(artifact);
  }

}
