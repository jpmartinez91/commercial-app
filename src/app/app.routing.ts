import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from "./home/home.component";
import { FormComponent } from "./form/form.component";
import { ProductsComponent } from "./products/products.component";

const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent },
    { path: 'forms', component: FormComponent },
    { path: 'products', component: ProductsComponent }
];

export const Routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);