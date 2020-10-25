import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { BeneficiaryAddComponent } from './store/beneficiary-add/beneficiary-add.component';
import { BeneficiaryService } from './_services/beneficiary.service';
import { BeneficiaryListComponent } from './store/beneficiary-list/beneficiary-list.component';
import { UpdateStoreComponent } from './store/update-store/update-store.component';
import { BeneficiaryUpdateComponent } from './store/beneficiary-update/beneficiary-update.component';
import { BeneficiarySearchComponent } from './store/beneficiary-search/beneficiary-search.component';
import { BeneficiaryDeleteComponent } from './store/beneficiary-delete/beneficiary-delete.component';
import { BeneficiaryDistributeComponent } from './store/beneficiary-distribute/beneficiary-distribute.component';
import { AddShopComponent } from './admin/add-shop/add-shop.component';
import { ShopDeleteComponent } from './admin/shop-delete/shop-delete.component';
import { ShopDistributeComponent } from './admin/shop-distribute/shop-distribute.component';
import { ShopListComponent } from './admin/shop-list/shop-list.component';
import { ShopService } from './_services/shop.service';
import { AddUserComponent } from './admin/add-user/add-user.component';
import { UpdateUserComponent } from './admin/update-user/update-user.component';
import { StoreComponent } from './store/store.component';
import { StatsComponent } from './stats/stats.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'stats', component: StatsComponent },

  { path: 'shop', component: StoreComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  { path: 'shop/beneficiary/add', component: BeneficiaryAddComponent },
  { path: 'shop/beneficiary/list', component: BeneficiaryListComponent },
  { path: 'shop/beneficiary/search', component: BeneficiarySearchComponent },
  { path: 'shop/beneficiary/update/:id', component: BeneficiaryUpdateComponent },
  { path: 'shop/beneficiary/delete/:id', component: BeneficiaryDeleteComponent },
  { path: 'shop/beneficiary/distribute/:id', component: BeneficiaryDistributeComponent },

  { path: 'admin/shop/update/:id', component: UpdateStoreComponent },
  { path: 'admin/shop/add', component: AddShopComponent },
  { path: 'admin/shop/delete/:id', component: ShopDeleteComponent },
  { path: 'admin/shop/distribute/:id', component: ShopDistributeComponent },
  { path: 'admin/shop/list', component: ShopListComponent },
  { path: 'admin/shop/search', component: ShopService },

  { path: 'admin/user/add', component: AddUserComponent },
  { path: 'admin/user/update/:id', component: UpdateUserComponent }



];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
