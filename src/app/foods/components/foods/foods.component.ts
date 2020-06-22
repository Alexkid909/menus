import {Component, OnInit} from '@angular/core';
import {FoodsService} from '../../foods.service';
import {FormGroup, Validators} from '@angular/forms';
import {FormFieldClass} from '../../../shared/interfaces/form-field.class';
import {FormFieldGroupClass} from '../../../shared/classes/form-field-group.class';
import {FormActionClass} from '../../../shared/classes/form-action.class';
import {FormFieldType} from '../../../shared/enums/form-field-type.enum';
import {CrudStateEnum} from '../../../shared/enums/crud-state.enum';
import {ToolBarFunctionClass} from '../../../shared/classes/tool-bar-function.class';
import {SideBarService} from '../../../shared/side-bar.service';
import {ModalService} from '../../../shared/modal.service';
import {ConfirmDialogComponent} from '../../../shared/confirm-dialog/confirm-dialog.component';
import {ModalConfig} from '../../../shared/modal.config';
import { FoodInterface } from '../../../shared/interfaces/food.interface';
import {FoodClass} from '../../classes/food.class';
import {SideBarConfig} from '../../../shared/side-bar.config';
import {SideBarDialogComponent} from '../../../shared/components/side-bar-dialog/side-bar-dialog.component';
import {SideBarRefClass} from '../../../shared/classes/side-bar-ref.class';

@Component({
  selector: 'app-foods',
  templateUrl: './foods.component.html',
  styleUrls: ['./foods.component.scss']
})

export class FoodsComponent implements OnInit {

  userFoods: Array<FoodInterface>;
  crudState: CrudStateEnum;
  foodFormFields: Array<FormFieldClass>;
  foodFormFieldsModel: Array<FormFieldGroupClass>;
  foodFormInProgress = false;
  foodFormSuccessful: boolean;
  foodFormErrors: Array<string> = [];
  foodFormActions: Array<FormActionClass>;
  toolbarFunctions: Array<ToolBarFunctionClass>;
  deleteButtonFunction: ToolBarFunctionClass;
  currentFoodId: string;
  sideBarConfig: SideBarConfig;
  sideBar: SideBarRefClass;


  constructor(public modal: ModalService,
              private foodsService: FoodsService,
              private sideBarService: SideBarService) {
                this.saveFood = this.saveFood.bind(this);

  }

  ngOnInit() {
    this.userFoods = [];
    this.foodsService.foodsBehaviorSubject.subscribe((foods: Array<FoodInterface>) => {
      this.userFoods = foods || [];
    });


    this.crudState = CrudStateEnum.create;

    this.foodFormFields = [
      new FormFieldClass('foodName', FormFieldType.text, '', Validators.required),
      new FormFieldClass('foodMeasurement', FormFieldType.text, '', Validators.required),
    ];

    this.foodFormFieldsModel = [
      new FormFieldGroupClass('FoodGroup', this.foodFormFields, []),
    ];

    this.foodFormActions = [
      new FormActionClass(this.crudState, this.saveFood, {
        buttonClasses: 'btn-wide'
      })
    ];

    this.toolbarFunctions = [
      new ToolBarFunctionClass('Create Food', this.showCreate, [
        'btn-primary',
        'btn-mobile-disc'], ['fas fa-plus fa-lg'])
    ];

    this.toolbarFunctions.forEach((toolbarFunction: any) => {
      toolbarFunction.definition = toolbarFunction.definition.bind(this);
    });

    this.deleteButtonFunction =
      new ToolBarFunctionClass('Delete Food', this.initiateDelete, [
        'btn-artifact-action',
        'btn-artifact-action-delete',
        'btn-icon',
      ], ['fas fa-trash-alt']);

    this.deleteButtonFunction.definition = this.deleteButtonFunction.definition.bind(this);
  }

  updateSidebar(state: CrudStateEnum, food?: FoodInterface) {
    this.setCrudState(state);
    this.foodFormActions.forEach((action: FormActionClass) => {
      action.name = this.crudState;
    });
    this.foodFormFields = [
      new FormFieldClass('foodName', FormFieldType.text, food ? food.name : '', Validators.required),
      new FormFieldClass('foodMeasurement', FormFieldType.text, food ? food.measurement : '', Validators.required),
      new FormFieldClass('foodImageUrl', FormFieldType.text, food ? food.imgSrc : '', null, null)
    ];

    this.foodFormActions.forEach((action: FormActionClass) => {
      action.name = this.crudState;
    });

    this.foodFormFieldsModel = [
      new FormFieldGroupClass('FoodGroup', this.foodFormFields, []),
    ];

    this.sideBarConfig = {
      data: {
        title: `${state} Food`,
        formModel: this.foodFormFieldsModel,
        formActions: this.foodFormActions,
        formErrors: this.foodFormErrors,
        formCSSClasses: 'Food',
        submissionInProgress: this.foodFormInProgress,
        submissionSuccessful: this.foodFormSuccessful
      }
    };
  }


  showCreate() {
    this.updateSidebar(CrudStateEnum.create);
    this.sideBar = this.sideBarService.open(SideBarDialogComponent, this.sideBarConfig);
  }

  showEdit(food) {
    this.updateSidebar(CrudStateEnum.edit, food);
    this.currentFoodId = food._id;
    this.sideBar = this.sideBarService.open(SideBarDialogComponent, this.sideBarConfig);
  }

  setCrudState(state: CrudStateEnum) {
    this.crudState = state;
  }

  saveFood(form: FormGroup) {
    const formValues: any = {};
    form.get('groupsArray').value.forEach((group, groupIndex) => {
      group.fieldsArray.forEach((value, fieldIndex) => {
        const fieldTitle = this.getField(groupIndex, fieldIndex).title;
        formValues[fieldTitle] = value;
      });
    });

    const { foodName, foodMeasurement, foodImageUrl } = formValues;
    const food = new FoodClass(foodName, foodMeasurement, foodImageUrl);


    if (this.crudState === CrudStateEnum.create) {
      this.createFood(food);
    } else {
      this.updateFood(this.currentFoodId, food);
    }
  }

  getField(groupIndex: number, fieldIndex: number) {
    const groupName = Object.keys(this.foodFormFieldsModel)[groupIndex];
    const group = this.foodFormFieldsModel[groupName].fields;
    const result = group[fieldIndex];
    return result;
  }

  createFood(food: FoodClass) {
    this.foodFormInProgress = true;
    this.foodsService.createFood(food).subscribe(() => {
      this.foodFormInProgress = false;
      this.foodFormSuccessful = true;
      this.sideBar.close();
    }, (errorResponse: any) => {
      this.foodFormErrors = errorResponse.error.messages;
      this.foodFormInProgress = false;
      this.foodFormSuccessful = false;
    });

  }

  updateFood(foodId: string, updatedFood: FoodClass) {
    this.foodsService.updateFood(foodId, updatedFood).subscribe(() => {
      this.foodFormInProgress = false;
      this.foodFormSuccessful = true;
      this.sideBar.close();
    }, (errorResponse: any) => {
      this.foodFormErrors = errorResponse.error.messages;
      this.foodFormInProgress = false;
      this.foodFormSuccessful = false;
    });
  }

  initiateDelete(event: Event, food: FoodInterface) {
    event.stopPropagation();
    const config: ModalConfig = {
      data: {
        title: `Delete ${food.name}?`,
        message: `Are you sure you want to delete ${food.name}?`,
        confirmationFunction: this.deleteFood.bind(this),
        confirmationData: food._id
      }
    };
    this.modal.open(ConfirmDialogComponent, config);
  }

  deleteFood(foodId: string) {
    this.foodsService.deleteFood(foodId).subscribe(() => {
    }, (errorResponse: any) => {
      // @TODO Implement error handling.
    });
  }

}
