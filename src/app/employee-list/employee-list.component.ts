import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { CommonServices } from '../Common/CommonServices';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-employee-list',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent {

  EmployeeList :any=[];
  isEditAvaialble :boolean=false;
  EmployeeForm !: FormGroup;
  Id :any;
  constructor(private fb: FormBuilder, private router: Router, private service: CommonServices) {

  
  };

  ngOnInit(): void {
    this.GetEmployeeList();
    this.EmployeeForm = this.fb.group({
      id: [null], // Optional field (could be hidden)
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });

  }

  /// List of Employee
  GetEmployeeList() 
  {
  
    var pageUrl = "api/Employee/GetEmployeeList";
    this.service.GetRequest(pageUrl).subscribe(item => {
      this.EmployeeList = item.dataModel.employeeList;
    })

  }
/// On Edit Fetch Data based on Id
  onEdit(id: any): void {
    this.isEditAvaialble = true; // Show the edit form
  
    const pageUrl = 'api/Employee/GetEmployeeDetails';
    this.service.GetRequestById(id, pageUrl).subscribe(
      (item) => {
        const employeedetail = item.dataModel.employeeDetails;
  
        // Ensure the data exists before patching the form
        if (employeedetail) {
          this.EmployeeForm.patchValue({
            id: employeedetail.id,
            firstName: employeedetail.firstName,
            lastName: employeedetail.lastName,
            email: employeedetail.email,
          });
        }
      },
      (error) => {
        console.error('Failed', error);
      }
    );
  }
  
  




  UpdateEmployee()
  {
    if (this.EmployeeForm.valid) {
      var pageUrl = "api/Employee/AddOrUpdateActivity";
      this.service.PostRequest(this.EmployeeForm.value, pageUrl).subscribe(item => {
        alert(item.dataModel.sucessMessage);
        window.location.reload();
      })

  };
}




  onDelete( id: any)
  {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you really want to delete this Employee?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        // Call the delete API if confirmed
        const pageUrl = 'api/Employee/DeleteEmployee';
        this.service.Delete(id, pageUrl).subscribe(
          (item) => {
            // Show success message on successful deletion
            Swal.fire('Deleted!', item.dataModel.sucessMessage, 'success').then(() => {
              // Reload the page after success
              window.location.reload();
            });
          },
          (error) => {
            // Handle error
            Swal.fire('Error', 'Failed', 'error');
          }
        );
      }
    });
  
  }
  


}
