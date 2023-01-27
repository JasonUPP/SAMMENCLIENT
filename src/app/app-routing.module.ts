import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginFormComponent, ResetPasswordFormComponent, CreateAccountFormComponent, ChangePasswordFormComponent } from './shared/components';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { TasksComponent } from './pages/tasks/tasks.component';
import { DxButtonModule, DxDataGridModule, DxFormModule } from 'devextreme-angular';
import { AuthGuardService } from './security/auth.guard';
import { HerramientaComponent } from './pages/Operativo/herramienta/herramienta.component';
import { MedidaHerramientaComponent } from './pages/Operativo/medida-herramienta/medida-herramienta.component';
import { HistorialHerramientaComponent } from './pages/Operativo/historial-herramienta/historial-herramienta.component';
import { OperadorComponent } from './pages/Operativo/operador/operador.component';
import { UbicacionComponent } from './pages/Operativo/ubicacion/ubicacion.component';

const routes: Routes = [
  {
    path: 'tasks',
    component: TasksComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'login-form',
    component: LoginFormComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'reset-password',
    component: ResetPasswordFormComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'create-account',
    component: CreateAccountFormComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'change-password/:recoveryCode',
    component: ChangePasswordFormComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'Operativo/Herramienta',
    component: HerramientaComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'Operativo/MedidaHerramienta',
    component: MedidaHerramientaComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'Operativo/HistorialHerramienta',
    component: HistorialHerramientaComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'Operativo/Operador',
    component: OperadorComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'Operativo/Ubicacion',
    component: UbicacionComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: '**',
    redirectTo: 'home'
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true }), DxDataGridModule, DxFormModule, DxButtonModule],
  providers: [AuthGuardService],
  exports: [RouterModule],
  declarations: [
    HomeComponent,
    ProfileComponent,
    TasksComponent,
    HerramientaComponent,
    MedidaHerramientaComponent,
    HistorialHerramientaComponent,
    OperadorComponent,
    UbicacionComponent
  ]
})
export class AppRoutingModule { }
