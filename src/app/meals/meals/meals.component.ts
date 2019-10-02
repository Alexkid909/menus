import {Component, OnInit} from '@angular/core';
import {MealsService} from '../meals.service';
import {FormGroup, Validators} from '@angular/forms';
import {FormField} from '../../shared/interfaces/form-field';
import {FormFieldGroup} from '../../shared/classes/form-field-group';
import {FormAction} from '../../shared/classes/form-action';
import {FormFieldType} from '../../shared/enums/form-field-type.enum';
import {CrudStateEnum} from '../../shared/enums/crud-state.enum';
import {ToolBarFunction} from '../../shared/classes/tool-bar-function';
import {SideBarService} from '../../shared/side-bar.service';
import {ModalService} from '../../shared/modal.service';
import {ConfirmDialogComponent} from '../../shared/confirm-dialog/confirm-dialog.component';
import {ModalConfig} from '../../shared/modal-config';
import { MealInterface } from '../../shared/interfaces/meal';
import { MealClass } from '../classes/mealClass';
import {TenantsService} from '../../tenants/tenants.service';

@Component({
  selector: 'app-meals',
  templateUrl: './meals.component.html',
  styleUrls: ['./meals.component.scss']
})

export class MealsComponent implements OnInit {

  userMeals: Array<MealInterface>;
  sideBarTitle: string;
  crudState: CrudStateEnum;
  mealFormFields: Array<FormField>;
  mealFormFieldsModel: Array<FormFieldGroup>;
  mealFormInProgress = false;
  mealFormSuccessful: boolean;
  mealFormErrors: Array<string> = [];
  mealFormActions: Array<FormAction>;
  toolbarFunctions: Array<ToolBarFunction>;
  deleteButtonFunction: ToolBarFunction;
  currentMealId: string;
  sideBarOpen: boolean;


  constructor(public modal: ModalService,
              private mealsService: MealsService,
              private sideBarService: SideBarService,
              private modalService: ModalService,
              private tenanantsService: TenantsService) {
    this.saveMeal = this.saveMeal.bind(this);

  }

  ngOnInit() {
    this.userMeals = [];
    this.mealsService.mealsBehaviorSubject.subscribe((meals: Array<MealInterface>) => {
      this.userMeals = meals || [];
    });


    this.crudState = CrudStateEnum.create;

    this.mealFormFields = [
      new FormField('mealName', FormFieldType.text, '', Validators.required),
      new FormField('mealMeasurement', FormFieldType.text, '', Validators.required),
    ];

    this.mealFormFieldsModel = [
      new FormFieldGroup('MealGroup', this.mealFormFields, []),
    ];

    this.mealFormActions = [
      new FormAction(this.crudState, this.saveMeal)
    ];

    this.toolbarFunctions = [
      new ToolBarFunction('Create Meal', this.showCreate, ['btn-mobile-disc'], ['fas fa-plus'])
    ];

    this.toolbarFunctions.forEach((toolbarFunction: any) => {
      toolbarFunction.definition = toolbarFunction.definition.bind(this);
    });

    this.deleteButtonFunction =
      new ToolBarFunction('Delete Meal', this.initiateDelete, [
        'btn-artifact-action',
        'btn-artifact-action-delete',
      ], ['fas fa-trash-alt']);

    this.deleteButtonFunction.definition = this.deleteButtonFunction.definition.bind(this);
    // console.log('meals component', this);
  }

  updateSidebar(state: CrudStateEnum, meal?: MealInterface) {
    this.setCrudState(state);
    this.sideBarTitle = `${state} Meal`;
    this.mealFormActions.forEach((action: FormAction) => {
      action.name = this.crudState;
    });
    this.mealFormFields = [
      new FormField('mealName', FormFieldType.text, meal ? meal.name : '', Validators.required),
    ];

    this.mealFormActions.forEach((action: FormAction) => {
      action.name = this.crudState;
    });

    this.mealFormFieldsModel = [
      new FormFieldGroup('MealGroup', this.mealFormFields, []),
    ];

    this.sideBarService.open();
  }


  showCreate() {
    this.updateSidebar(CrudStateEnum.create);
  }

  showEdit(meal) {
    this.updateSidebar(CrudStateEnum.edit, meal);
    this.currentMealId = meal._id;
  }

  setCrudState(state: CrudStateEnum) {
    this.crudState = state;
  }

  saveMeal(form: FormGroup) {
    const formValues: any = {};
    form.get('groupsArray').value.forEach((group, groupIndex) => {
      group.fieldsArray.forEach((value, fieldIndex) => {
        const fieldTitle = this.getField(groupIndex, fieldIndex).title;
        formValues[fieldTitle] = value;
      });
    });

    const { mealName } = formValues;
    const meal = new MealClass(mealName);


    if (this.crudState === CrudStateEnum.create) {
      this.createMeal(meal);
    } else {
      this.updateMeal(this.currentMealId, meal);
    }
  }

  getField(groupIndex: number, fieldIndex: number) {
    const groupName = Object.keys(this.mealFormFieldsModel)[groupIndex];
    const group = this.mealFormFieldsModel[groupName].fields;
    const result = group[fieldIndex];
    return result;
  }

  createMeal(meal: MealClass) {
    this.mealFormInProgress = true;
    this.mealsService.createMeal(meal.name).subscribe((response: any) => {
      this.mealFormInProgress = false;
      this.mealFormSuccessful = true;
      this.sideBarService.close();
    }, (errorResponse: any) => {
      this.mealFormErrors = errorResponse.error.messages;
      this.mealFormInProgress = false;
      this.mealFormSuccessful = false;
    });

  }

  updateMeal(mealId: string, updatedMeal: MealClass) {
    this.mealsService.updateMeal(mealId, updatedMeal).subscribe((response: any) => {
      this.mealFormInProgress = false;
      this.mealFormSuccessful = true;
      this.sideBarService.close();
    }, (errorResponse: any) => {
      this.mealFormErrors = errorResponse.error.messages;
      this.mealFormInProgress = false;
      this.mealFormSuccessful = false;
    });
  }

  initiateDelete(event: Event, meal: MealInterface) {
    event.stopPropagation();
    const config: ModalConfig = {
      data: {
        title: `Delete ${meal.name}?`,
        message: `Are you sure you want to delete ${meal.name}?`,
        confirmationFunction: this.deleteMeal.bind(this),
        confirmationData: meal._id
      }
    };
    this.modal.open(ConfirmDialogComponent, config);
  }

  deleteMeal(mealId: string) {
    this.mealsService.deleteMeal(mealId).subscribe((response: any) => {
    }, (errorResponse: any) => {
      // @TODO Implement error handling.
    });
  }

}
