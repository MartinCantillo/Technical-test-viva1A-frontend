import { Component } from '@angular/core';
import { Patient } from '../../../shared/models/patient.model';
import { PatientService } from '../../../core/service/patient-service.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-patient-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './patient-detail.component.html',
  styleUrl: './patient-detail.component.css'
})
export class PatientDetailComponent {
 patient?: Patient;

  constructor(private service: PatientService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.service.getPatient(id).subscribe(p => this.patient = p);
  }
}