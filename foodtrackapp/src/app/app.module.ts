import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';

import { authInterceptorProviders } from './_helper/auth.interceptor';
import { AdminComponent } from './admin/admin.component';
import { StoreComponent } from './store/store.component';
import { BeneficiaryListComponent } from './store/beneficiary-list/beneficiary-list.component';
import { BeneficiaryAddComponent } from './store/beneficiary-add/beneficiary-add.component';
import { BeneficiaryDistributeComponent } from './store/beneficiary-distribute/beneficiary-distribute.component';
import { BeneficiaryUpdateComponent } from './store/beneficiary-update/beneficiary-update.component';
import { BeneficiarySearchComponent } from './store/beneficiary-search/beneficiary-search.component';
import { BeneficiaryDeleteComponent } from './store/beneficiary-delete/beneficiary-delete.component';
import { UpdateStoreComponent } from './store/update-store/update-store.component';
import { AddUserComponent } from './admin/add-user/add-user.component';
import { UpdateUserComponent } from './admin/update-user/update-user.component';
import { AddShopComponent } from './admin/add-shop/add-shop.component';
import { ShopListComponent } from './admin/shop-list/shop-list.component';
import { ShopSearchComponent } from './admin/shop-search/shop-search.component';
import { ShopDeleteComponent } from './admin/shop-delete/shop-delete.component';
import { ShopDistributeComponent } from './admin/shop-distribute/shop-distribute.component';
import { StatsComponent } from './stats/stats.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    AdminComponent,
    StoreComponent,
    BeneficiaryListComponent,
    BeneficiaryAddComponent,
    BeneficiaryDistributeComponent,
    BeneficiaryUpdateComponent,
    BeneficiarySearchComponent,
    BeneficiaryDeleteComponent,
    UpdateStoreComponent,
    AddUserComponent,
    UpdateUserComponent,
    AddShopComponent,
    ShopListComponent,
    ShopSearchComponent,
    ShopDeleteComponent,
    ShopDistributeComponent,
    StatsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
