import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MomentDateModule } from '@angular/material-moment-adapter';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';


import { LoginComponent } from './pages/login/login.component';
import { authInterceptorProviders } from './services/auth/auth.interceptor';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { WelcomeComponent } from './pages/admin/welcome/welcome.component';
import { ViewUsersComponent } from './pages/admin/users/view-users/view-users.component';
import { AddUsersComponent } from './pages/admin/users/add-users/add-users.component';
import { NgxUiLoaderModule, NgxUiLoaderHttpModule } from 'ngx-ui-loader';
import { UpdateUsersComponent } from './pages/admin/users/update-users/update-users.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { BodyComponent } from './components/body/body.component';
import { HeaderComponent } from './components/header/header.component';


import { OverlayModule } from '@angular/cdk/overlay';
import { CdkMenuModule } from '@angular/cdk/menu';
import { UserWelcomeComponent } from './pages/user/user-welcome/user-welcome.component';
import { KnotCuttingComponent } from './pages/user/processes/knot-cutting/knot-cutting.component';
import { DryingComponent } from './pages/user/processes/drying/drying.component';
import { PackagingComponent } from './pages/user/processes/packaging/packaging.component';
import { ReceptionComponent } from './pages/user/processes/reception/reception.component';
import { ViewResponsiblesComponent } from './pages/admin/processes/responsibles/view-responsibles/view-responsibles.component';
import { UpdateResponsiblesComponent } from './pages/admin/processes/responsibles/update-responsibles/update-responsibles.component';
import { AddResponsiblesComponent } from './pages/admin/processes/responsibles/add-responsibles/add-responsibles.component';
import { ViewReceptionsComponent } from './pages/admin/processes/reception/view-receptions/view-receptions.component';
import { UpdateReceptionsComponent } from './pages/admin/processes/reception/update-receptions/update-receptions.component';
import { ViewCuttingsComponent } from './pages/admin/processes/cutting/process/view-cuttings/view-cuttings.component';
import { AddCuttingsComponent } from './pages/admin/processes/cutting/process/add-cuttings/add-cuttings.component';
import { UpdateCuttingsComponent } from './pages/admin/processes/cutting/process/update-cuttings/update-cuttings.component';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { AddReceptionComponent } from './pages/admin/processes/reception/add-receptions/add-receptions.component';
import { ViewStrawTypesComponent } from './pages/admin/processes/straws/view-straw-types/view-straw-types.component';
import { UpdateStrawTypesComponent } from './pages/admin/processes/straws/update-straw-types/update-straw-types.component';
import { AddStrawTypesComponent } from './pages/admin/processes/straws/add-straw-types/add-straw-types.component';
import { ViewSizingsComponent } from './pages/admin/processes/sizing/view-sizings/view-sizings.component';
import { ViewParametersComponent } from './pages/admin/processes/parameters/view-parameters/view-parameters.component';
import { UpdateParametersComponent } from './pages/admin/processes/parameters/update-parameters/update-parameters.component';
import { AddSizingsComponent } from './pages/admin/processes/sizing/add-sizings/add-sizings.component';
import { UpdateSizingsComponent } from './pages/admin/processes/sizing/update-sizings/update-sizings.component';
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
import { AddSanitatingComponent } from './pages/admin/processes/sanitating/add-sanitating/add-sanitating.component';
import { ViewPendingsComponent } from './pages/user/order/view-pendings/view-pendings.component';
import { ViewCompleteOrdersComponent } from './pages/user/order/view-complete-orders/view-complete-orders.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { CustomPaginatorIntlService } from './services/custom-paginator-intl.service';
import { ChangePasswordComponent } from './pages/profile/change-password/change-password.component';
import { ViewCutTypesComponent } from './pages/admin/processes/cutting/type/view-cut-types/view-cut-types.component';
import { UpdateCutTypesComponent } from './pages/admin/processes/cutting/type/update-cut-types/update-cut-types.component';
import { SublevelMenuComponent } from './components/sidenav/sublevel/sublevel-menu.component';
import { ViewCutProductionComponent } from './pages/admin/processes/cutting/production/view-cut-production/view-cut-production.component';
import { ViewReceptionStatisticsComponent } from './pages/admin/processes/reception/view-reception-statistics/view-reception-statistics.component';
import { LineChartComponent } from './pages/admin/processes/reception/view-reception-statistics/line-chart/line-chart.component';
import { BarChartComponent } from './pages/admin/processes/reception/view-reception-statistics/bar-chart/bar-chart.component';
import { PieChartComponent } from './pages/admin/processes/reception/view-reception-statistics/pie-chart/pie-chart.component';
import { ViewReceptionProductionComponent } from './pages/admin/processes/reception/view-reception-production/view-reception-production.component';
import { PolarAreaChartComponent } from './pages/admin/processes/cutting/graphics/polar-area-chart/polar-area-chart/polar-area-chart.component';
import { ViewCuttingProductionComponent } from './pages/admin/processes/cutting/production/view-cutting-production/view-cutting-production.component';
import { SanitizedComponent } from './pages/user/processes/sanitized/sanitized.component';
import { CleaningToolsComponent } from './pages/user/inventory/cleaning-tools/cleaning-tools.component';
import { SecurityItemComponent } from './pages/user/inventory/security-item/security-item.component';
import { IndexInventoryComponent } from './pages/user/inventory/index-inventory/index-inventory.component';
import { UpdateCleaningToolComponent } from './pages/user/inventory/cleaning-tools/update-cleaning-tool/update-cleaning-tool.component';
import { ViewSanitizedsComponent } from './pages/admin/processes/sanitating/view-sanitizeds/view-sanitizeds.component';
import { SizedComponent } from './pages/user/processes/sized/sized.component';
import { NgApexchartsModule } from 'ng-apexcharts';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    UserDashboardComponent,
    ProfileComponent,
    WelcomeComponent,
    ViewUsersComponent,
    AddUsersComponent,
    UpdateUsersComponent,
    SidenavComponent,
    BodyComponent,
    HeaderComponent,
    UserWelcomeComponent,
    KnotCuttingComponent,
    PackagingComponent,
    ReceptionComponent,
    ViewResponsiblesComponent,
    UpdateResponsiblesComponent,
    AddResponsiblesComponent,
    ViewReceptionsComponent,
    UpdateReceptionsComponent,
    ViewCuttingsComponent,
    AddCuttingsComponent,
    UpdateCuttingsComponent,
    AddReceptionComponent,
    ViewStrawTypesComponent,
    UpdateStrawTypesComponent,
    AddStrawTypesComponent,
    ViewSizingsComponent,
    ViewParametersComponent,
    UpdateParametersComponent,
    AddSizingsComponent,
    UpdateSizingsComponent,
    ViewPackagingsComponent,
    AddPackagingsComponent,
    UpdatePackagingsComponent,
    ViewBoxComponent,
    AddBoxComponent,
    UpdateBoxComponent,
    ViewOrdersComponent,
    AddOrdersComponent,
    UpdateOrdersComponent,
    ViewPendingsComponent,
    ViewCompleteOrdersComponent,
    ChangePasswordComponent,
    ViewCutTypesComponent,
    UpdateCutTypesComponent,
    SublevelMenuComponent,
    ViewCutProductionComponent,
    ViewReceptionStatisticsComponent,
    LineChartComponent,
    BarChartComponent,
    PieChartComponent,
    ViewReceptionProductionComponent,
    PolarAreaChartComponent,
    ViewCuttingProductionComponent,
    SanitizedComponent,
    DryingComponent,
    CleaningToolsComponent,
    SecurityItemComponent,
    IndexInventoryComponent,
    UpdateCleaningToolComponent,
    AddDryingComponent,
    ViewSanitizedsComponent,
    SizedComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatMenuModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatPaginatorModule,
    MatTableModule,
    FormsModule,
    HttpClientModule,
    FlexLayoutModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    OverlayModule,
    CdkMenuModule,
    NgxUiLoaderModule,
    MatMomentDateModule,
    MomentDateModule,
    MatDatepickerModule,
    MatDialogModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    MatProgressBarModule,
    NgApexchartsModule,
    NgxUiLoaderHttpModule.forRoot({
      showForeground: true
    })
  ],
  providers: [authInterceptorProviders,
              {provide: MatPaginatorIntl, useClass: CustomPaginatorIntlService}
            ],
              
  bootstrap: [AppComponent]
})
export class AppModule { }
