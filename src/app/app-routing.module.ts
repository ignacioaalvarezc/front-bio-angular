import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { AdminGuard } from './services/guards/admin.guard';
import { UserGuard } from './services/guards/user.guard';
import { ProfileComponent } from './pages/profile/profile.component';
import { WelcomeComponent } from './pages/admin/welcome/welcome.component';
import { ViewUsersComponent } from './pages/admin/users/view-users/view-users.component';
import { AddUsersComponent } from './pages/admin/users/add-users/add-users.component';
import { UpdateUsersComponent } from './pages/admin/users/update-users/update-users.component';
import { UserWelcomeComponent } from './pages/user/user-welcome/user-welcome.component';
import { AuthGuard } from './services/guards/auth.guard';
import { ReceptionComponent } from './pages/user/processes/reception/reception.component';
import { KnotCuttingComponent } from './pages/user/processes/knot-cutting/knot-cutting.component';
import { DryingComponent } from './pages/user/processes/drying/drying.component';
import { PackagingComponent } from './pages/user/processes/packaging/packaging.component';
import { ViewResponsiblesComponent } from './pages/admin/processes/responsibles/view-responsibles/view-responsibles.component';
import { AddResponsiblesComponent } from './pages/admin/processes/responsibles/add-responsibles/add-responsibles.component';
import { UpdateResponsiblesComponent } from './pages/admin/processes/responsibles/update-responsibles/update-responsibles.component';
import { ViewReceptionsComponent } from './pages/admin/processes/reception/view-receptions/view-receptions.component';
import { UpdateReceptionsComponent } from './pages/admin/processes/reception/update-receptions/update-receptions.component';
import { ViewCuttingsComponent } from './pages/admin/processes/cutting/process/view-cuttings/view-cuttings.component';
import { AddReceptionComponent } from './pages/admin/processes/reception/add-receptions/add-receptions.component';
import { ViewStrawTypesComponent } from './pages/admin/processes/straws/view-straw-types/view-straw-types.component';
import { UpdateStrawTypesComponent } from './pages/admin/processes/straws/update-straw-types/update-straw-types.component';
import { AddStrawTypesComponent } from './pages/admin/processes/straws/add-straw-types/add-straw-types.component';
import { ViewSizingsComponent } from './pages/admin/processes/sizing/view-sizings/view-sizings.component';
import { ViewParametersComponent } from './pages/admin/processes/parameters/view-parameters/view-parameters.component';
import { UpdateParametersComponent } from './pages/admin/processes/parameters/update-parameters/update-parameters.component';
import { AddSizingsComponent } from './pages/admin/processes/sizing/add-sizings/add-sizings.component';
import { AddDryingComponent } from './pages/user/processes/drying/add-drying/add-drying.component';
import { ViewSanitatingsComponent } from './pages/admin/processes/sanitating/view-sanitatings/view-sanitatings.component';
import { UpdateSanitatingsComponent } from './pages/admin/processes/sanitating/update-sanitatings/update-sanitatings.component';
import { ViewPackagingsComponent } from './pages/admin/processes/packing/view-packagings/view-packagings.component';
import { AddPackagingsComponent } from './pages/admin/processes/packing/add-packagings/add-packagings.component';
import { UpdatePackagingsComponent } from './pages/admin/processes/packing/update-packagings/update-packagings.component';
import { ViewBoxComponent } from './pages/admin/processes/packing/view-box/view-box.component';
import { AddBoxComponent } from './pages/admin/processes/packing/add-box/add-box.component';
import { UpdateBoxComponent } from './pages/admin/processes/packing/update-box/update-box.component';
import { ViewOrdersComponent } from './pages/admin/orders/view-orders/view-orders.component';
import { AddOrdersComponent } from './pages/admin/orders/add-orders/add-orders.component';
import { UpdateOrdersComponent } from './pages/admin/orders/update-orders/update-orders.component';
import { AddCuttingsComponent } from './pages/admin/processes/cutting/process/add-cuttings/add-cuttings.component';
import { UpdateCuttingsComponent } from './pages/admin/processes/cutting/process/update-cuttings/update-cuttings.component';
import { UpdateSizingsComponent } from './pages/admin/processes/sizing/update-sizings/update-sizings.component';
import { AddSanitatingComponent } from './pages/admin/processes/sanitating/add-sanitating/add-sanitating.component';
import { ViewPendingsComponent } from './pages/user/order/view-pendings/view-pendings.component';
import { ViewCompleteOrdersComponent } from './pages/user/order/view-complete-orders/view-complete-orders.component';
import { ViewCutTypesComponent } from './pages/admin/processes/cutting/type/view-cut-types/view-cut-types.component';
import { ViewCutProductionComponent } from './pages/admin/processes/cutting/production/view-cut-production/view-cut-production.component';
import { ViewReceptionStatisticsComponent } from './pages/admin/processes/reception/view-reception-statistics/view-reception-statistics.component';
import { ViewReceptionProductionComponent } from './pages/admin/processes/reception/view-reception-production/view-reception-production.component';
import { SanitizedComponent } from './pages/user/processes/sanitized/sanitized.component';
import { CleaningToolsComponent } from './pages/user/inventory/cleaning-tools/cleaning-tools.component';
import { IndexInventoryComponent } from './pages/user/inventory/index-inventory/index-inventory.component';
import { SecurityItemComponent } from './pages/user/inventory/security-item/security-item.component';
import { ViewSanitizedsComponent } from './pages/admin/processes/sanitating/view-sanitizeds/view-sanitizeds.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'admin',
    component: DashboardComponent,
    canActivate: [AdminGuard],
    children:[

      // DASHBOARD
      {
        path: '',
        component: WelcomeComponent
      },
      // ADMIN RECEPTION
      {
        path: 'view-receptions',
        component: ViewReceptionsComponent
      },
      {
        path: 'add-receptions',
        component: AddReceptionComponent
      },
      {
        path: 'receptions/id/:receptionId',
        component: UpdateReceptionsComponent
      },
      {
        path: 'view-reception-statistics',
        component: ViewReceptionStatisticsComponent
      },
      {
        path: 'view-reception-production',
        component: ViewReceptionProductionComponent
      },
      // ADMIN CUTTING
      {
        path: 'view-cuttings',
        component: ViewCuttingsComponent
      },
      {
        path: 'add-cuttings',
        component: AddCuttingsComponent
      },
      {
        path: 'cuttings/id/:cuttingId',
        component: UpdateCuttingsComponent
      },

      {
        path: 'view-cut-types',
        component: ViewCutTypesComponent
      },
      {
        path: 'view-cut-production',
        component: ViewCutProductionComponent
      },

      // ADMIN USERS
      {
        path: 'view-users',
        component: ViewUsersComponent
      },
      {
        path: 'add-users',
        component: AddUsersComponent
      },
      {
        path: 'users/id/:userId',
        component: UpdateUsersComponent
      },
      {
        path: 'view-orders',
        component: ViewOrdersComponent
      },
      {
        path: 'add-orders',
        component: AddOrdersComponent
      },
      {
        path: 'orders/id/:orderId',
        component: UpdateOrdersComponent
      },
      {
        path: 'view-responsibles',
        component: ViewResponsiblesComponent
      },
      {
        path: 'add-responsibles',
        component: AddResponsiblesComponent
      },
      {
        path: 'responsibles/id/:responsibleId',
        component: UpdateResponsiblesComponent
      },
      {
        path: 'view-strawTypes',
        component: ViewStrawTypesComponent
      },
      {
        path: 'add-strawTypes',
        component: AddStrawTypesComponent
      },
      {
        path: 'strawTypes/id/:strawTypeId',
        component: UpdateStrawTypesComponent
      },
      {
        path: 'view-parameters',
        component: ViewParametersComponent
      },
      {
        path: 'parameters/id/:parameterId',
        component: UpdateParametersComponent
      },
      {
        path: 'view-sizings',
        component: ViewSizingsComponent
      },
      {
        path: 'add-sizings',
        component: AddSizingsComponent
      },
      {
        path: 'sizedBaskets/id/:sizedBasketId',
        component: UpdateSizingsComponent
      },
      {
        path: 'view-sanitizeds',
        component: ViewSanitizedsComponent
      },
      {
        path: 'add-sanitatings',
        component: AddSanitatingComponent
      },
      {
        path: 'sanitatedBaskets/id/:sanitatedBasketId',
        component: UpdateSanitatingsComponent
      },
      {
        path: 'view-packagings',
        component: ViewPackagingsComponent
      },
      {
        path: 'add-packagings',
        component: AddPackagingsComponent
      },
      {
        path: 'packagings/id/:packagingId',
        component: UpdatePackagingsComponent
      },
      {
        path: 'view-boxTypes',
        component: ViewBoxComponent
      },
      {
        path: 'add-boxTypes',
        component: AddBoxComponent
      },
      {
        path: 'boxTypes/id/:boxTypeId',
        component: UpdateBoxComponent
      },
    ]
  },
  {
    path: 'user-dashboard',
    component: UserDashboardComponent,
    canActivate: [UserGuard],
    children : [
      // USER HOME
      {
        path: 'user-welcome',
        component:UserWelcomeComponent
      },
      // RECEPTION PROCESS
      {
        path: 'reception',
        component:ReceptionComponent
      },
      // CUTTING PROCESS
      {
        path: 'knot-cutting',
        component:KnotCuttingComponent
      },
      // SANITIZED PROCESS
      {
        path: 'sanitized',
        component:SanitizedComponent
      },
      {
        path: 'sanitizedBoxes',
        component:DryingComponent
      },
      {
        path: 'sanitizedBoxes/id/:sanitizedBoxId',
        component:AddDryingComponent
      },
      {
        path: 'packaging',
        component:PackagingComponent
      },
      {
        path: 'view-pendings',
        component:ViewPendingsComponent
      },
      {
        path: 'view-complete-orders',
        component: ViewCompleteOrdersComponent
      },
      {
        path: 'index-inventory',
        component: IndexInventoryComponent
      },
      {
        path: 'cleaning-tools',
        component: CleaningToolsComponent
      },
      {
        path: 'security-items',
        component: SecurityItemComponent
      }
    ]
  },
  {
    path: "profile",
    component: ProfileComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


