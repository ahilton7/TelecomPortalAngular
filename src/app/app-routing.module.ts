import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PlansComponent } from './plans/plans.component';
import { AccountComponent } from './account/account.component';
import { HomeComponent } from './home/home.component';
import { PurchaseComponent } from './purchase/purchase.component';
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
