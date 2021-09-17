import { NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HeaderComponent } from './home/header/header.component';
import { HomeComponent } from './home/home.component'
import { LoginComponent } from './home/login/login.component';
import { AdminComponent } from './admin/admin.component';
import { BuilderComponent } from './builder/builder.component';
import { ArchitectComponent } from './architect/architect.component';


const appRoutes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: HomeComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'builder', component: BuilderComponent },
  { path: 'architect', component: ArchitectComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    LoginComponent,
    AdminComponent,
    BuilderComponent,
    ArchitectComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }