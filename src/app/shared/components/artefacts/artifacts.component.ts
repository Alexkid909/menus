import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChange, SimpleChanges} from '@angular/core';
import {CrudStateEnum} from '../../enums/crud-state.enum';
import {FormFieldClass} from '../../interfaces/form-field.class';
import {FormFieldGroupClass} from '../../classes/form-field-group.class';
import {FormActionClass} from '../../classes/form-action.class';
import { ToolBarFunctionClass} from '../../classes/tool-bar-function.class';
import { NgxSpinnerService } from 'ngx-spinner';
import {SortOrder} from '../../classes/sort-order';

@Component({
  selector: 'app-artifacts',
  templateUrl: './artifacts.component.html',
  styleUrls: ['./artifacts.component.scss']
})
export class ArtifactsComponent implements OnInit, OnChanges {

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
  @Input() loading: boolean;
  @Input() sortKeys: Array<SortOrder>;
  @Input() showToolbar = true;
  loaderTimeout: any;

  constructor(private spinner: NgxSpinnerService) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.hasOwnProperty('loading') && changes.loading) {
      if (this.loading) {
        this.loaderTimeout = setTimeout(() => {
          this.spinner.show();
        }, 150);
      } else {
        clearTimeout(this.loaderTimeout);
        setTimeout(() => {
          this.spinner.hide();
        }, 100);
      }
    }
  }

  ngOnInit() {
    this.toolbarClasses = `toolbar-artifacts toolbar-${this.artifactName}`;
  }

  onArtifactClicked(artifact: any) {
    this.artifactClicked.emit(artifact);
  }

}
