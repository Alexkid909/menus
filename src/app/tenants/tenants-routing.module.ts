import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../shared/guards/auth.guard';
import { TenantsComponent } from './components/tenants/tenants.component';

const tenantsRoutes: Routes = [
    // {
    //     path: 'tenants/:tenantId',
    //     canActivate: [AuthGuard],
    //     component: EditFoodComponent,
    // },
    {
        path: 'tenants',
        canActivate: [AuthGuard],
        component: TenantsComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(tenantsRoutes)],
  exports: [RouterModule]
})
export class TenantsRoutingModule { }
