import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {TenantInterface} from '../shared/interfaces/tenant';
import {CrudStateEnum} from '../shared/enums/crud-state.enum';
import {FormField} from '../shared/interfaces/form-field';
import {FormFieldGroup} from '../shared/classes/form-field-group';
import {FormAction} from '../shared/classes/form-action';
import {ToolBarFunction} from '../shared/classes/tool-bar-function';
import {debug} from 'util';

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
  @Input() formFields: Array<FormField>;
  @Input() formFieldsModel: Array<FormFieldGroup>;
  @Input() formInProgress = false;
  @Input() formSuccessful: boolean;
  @Input() formErrors: Array<string> = [];
  @Input() formActions: Array<FormAction>;
  @Input() toolbarFunctions: Array<ToolBarFunction>;
  @Input() deleteButtonFunction: ToolBarFunction;
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
