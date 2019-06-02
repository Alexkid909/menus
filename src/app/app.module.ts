// Vendor
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

// App
import {AppComponent} from './app.component';

// Angular Material
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MealsModule} from './meals/meals.module';
import {AppRoutingModule} from './app-routing.module';
import {FoodsModule} from './foods/foods.module';
import {NavigationComponent} from './navigation/navigation.component';
import {AuthModule} from './auth/auth.module';
import {ApiInterceptorService} from './api-interceptor.service';
import {AuthGuard} from './shared/guards/auth.guard';
import {SharedModule} from './shared/shared.module';
import {TenantsModule} from './tenants/tenants.module';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MealsModule,
    FoodsModule,
    AuthModule,
    AppRoutingModule,
    SharedModule,
    TenantsModule
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptorService,
      multi: true
    }
  ],
  declarations: [
    AppComponent,
    NavigationComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
