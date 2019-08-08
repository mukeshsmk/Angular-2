import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from '../services/notification.service';
import { invalid } from '@angular/compiler/src/render3/view/util';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  myForm: FormGroup;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  constructor(private fb: FormBuilder, private notifyService : NotificationService) { }

  ngOnInit() {
        this.myForm = this.fb.group(
        {
          username: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
          email: ['', Validators.compose([Validators.required,Validators.pattern(this.emailPattern)])],
          pwd: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
          address: ['', Validators.compose([Validators.required])],
        },
      );
  }

  onSubmit(){
   if(this.myForm.valid){
    this.notifyService.showSuccessWithTimeout("Registered successfully", "Submit Form", 3000)
    console.log("values", this.myForm.value);
   }
  }
}
