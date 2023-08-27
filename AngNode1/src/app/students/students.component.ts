import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { DialogRef } from '@angular/cdk/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StudServicesService } from '../services/stud-services.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css'],
})
export class StudentsComponent {
  constructor(
    private dialogref: DialogRef,
    private service2: StudServicesService,
    @Inject(MAT_DIALOG_DATA) public row: any
  ) {
    if (row) {
      this.studForm.controls['roll'].setValue(row.roll);
      this.studForm.controls['name'].setValue(row.name);
      this.studForm.controls['email'].setValue(row.email);
      this.studForm.controls['city'].setValue(row.city);
      this.studForm.controls['skills'].setValue(row.skills);
      this.studForm.controls['department'].setValue(row.department);
    }
  }
  studForm = new FormGroup({
    roll: new FormControl(''),
    name: new FormControl(''),
    email: new FormControl(''),
    city: new FormControl(''),
    skills: new FormControl(''),
    department: new FormControl(''),
  });
  departments = ['CSE', 'ENTC', 'ELEC', 'CIVIL', 'MECH'];

  addStud() {
    if (this.studForm.valid) {
      if (this.row) {
        this.service2
          .editStudService(this.row._id, this.studForm.value)
          .subscribe({
            next: (val: any) => {
              alert('Item Edited Successfully');
              this.studForm.reset();
              this.dialogref.close();
            },
            error(err: any) {
              alert('Error: ' + err);
            },
          });
      } else {
        this.service2.addStudService(this.studForm.value).subscribe({
          next: (val: any) => {
            alert('Item added successfully');
            this.studForm.reset();
            this.dialogref.close();
          },
          error(err: any) {
            alert('Error: ' + err);
          },
        });
      }
    }
  }
}
