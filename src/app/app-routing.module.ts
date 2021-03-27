import { ResultsComponent } from './results/results.component';
import { SplashscreenComponent } from './splashscreen/splashscreen.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TestComponent } from './test/test.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Test1Component } from './test1/test1.component';
import { Test2Component } from './test2/test2.component';
import { Test3Component } from './test3/test3.component';
import { ButtonDemoComponent } from './button-demo/button-demo.component';

const routes: Routes = [
  { path: 'splashscreen', component: SplashscreenComponent},
  { path: 'dashboard', component: DashboardComponent},
  { path: 'results', component: ResultsComponent},
  { path: 'test', component: TestComponent},
  { path: 'test1', component: Test1Component},
  { path: 'test2', component: Test2Component},
  { path: 'test3', component: Test3Component},
  { path: 'buttonDemo', component: ButtonDemoComponent},
  { path: '', redirectTo: '/splashscreen', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
