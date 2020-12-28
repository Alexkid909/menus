import {Component, OnInit} from '@angular/core';
import {MealsService} from '../../meals.service';
import {FormGroup, Validators} from '@angular/forms';
import {FormFieldClass} from '../../../shared/interfaces/form-field.class';
import {FormFieldGroupClass} from '../../../shared/classes/form-field-group.class';
import {FormActionClass} from '../../../shared/classes/form-action.class';
import {FormFieldType} from '../../../shared/enums/form-field-type.enum';
import {CrudStateEnum} from '../../../shared/enums/crud-state.enum';
import {ToolBarFunctionClass} from '../../../shared/classes/tool-bar-function.class';
import {ConfirmDialogComponent} from '../../../shared/confirm-dialog/confirm-dialog.component';
import {MealInterface} from '../../../shared/interfaces/meal.interface';
import {Order, SortOrder} from '../../../shared/classes/sort-order';
import {MealClass} from '../../classes/meal.class';
import {MealFoodClass} from '../../classes/meal-food.class';
import {FormService} from '../../../form.service';
import {ComponentConfig} from '../../../shared/component.config';
import {MealsDialogComponent} from '../meals-dialog/meals-dialog.component';
import {ModalComponent} from '../../../shared/components/modal/modal.component';
import {SideBarService} from '../../../shared/side-bar.service';
import {ModalService} from '../../../shared/modal.service';

@Component({
  selector: 'app-meals',
  templateUrl: './meals.component.html',
  styleUrls: ['./meals.component.scss']
})

export class MealsComponent implements OnInit {

  userMeals: Array<MealInterface> = [];
  sideBarTitle: string;
  crudState: CrudStateEnum;
  mealFormFields: Array<FormFieldClass>;
  mealFormFieldsModel: Array<FormFieldGroupClass>;
  mealFormInProgress = false;
  mealFormSuccessful: boolean;
  mealFormActions: Array<FormActionClass>;
  mealFormErrors: Array<string> = [];
  toolbarFunctions: Array<ToolBarFunctionClass>;
  deleteButtonFunction: ToolBarFunctionClass;
  currentMealId: string;
  addedMealFoods: Array<MealFoodClass> = [];
  sideBarConfig: ComponentConfig;
  loading: boolean;
  sortKeys: Array<SortOrder> = [];

  constructor(public modalService: ModalService,
              private mealsService: MealsService,
              private formService: FormService,
              private sideBarService: SideBarService
  ) {
    this.saveMeal = this.saveMeal.bind(this);
    this.loading = true;
    this.setSortKeys();
  }

  ngOnInit(): void {
    this.mealsService.mealsBehaviorSubject.subscribe((meals: Array<MealInterface>) => {
      this.userMeals = meals || [];
      this.loading = false;
    });

    this.crudState = CrudStateEnum.create;

    this.mealFormFields = [
      new FormFieldClass('mealName', FormFieldType.text, '', Validators.required, null, 'form-input-meal-name'),
      new FormFieldClass('mealImgSrc', FormFieldType.text, '', null, null, 'form-input-meal-img-src')
    ];
    this.mealFormFieldsModel = [
      new FormFieldGroupClass('MealGroup', this.mealFormFields, [], 'form-array-meal')
    ];
    this.mealFormActions = [
      new FormActionClass(this.crudState, this.saveMeal, {
        buttonClasses: ['btn-wide', 'btn-primary']
      })
    ];

    this.toolbarFunctions = [
      new ToolBarFunctionClass('Create Meal', this.showCreate, [
        'btn-mobile-disc',
        'btn-primary',
      ], ['fas fa-plus fa-lg'])
    ];

    this.toolbarFunctions.forEach((toolbarFunction: any) => {
      toolbarFunction.definition = toolbarFunction.definition.bind(this);
    });

    this.deleteButtonFunction =
      new ToolBarFunctionClass('Delete Meal', this.initiateDelete, [
        'btn-artifact-action',
        'btn-artifact-action-delete',
        'btn-icon',
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
      new FormFieldClass('mealName', FormFieldType.text, meal ? meal.name : '', Validators.required, null, 'form-input-meal-name'),
      new FormFieldClass('mealImageUrl', FormFieldType.text, meal ? meal.imgSrc : '', null, null, 'form-input-meal-img-src')
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
        addedMealFoods: this.addedMealFoods,
        addFoodToMeal: this.addFoodToMeal.bind(this)
      }
    };
  }

  showCreate() {
    this.setCurrentMealId(null);
    this.updateSidebar(CrudStateEnum.create);
    this.sideBarService.showSideBar(MealsDialogComponent, this.sideBarConfig);
  }

  showEdit(meal: MealInterface | null) {
    this.setCurrentMealId(meal._id);
    this.updateSidebar(CrudStateEnum.edit, meal);
    this.addedMealFoods = [];
    this.sideBarService.showSideBar(MealsDialogComponent, this.sideBarConfig);
  }

  setCurrentMealId(id: string | null) {
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

    const { mealName, mealImageUrl } = formValues;
    const meal = new MealClass(mealName, mealImageUrl);

    if (this.crudState === CrudStateEnum.create) {
      this.createMeal(meal);
    } else {
      this.updateMeal(this.currentMealId, meal);
    }

    if (this.addedMealFoods.length) {
      this.mealsService.addFoodsToMeal(this.currentMealId, this.addedMealFoods).subscribe((results: any) => {
        this.addedMealFoods = [];
        console.log('added meal foods', results);
      });
    }
  }

  createMeal(meal: MealClass) {
    this.mealFormInProgress = true;
    this.loading = true;
    this.mealsService.createMeal(meal).subscribe(() => {
      this.mealFormInProgress = false;
      this.mealFormSuccessful = true;
      this.sideBarService.closeSideBar();
    }, (errorResponse: any) => {
      this.mealFormErrors = errorResponse.error.messages;
      this.mealFormInProgress = this.mealFormSuccessful = false;
    });

  }

  updateMeal(mealId: string, updatedMeal: MealClass) {
    this.loading = true;
    this.mealsService.updateMeal(mealId, updatedMeal).subscribe(() => {
      this.mealFormInProgress = false;
      this.mealFormSuccessful = true;
      this.sideBarService.closeSideBar();
    }, (errorResponse: any) => {
      this.mealFormErrors = errorResponse.error.messages;
      this.mealFormInProgress = this.mealFormSuccessful = false;
    });
  }

  initiateDelete(event: Event, meal: MealInterface) {
    event.stopPropagation();
    const config: ComponentConfig = {
      data: {
        title: `Delete ${meal.name}?`,
        message: `Are you sure you want to delete ${meal.name}?`,
        confirmationFunction: this.deleteMeal.bind(this),
        confirmationData: meal._id
      }
    };
    this.modalService.showNewModal(ModalComponent, ConfirmDialogComponent, config);
  }

  deleteMeal(mealId: string) {
    this.loading = true;
    this.mealsService.deleteMeal(mealId).subscribe(() => {
    }, (errorResponse: any) => {
      // @TODO Implement error handling.
    });
  }

  addFoodToMeal(mealFood: MealFoodClass) {
    const addedMealFoods = [...this.addedMealFoods];
    addedMealFoods.push(mealFood);
    this.addedMealFoods = this.sideBarConfig.data.addedMealFoods = addedMealFoods;
  }

  setSortKeys() {
    this.sortKeys.push(
      new SortOrder('name', 'Name - A to Z', Order.Asc),
      new SortOrder('name', 'Name - Z to A', Order.Des)
    );
  }

  sortMeals(sortOrder) {
    this.loading = true;
    this.mealsService.sortMeals(sortOrder);
  }
}
