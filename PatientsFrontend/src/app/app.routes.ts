import { Routes } from '@angular/router';
import { PatientListComponent } from './patient/components/patient-list/patient-list.component';
import { PatientFormComponent } from './patient/components/patient-form/patient-form.component';
import { PatientDetailComponent } from './patient/components/patient-detail/patient-detail.component';

export const routes: Routes = [
     { path: 'list', component: PatientListComponent },
  { path: 'create', component: PatientFormComponent },
  { path: 'edit/:id', component: PatientFormComponent },
  { path: '', component: PatientListComponent }
];
