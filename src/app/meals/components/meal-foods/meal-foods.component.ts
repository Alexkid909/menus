import {Component, EventEmitter, Output, Input, OnInit, AfterViewInit, ViewChild} from '@angular/core';
import {FormFieldClass} from '../../../shared/interfaces/form-field.class';
import {FormFieldGroupClass} from '../../../shared/classes/form-field-group.class';
import {FormActionClass} from '../../../shared/classes/form-action.class';
import {Observable} from 'rxjs/internal/Observable';
import {FoodInterface} from '../../../shared/interfaces/food.interface';
import {FoodsService} from '../../../foods/foods.service';
import {FormFieldType} from '../../../shared/enums/form-field-type.enum';
import {FormGroup} from '@angular/forms';
import {FormService} from '../../../form.service';
import {MealFoodClass} from '../../classes/meal-food.class';
import {ComponentService} from '../../../shared/component.service';
import {Subject} from 'rxjs/internal/Subject';
import {FormComponent} from '../../../shared/components/form/form.component';
import {FormValues} from '../../../shared/classes/form-values.class';

@Component({
  selector: 'app-meal-foods',
  templateUrl: './meal-foods.component.html',
  styleUrls: ['./meal-foods.component.scss']
})
export class MealFoodsComponent implements OnInit, AfterViewInit {

  mealFoodFormFields: Array<FormFieldClass>;
  mealFoodFormFieldsModel: Array<FormFieldGroupClass>;
  mealFoodFormErrors: Array<string> = [];
  mealFoodFormActions: Array<FormActionClass>;

  searchFoodsSource: Observable<Array<FoodInterface>>;
  selectedFood: FoodInterface;
  @Output() onAddMealFood: EventEmitter<MealFoodClass> = new EventEmitter<MealFoodClass>();
  @Input() currentMealId: string;
  private resetTermSubject: Subject<void> = new Subject<void>();
  private resetFormSubject: Subject<void> = new Subject<void>();
  initialFormValues: FormData;

  @ViewChild(FormComponent) mealFoodsFormChild: FormComponent;


  constructor(
    private foodsService: FoodsService,
    public formService: FormService,
  ) {}

  ngOnInit() {
    this.mealFoodFormFields = [
      new FormFieldClass('qty', FormFieldType.number, 1, null, null, 'form-input-meal-name')
    ];

    this.mealFoodFormFieldsModel = [
      new FormFieldGroupClass('MealFoodGroup', this.mealFoodFormFields, [], ['form-array-meal-food', 'form-inline']),
    ];

    this.mealFoodFormActions = [
      new FormActionClass('addFoodToMeal',  this.addMealFood.bind(this), {
        buttonClasses: 'btn-transparent btn-icon btn-disc btn-disc-small form-action-inline',
        iconClasses: 'fas fa-plus'
      }, false)
    ];

    this.resetMealFoodsForm();
  }


  ngAfterViewInit(): void {
    this.mealFoodsFormChild.form.reset(this.initialFormValues);
  }

  setInitialFormValues(formBuiltData: FormValues) {
    this.initialFormValues = formBuiltData.formValues;
  }

  resetMealFoodsForm() {
    this.resetFormSubject.next();
    this.searchFoodsSource = this.foodsService.searchFoods('');
    this.resetTermSubject.next();
    this.selectedFood = null;
  }

  selectFood(food: FoodInterface): void {
    this.selectedFood = food;
    console.log('selectedFood', this.selectedFood);
  }

  searchFoods(event) {
    this.searchFoodsSource = this.foodsService.searchFoods(event);
  }

  addMealFood(form: FormGroup) {
    const formValues: any = {};
    form.get('groupsArray').value.forEach((group, groupIndex) => {
      group.fieldsArray.forEach((value, fieldIndex) => {
        const fieldTitle = this.formService.getField(groupIndex, fieldIndex, this.mealFoodFormFieldsModel).title;
        formValues[fieldTitle] = value;
      });
    });

    const { qty } = formValues;
    if (qty && this.selectedFood) {
      const mealFood = new MealFoodClass(this.selectedFood, qty);
      this.onAddMealFood.emit(mealFood);
    }
    this.resetMealFoodsForm();
  }
}
