import { Component } from '@angular/core';
import { Patient } from '../../../shared/models/patient.model';
import { PatientService } from '../../../core/service/patient-service.service';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-patient-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    RouterLink
  ],
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css']
})
export class PatientListComponent {

  allPatients: Patient[] = [];  
  patients: Patient[] = [];     

  nameFilter = '';
  docFilter = '';

  constructor(private service: PatientService) {}

  ngOnInit(): void {
    this.loadPatients();
  }

  loadPatients(): void {
    this.service.getPatients({ page: 1, pageSize: 9999 })
      .subscribe(response => {
        this.allPatients = response.items;
        this.applyFilters();
      });
  }

  applyFilters(): void {
    this.patients = this.allPatients.filter(p =>
      (this.nameFilter ?
        (p.firstName.toLowerCase().includes(this.nameFilter.toLowerCase()) ||
         p.lastName.toLowerCase().includes(this.nameFilter.toLowerCase()))
        : true)
      &&
      (this.docFilter ?
        p.documentNumber.includes(this.docFilter)
        : true)
    );
  }

  onFilterChange(): void {
    this.applyFilters();
  }

  exportExcel(): void {
    const ws = XLSX.utils.json_to_sheet(this.patients);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Patients');
    const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    saveAs(new Blob([excelBuffer], { type: 'application/octet-stream' }), 'Patients.xlsx');
  }

  deletePatient(id: number): void {
    if (!confirm('Are you sure you want to delete this patient?')) return;

    this.service.deletePatient(id).subscribe(() => this.loadPatients());
  }
}
