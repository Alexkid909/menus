import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FoodsService} from '../foods.service';
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
import { FoodInterface } from '../../shared/interfaces/food';
import {FoodClass} from '../classes/food';
import {TenantsService} from '../../tenants/tenants.service';

@Component({
  selector: 'app-foods',
  templateUrl: './foods.component.html',
  styleUrls: ['./foods.component.scss']
})

export class FoodsComponent implements OnInit {

  userFoods: Array<FoodInterface>;
  sideBarTitle: string;
  crudState: CrudStateEnum;
  foodFormFields: Array<FormField>;
  foodFormFieldsModel: Array<FormFieldGroup>;
  foodFormInProgress = false;
  foodFormSuccessful: boolean;
  foodFormErrors: Array<string> = [];
  foodFormActions: Array<FormAction>;
  toolbarFunctions: Array<ToolBarFunction>;
  deleteButtonFunction: ToolBarFunction;
  currentFoodId: string;
  sideBarOpen: boolean;


  constructor(public modal: ModalService,
              private foodsService: FoodsService,
              private sideBarService: SideBarService,
              private modalService: ModalService,
              private tenanantsService: TenantsService) {
                this.saveFood = this.saveFood.bind(this);

  }

  ngOnInit() {
    this.userFoods = [];
    this.foodsService.foodsBehaviorSubject.subscribe((foods: Array<FoodInterface>) => {
      this.userFoods = foods || [];
    });


    console.log('this.userFoods', this.userFoods);


    this.crudState = CrudStateEnum.create;

    this.foodFormFields = [
      new FormField('foodName', FormFieldType.text, '', Validators.required)
    ];

    this.foodFormFieldsModel = [
      new FormFieldGroup('FoodGroup', this.foodFormFields, []),
    ];

    this.foodFormActions = [
      new FormAction(this.crudState, this.saveFood)
    ];

    this.toolbarFunctions = [
      new ToolBarFunction('Create Food', this.showCreate, ['btn-mobile-disc'], ['fas fa-plus'])
    ];

    this.toolbarFunctions.forEach((toolbarFunction: any) => {
      toolbarFunction.definition = toolbarFunction.definition.bind(this);
    });

    this.deleteButtonFunction =
      new ToolBarFunction('Delete Food', this.initiateDelete, [
        'btn-artifact-action',
        'btn-artifact-action-delete',
      ], ['fas fa-trash-alt']);

    this.deleteButtonFunction.definition = this.deleteButtonFunction.definition.bind(this);
    // console.log('foods component', this);
  }

  updateSidebar(state: CrudStateEnum, food?: FoodInterface) {
    this.setCrudState(state);
    this.sideBarTitle = `${state} Food`;
    this.foodFormActions.forEach((action: FormAction) => {
      action.name = this.crudState;
    });
    this.foodFormFields = [
      new FormField('foodName', FormFieldType.text, food ? food.name : '', Validators.required)
    ];

    this.foodFormActions.forEach((action: FormAction) => {
      action.name = this.crudState;
    });

    this.foodFormFieldsModel = [
      new FormFieldGroup('FoodGroup', this.foodFormFields, []),
    ];

    this.sideBarService.open();
  }


  showCreate() {
    this.updateSidebar(CrudStateEnum.create);
  }

  showEdit(food) {
    this.updateSidebar(CrudStateEnum.edit, food);
    this.currentFoodId = food._id;
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

    const { foodName } = formValues;
    // const food = new FoodClass(foodName);
    //
    //
    // if (this.crudState === CrudStateEnum.create) {
    //   this.createFood(food);
    // } else {
    //   this.updateFood(this.currentFoodId, food);
    // }
  }

  getField(groupIndex: number, fieldIndex: number) {
    const groupName = Object.keys(this.foodFormFieldsModel)[groupIndex];
    const group = this.foodFormFieldsModel[groupName].fields;
    const result = group[fieldIndex];
    return result;
  }

  createFood(food: FoodClass) {
    this.foodFormInProgress = true;
    this.foodsService.createFood(food.name, food.measurement).subscribe((response: any) => {
      this.foodFormInProgress = false;
      this.foodFormSuccessful = true;
      this.sideBarService.close();
    }, (errorResponse: any) => {
      this.foodFormErrors = errorResponse.error.messages;
      this.foodFormInProgress = false;
      this.foodFormSuccessful = false;
    });

  }

  updateFood(updatedFood: FoodInterface) {
    this.foodsService.updateFood(updatedFood).subscribe((response: any) => {
      this.foodFormInProgress = false;
      this.foodFormSuccessful = true;
      this.sideBarService.close();
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

  deleteFood(food: FoodInterface) {
    this.foodsService.deleteFood(food).subscribe((response: any) => {
    }, (errorResponse: any) => {
      // @TODO Implement error handling.
    });
  }

}
