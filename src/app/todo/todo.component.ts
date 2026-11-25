import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { UuidService } from '../services/uuid.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar'
import { SnackbarService } from '../services/snackbar.service';



interface Itodo {
  todoItem: string;
  todoId: string;
  isCompleted: boolean;
}

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent {
  @Input() parentdata!: string;
  todoArr: Array<Itodo> = [
    {
      todoItem: 'js',
      todoId: '1234',
      isCompleted: false,
    },
    {
      todoItem: 'Ng',
      todoId: '1235',
      isCompleted: true,
    },
    {
      todoItem: 'Node',
      todoId: '1236',
      isCompleted: true,
    },
  ]
  isEditMode: boolean = false;
  isEditId: string = '';
  @ViewChild('toItemRef') toItem!: ElementRef;
  @ViewChild('isCompletedRef') isCompleted!: ElementRef;

  constructor(private _uuidService: UuidService,
    private _snackBarService: MatSnackBar,
    private _snackbarService: SnackbarService) {
    let storeData = localStorage.getItem('todoArr');
    if (storeData) {
      this.todoArr = JSON.parse(storeData);
    } else {
      localStorage.setItem('todoArr', JSON.stringify(this.todoArr));
    }
  }
  onAddtodo() {
    let todo: Itodo = {
      todoItem: this.toItem.nativeElement.value,
      todoId: this._uuidService.generateUUID(),
      isCompleted: this.isCompleted.nativeElement.value == 'yes',
    }
    this.todoArr.unshift(todo);
    localStorage.setItem('todoArr', JSON.stringify(this.todoArr));
    this.toItem.nativeElement.value = '';
    this.isCompleted.nativeElement.value = 'yes';
    //  this._snackBarService.open("To do items added successfully", "Close", {duration: 3000});
    this._snackbarService.snackbar(`To do items with id ${todo.todoId} added successfully`, "OK");
  }
  onEdit(todo: Itodo) {
    this.isEditId = todo.todoId;
    this.toItem.nativeElement.value = todo.todoItem;
    this.isCompleted.nativeElement.value = todo.isCompleted ? 'yes' : 'no';
    this.isEditMode = true;
  }
  onUpdatetodo() {
    let updateTodo: Itodo = {
      todoItem: this.toItem.nativeElement.value,
      todoId: this.isEditId,
      isCompleted: this.isCompleted.nativeElement.value == 'yes'
    }
    let getIndex = this.todoArr.findIndex(todo => todo.todoId === this.isEditId);
    this.todoArr[getIndex] = updateTodo;
    localStorage.setItem('todoArr', JSON.stringify(this.todoArr));
    this.isEditMode = false;
    this.isEditId = '';
    this.toItem.nativeElement.value = '';
    this.isCompleted.nativeElement.value = 'yes'
    this._snackbarService.snackbar('toItem updated successfully!!');
  }
  onRemove(todoId: string) {
    let isConform = confirm('Are you sure you want to delete this todoItem?');
    if (isConform) {
      let getIndex = this.todoArr.findIndex(todo => todo.todoId == todoId);
      if (getIndex !== -1) {
        this.todoArr.splice(getIndex, 1);
        localStorage.setItem('todoArr', JSON.stringify(this.todoArr));
        this._snackbarService.snackbar("Todo items deleted successfully");
      }
    } else {
      this._snackbarService.snackbar('Todo item is not deleted!!!')
    }

  }
  onchange(todo: Itodo) {
    todo.isCompleted = !todo.isCompleted;
  }
}
