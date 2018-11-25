// Vendor
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

// App
import { AppComponent } from './app.component';

// Angular Material
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MealsModule} from './meals/meals.module';
import {AppRoutingModule} from './app-routing.module';
import {FoodsModule} from './foods/foods.module';
import { NavigationComponent } from './navigation/navigation.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
  ],
  imports: [
      BrowserModule,
      BrowserAnimationsModule,
      HttpClientModule,
      MealsModule,
      FoodsModule,
      AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
