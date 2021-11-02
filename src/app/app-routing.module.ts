import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PlansComponent } from './plans/plans.component';
import { AccountComponent } from './account/account.component';
import { HomeComponent } from './home/home.component';
import { PurchaseComponent } from './purchase/purchase.component';
import { Plan1Component } from './plan1/plan1.component';
import { Plan2Component } from './plan2/plan2.component';
import { Plan3Component } from './plan3/plan3.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'dashboard', component: DashboardComponent, canActivate : [AuthGuard] 
  },
  {
    path: 'plans', component: PlansComponent
  },
  {
    path: 'account', component: AccountComponent
  },
  {
    path: 'home', component: HomeComponent
  },
  {
    path: 'purchase', component: PurchaseComponent
  },
  {
    path: 'plan1', component: Plan1Component
  },
  {
    path: 'plan2', component: Plan2Component
  },
  {
    path: 'plan3', component: Plan3Component
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
