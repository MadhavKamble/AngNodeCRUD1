import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Item1Component } from './item1/item1.component';
import { StudentsComponent } from './students/students.component';
import { Item1serviceService } from './services/item1service.service';
import { StudServicesService } from './services/stud-services.service';

interface Item1 {
  _id: String;
  name: String;
  description: String;
}

interface Students {
  _id: String;
  roll: Number;
  name: String;
  email: String;
  city: String;
  department: String;
  skills: String;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'AngNode1';

  constructor(
    public dialog: MatDialog,
    private service: Item1serviceService,
    private service2: StudServicesService
  ) {
    this.getItem1List();
    this.getStudList();
  }
  
  //Student Functions

  stud1: Students[] = [];

  openDialogStud() {
    var popup = this.dialog.open(StudentsComponent);
    popup.afterClosed().subscribe({
      next: (val: any) => {
        this.getStudList();
      },
    });
    this.getStudList();
  }
  getStudList() {
    this.service2.getStudService().subscribe({
      next: (val: any) => {
        this.stud1 = [];
        this.stud1 = val;
      },
      error: (err: any) => {
        console.warn(err);
      },
    });
  }
  deleteStud(id: String) {
    console.log(id);
    this.service2.deleteStudService(id).subscribe({
      next: (val: any) => {
        console.log(val);
        alert('Item Deleted Successfully !!');
        this.getStudList();
      },
      error(err: any) {
        alert('Error: ' + err);
      },
    });
  }

  editStud(row: any) {
    var popup = this.dialog.open(StudentsComponent, { data: row });
    popup.afterClosed().subscribe({
      next: (val: any) => {
        this.getStudList();
      },
      error: (err: any) => {
        alert('Error: ' + err);
      },
    });
  }

  //Item Functions
  item1: Item1[] = [];
  openDialog() {
    var popup = this.dialog.open(Item1Component);
    popup.afterClosed().subscribe({
      next: (val: any) => {
        this.getItem1List();
      },
    });
    this.getItem1List();
  }

  getItem1List() {
    this.service.getItem1Service().subscribe({
      next: (val: any) => {
        this.item1 = [];
        this.item1 = val;
      },
      error: (err: any) => {
        console.warn(err);
      },
    });
  }
  deleteItem1(id: String) {
    console.log(id);
    this.service.deleteItem1Service(id).subscribe({
      next: (val: any) => {
        console.log(val);
        alert('Item Deleted Successfully !!');
        this.getItem1List();
      },
      error(err: any) {
        alert('Error: ' + err);
      },
    });
  }

  editItem1(row: any) {
    var popup = this.dialog.open(Item1Component, { data: row });
    popup.afterClosed().subscribe({
      next: (val: any) => {
        this.getItem1List();
      },
      error: (err: any) => {
        alert('Error: ' + err);
      },
    });
  }
}
