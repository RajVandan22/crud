import { Component, ElementRef, ViewChild } from '@angular/core';
import { Istudent } from '../model/student.model';
import { UuidService } from '../services/uuid.service';
import { SnackbarService } from '../services/snackbar.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent {
  studentArr: Array<Istudent> = [
    {
      id: '1',
      name: "Rahul",
      email: "rahul@gmail.com",
      age: 22,
      course: "Angular",
      city: "Mumbai",
      isActive: true
    },
    {
      id: '2',
      name: "Priya",
      email: "priya@gmail.com",
      age: 21,
      course: "JavaScript",
      city: "Pune",
      isActive: true
    },
    {
      id: '3',
      name: "Amit",
      email: "amit@gmail.com",
      age: 23,
      course: "Node.js",
      city: "Nashik",
      isActive: false
    },
    {
      id: '4',
      name: "Sneha",
      email: "sneha@gmail.com",
      age: 20,
      course: "React",
      city: "Thane",
      isActive: true
    },
    {
      id: '5',
      name: "Karan",
      email: "karan@gmail.com",
      age: 24,
      course: "TypeScript",
      city: "Nagpur",
      isActive: false
    }
  ];
  @ViewChild('fname') fname!: ElementRef<HTMLInputElement>
  @ViewChild('email') email!: ElementRef<HTMLInputElement>
  @ViewChild('age') age!: ElementRef<HTMLInputElement>
  @ViewChild('city') city!: ElementRef<HTMLInputElement>
  @ViewChild('course') course!: ElementRef<HTMLInputElement>
  @ViewChild('isActive') isActive!: ElementRef<HTMLInputElement>
  isEditmode: boolean = false;
  isEditId: string = '';
  constructor(private _uuidService: UuidService,
    private _snackBarService: SnackbarService
  ) {
    let getStudentArray = localStorage.getItem('studentArr');
    if (getStudentArray) {
      this.studentArr = JSON.parse(getStudentArray);
    } else {
      localStorage.setItem('studentArr', JSON.stringify(this.studentArr));
    }
  }
  addTodo() {
    let studentObj: Istudent = {
      id: this._uuidService.generateUUID(),
      name: this.fname.nativeElement.value,
      email: this.email.nativeElement.value,
      age: +this.age.nativeElement.value,
      course: this.course.nativeElement.value,
      city: this.city.nativeElement.value,
      isActive: this.isActive.nativeElement.value == "yes"
    }
    this.studentArr.unshift(studentObj);
    localStorage.setItem('studentArr', JSON.stringify(this.studentArr));
    this._snackBarService.snackbar('Student data added successfully!!');
    this.fname.nativeElement.value = ''
    this.email.nativeElement.value = ''
    this.age.nativeElement.value = ''
    this.course.nativeElement.value = ''
    this.city.nativeElement.value = ''
    this.isActive.nativeElement.value == 'Yes'
  }
  onEdit(stu: Istudent) {
    this.isEditId = stu.id;
    this.fname.nativeElement.value = stu.name;
    this.email.nativeElement.value = stu.email;
    this.age.nativeElement.value = String(stu.age);
    this.course.nativeElement.value = stu.course;
    this.city.nativeElement.value = stu.city;
    this.isActive.nativeElement.value = stu.isActive ? 'yes' : 'no'
    this.isEditmode = true;
  }
  onUpdate() {
    let updateObj = {
      name: this.fname.nativeElement.value,
      email: this.email.nativeElement.value,
      age: +this.age.nativeElement.value,
      course: this.course.nativeElement.value,
      city: this.city.nativeElement.value,
      isActive: this.isActive.nativeElement.value == "yes",
      id: this.isEditId
    }
    let getIndex = this.studentArr.findIndex(stu => stu.id === this.isEditId);
    this.studentArr[getIndex] = updateObj
    localStorage.setItem('studentArr', JSON.stringify(this.studentArr));
    this.isEditmode = false;
    this.isEditId = '';
    this.fname.nativeElement.value = ''
    this.email.nativeElement.value = ''
    this.age.nativeElement.value = ''
    this.course.nativeElement.value = ''
    this.city.nativeElement.value = ''
    this.isActive.nativeElement.value == 'Yes'
    this._snackBarService.snackbar('Student data updated successfully!!');
  }
  onRemove(id: string) {
    let isConform = confirm('Are you sure you want to delete this student record?');
    if (isConform) {
      let getIndex = this.studentArr.findIndex(stu => stu.id === id);
      if (getIndex !== -1) {
        this.studentArr.splice(getIndex, 1);
        localStorage.setItem('studentArr', JSON.stringify(this.studentArr));
        this._snackBarService.snackbar('Student data deleted successfully!!');
      }
    }
    else {
      this._snackBarService.snackbar('Student data not deleted!!!');

    }

  }
}
