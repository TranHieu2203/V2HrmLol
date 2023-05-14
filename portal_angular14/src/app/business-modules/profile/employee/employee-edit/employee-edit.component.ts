import { Component, OnInit } from '@angular/core';
import { UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { DialogService } from 'src/app/services/dialog.service';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css']
})
export class EmployeeEditComponent implements OnInit {

  employeeForm: FormGroup;

  constructor(private fb: FormBuilder, private dialogService: DialogService) { 
    this.employeeForm = this.fb.group({
      employee_id: [0, [Validators.required, Validators.min(1)]],
      employee_fullname: ['', Validators.required]
    });


  }

  ngOnInit(): void {
  }

  canDeactivate(): Observable<boolean | UrlTree> | boolean {

    if (this.employeeForm.dirty) {
        return this.dialogService.confirm('Discard changes for the employee?');
    }
    return true;
}	

}
