import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { DialogRef } from '@angular/cdk/dialog';
import { Item1serviceService } from '../services/item1service.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-item1',
  templateUrl: './item1.component.html',
  styleUrls: ['./item1.component.css'],
})
export class Item1Component {
  constructor(
    private dialogref: DialogRef,
    private service: Item1serviceService,
    @Inject(MAT_DIALOG_DATA) public row: any
  ) {
    if (row) {
      this.item1Form.controls['name'].setValue(row.name);
      this.item1Form.controls['description'].setValue(row.description);
    }
  }

  item1Form = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
  });

  addItem1() {
    if (this.item1Form.valid) {
      if (this.row) {
        this.service
          .editItem1Service(this.row._id, this.item1Form.value)
          .subscribe({
            next: (val: any) => {
              alert('Item Edited Successfully');
              this.item1Form.reset();
              this.dialogref.close();
            },
            error(err: any) {
              alert('Error: ' + err);
            },
          });
      } else {
        this.service.addItem1Service(this.item1Form.value).subscribe({
          next: (val: any) => {
            alert('Item added successfully');
            this.item1Form.reset();
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
