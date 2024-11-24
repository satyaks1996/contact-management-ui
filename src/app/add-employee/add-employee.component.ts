import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonServices } from '../Common/CommonServices';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-employee',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.css'
})
export class AddEmployeeComponent  implements OnInit  {
  EmployeeForm!: FormGroup;

  constructor(private fb: FormBuilder, private service: CommonServices) {}

  ngOnInit(): void {
    // Initialize the form with validation
    this.EmployeeForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  // Getter for easier access to form controls
  get f() {
    return this.EmployeeForm.controls;
  }

  onSubmit(): void {
    if (this.EmployeeForm.valid) {
      const employeeData = this.EmployeeForm.value;

      const pageUrl = 'api/Employee/AddOrUpdateActivity';
      this.service.PostRequest(employeeData, pageUrl).subscribe(
        (response) => {
          Swal.fire('Success', response.dataModel.sucessMessage, 'success').then(() => {
            this.EmployeeForm.reset(); // Reset the form after success
          });
        },
        (error) => {
          Swal.fire('Error', 'Failed to add employee!', 'error');
        }
      );
    } else {
      // Show validation error if the form is invalid
      Swal.fire('Validation Error', 'Please correct the Validation First!', 'warning');
    }
  }

}