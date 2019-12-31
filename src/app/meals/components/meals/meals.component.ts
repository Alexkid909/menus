import {Component, OnInit} from '@angular/core';
import {MealsService} from '../../meals.service';
import {FormGroup, Validators} from '@angular/forms';
import {FormFieldInterface} from '../../../shared/interfaces/form-field.interface';
import {FormFieldGroupClass} from '../../../shared/classes/form-field-group.class';
import {FormActionClass} from '../../../shared/classes/form-action.class';
import {FormFieldType} from '../../../shared/enums/form-field-type.enum';
import {CrudStateEnum} from '../../../shared/enums/crud-state.enum';
import {ToolBarFunctionClass} from '../../../shared/classes/tool-bar-function.class';
import {SideBarService} from '../../../shared/side-bar.service';
import {ModalService} from '../../../shared/modal.service';
import {ConfirmDialogComponent} from '../../../shared/confirm-dialog/confirm-dialog.component';
import {ModalConfig} from '../../../shared/modal.config';
import {MealInterface} from '../../../shared/interfaces/meal.interface';
import {MealClass} from '../../classes/meal.class';
import {MealFoodClass} from '../../classes/meal-food.class';
import {FormService} from '../../../form.service';
import {SideBarRefClass} from '../../../shared/classes/side-bar-ref.class';
import {SideBarConfig} from '../../../shared/side-bar.config';
import {MealsDialogComponent} from '../meals-dialog/meals-dialog.component';

@Component({
  selector: 'app-meals',
  templateUrl: './meals.component.html',
  styleUrls: ['./meals.component.scss']
})

export class MealsComponent implements OnInit {

  userMeals: Array<MealInterface> = [];
  sideBarTitle: string;
  crudState: CrudStateEnum;
  mealFormFields: Array<FormFieldInterface>;
  mealFormFieldsModel: Array<FormFieldGroupClass>;
  mealFormInProgress = false;
  mealFormSuccessful: boolean;
  mealFormActions: Array<FormActionClass>;
  mealFormErrors: Array<string> = [];
  toolbarFunctions: Array<ToolBarFunctionClass>;
  deleteButtonFunction: ToolBarFunctionClass;
  currentMealId: string;
  addedMealFoods: Array<MealFoodClass> = [];
  sideBarConfig: SideBarConfig;
  sideBar: SideBarRefClass;

  constructor(public modal: ModalService,
              private mealsService: MealsService,
              private sideBarService: SideBarService,
              private formService: FormService) {
    this.saveMeal = this.saveMeal.bind(this);
  }

  ngOnInit() {
    this.mealsService.mealsBehaviorSubject.subscribe((meals: Array<MealInterface>) => {
      this.userMeals = meals || [];
    });

    this.crudState = CrudStateEnum.create;

    this.mealFormFields = [
      new FormFieldInterface('mealName', FormFieldType.text, '', Validators.required, null, 'form-input-meal-name'),
    ];
    this.mealFormFieldsModel = [
      new FormFieldGroupClass('MealGroup', this.mealFormFields, [], 'form-array-meal'),
    ];
    this.mealFormActions = [
      new FormActionClass(this.crudState, this.saveMeal, {
        buttonClasses: 'btn-wide'
      })
    ];

    this.toolbarFunctions = [
      new ToolBarFunctionClass('Create Meal', this.showCreate, ['btn-mobile-disc'], ['fas fa-plus fa-lg'])
    ];

    this.toolbarFunctions.forEach((toolbarFunction: any) => {
      toolbarFunction.definition = toolbarFunction.definition.bind(this);
    });

    this.deleteButtonFunction =
      new ToolBarFunctionClass('Delete Meal', this.initiateDelete, [
        'btn-artifact-action',
        'btn-artifact-action-delete',
      ], ['fas fa-trash-alt']);

    this.deleteButtonFunction.definition = this.deleteButtonFunction.definition.bind(this);
  }

  updateSidebar(state: CrudStateEnum, meal?: MealInterface) {
    this.setCrudState(state);
    this.sideBarTitle = `${state} Meal`;
    this.mealFormActions.forEach((action: FormActionClass) => {
      action.name = this.crudState;
    });

    this.mealFormFields = [
      new FormFieldInterface('mealName', FormFieldType.text, meal ? meal.name : '', Validators.required, null, 'form-input-meal-name'),
    ];


    this.mealFormActions.forEach((action: FormActionClass) => {
      action.name = this.crudState;
    });

    this.mealFormFieldsModel = [
      new FormFieldGroupClass('MealGroup', this.mealFormFields, [], 'form-array-meal'),
    ];

    this.sideBarConfig = {
      data: {
        title: `${state} Meal`,
        formModel: this.mealFormFieldsModel,
        formActions: this.mealFormActions,
        formErrors: this.mealFormErrors,
        formCSSClasses: 'meal',
        submissionInProgress: this.mealFormInProgress,
        submissionSuccessful: this.mealFormSuccessful,
        currentMealId: this.currentMealId,
        addedMealFoods: this.addedMealFoods
      }
    };
  }


  showCreate() {
    this.updateSidebar(CrudStateEnum.create);
    this.sideBar = this.sideBarService.open(MealsDialogComponent, this.sideBarConfig);
  }

  showEdit(meal) {
    this.setCurrentMealId(meal._id);
    this.updateSidebar(CrudStateEnum.edit, meal);
    this.addedMealFoods = [];
    this.sideBar = this.sideBarService.open(MealsDialogComponent, this.sideBarConfig);
  }

  setCurrentMealId(id: string) {
    this.currentMealId = id;
  }

  setCrudState(state: CrudStateEnum) {
    this.crudState = state;
  }

  saveMeal(form: FormGroup) {
    const formValues: any = {};
    form.get('groupsArray').value.forEach((group, groupIndex) => {
      group.fieldsArray.forEach((value, fieldIndex) => {
        const fieldTitle = this.formService.getField(groupIndex, fieldIndex, this.mealFormFieldsModel).title;
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

    if (this.addedMealFoods.length) {
      this.mealsService.addFoodsToMeal(this.currentMealId, this.addedMealFoods).subscribe((results: any) => {
        console.log('added meal foods', results);
      });
    }
  }

  createMeal(meal: MealClass) {
    this.mealFormInProgress = true;
    this.mealsService.createMeal(meal.name).subscribe(() => {
      this.mealFormInProgress = false;
      this.mealFormSuccessful = true;
      this.sideBar.close();
    }, (errorResponse: any) => {
      this.mealFormErrors = errorResponse.error.messages;
      this.mealFormInProgress = this.mealFormSuccessful = false;
    });

  }

  updateMeal(mealId: string, updatedMeal: MealClass) {
    this.mealsService.updateMeal(mealId, updatedMeal).subscribe(() => {
      this.mealFormInProgress = false;
      this.mealFormSuccessful = true;
      this.sideBar.close();
    }, (errorResponse: any) => {
      this.mealFormErrors = errorResponse.error.messages;
      this.mealFormInProgress = this.mealFormSuccessful = false;
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
    this.mealsService.deleteMeal(mealId).subscribe(() => {
    }, (errorResponse: any) => {
      // @TODO Implement error handling.
    });
  }

  addFoodToMeal(mealFood: MealFoodClass) {
    const addedMealFoods = [...this.addedMealFoods];
    addedMealFoods.push(mealFood);
    this.addedMealFoods = addedMealFoods;
  }
}
