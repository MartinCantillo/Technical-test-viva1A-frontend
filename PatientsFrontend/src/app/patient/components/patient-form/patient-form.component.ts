import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientService } from '../../../core/service/patient-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-patient-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './patient-form.component.html',
  styleUrls: ['./patient-form.component.css']
})
export class PatientFormComponent {

  form!: FormGroup;
  patientId: number | null = null;
  title: string = "Registrar Paciente";

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private service: PatientService
  ) {}

  ngOnInit(): void {
    this.patientId = Number(this.route.snapshot.paramMap.get('id'));

    this.form = this.fb.group({
      documentType: ['', Validators.required],
      documentNumber: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      birthDate: ['', Validators.required],
      phoneNumber: [''],
      email: ['', Validators.email]
    });

    if (this.patientId) {
      this.title = "Editar Información";
      this.loadPatient();
    }
  }

  loadPatient() {
    this.service.getPatient(this.patientId!).subscribe(p => {
      this.form.patchValue(p);
    });
  }

  save() {
    if (this.form.invalid) return;

    const data = this.form.value;

    if (this.patientId) {
      
      this.service.updatePatient(this.patientId, data).subscribe(() => {
        alert("Paciente actualizado correctamente");
        this.router.navigate(['/list']);
      });

    } else {
      
      this.service.createPatient(data).subscribe(() => {
        alert("Paciente registrado correctamente");
        this.router.navigate(['/list']);
      });
    }
  }
}
