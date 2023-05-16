import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ForbiddenNameValidator } from '../custom-validations/userName.validator';
import { ConfirmPasswordValidator } from '../custom-validations/confirmPassword.validator';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

// export class RegisterComponent implements OnInit {
//   registerForm!: FormGroup;

//   constructor(private formBuilder: FormBuilder) { }

//   ngOnInit() {
//     this.registerForm = this.formBuilder.group({
//       name: ['', Validators.required],
//       email: ['', [Validators.required, Validators.email]],
//       password: ['', [Validators.required, Validators.minLength(6)]]
//     });
//   }

//   onSubmit() {
//     // Logic to register the user
//   }
// }



export class RegisterComponent implements OnInit {

  constructor(private fb:FormBuilder) { }
  registerationForm=this.fb.group({
    userName:['',[Validators.required,Validators.minLength(5),ForbiddenNameValidator]],
    password:[''],
    confirmPassword :[''],
    email:[''],
    subscribe:[false],
    alternativeEmails:this.fb.array([]),
    address:this.fb.group({
      state:[''],
      city:[''],
      postalCode:['']
    })
  },{validator:[ConfirmPasswordValidator]})

  get userName()
  {
    return this.registerationForm.get('userName');
  }

  get email()
  {
    return this.registerationForm.get('email');
  }

  get alternativeEmails(){
    return this.registerationForm.get('alternativeEmails') as FormArray;
  }

  addNewEmail()
  {
    this.alternativeEmails.push(this.fb.control(''));
  }

  ngOnInit(): void {
  }

  loadData()
  {
    this.registerationForm.patchValue({
      userName:'Roma',
      address:{
        state:'England',
        city:'London',
        postalCode:'2101547991'
      }
    })
  }

  setEmailValidator()
  {
    this.registerationForm.get('subscribe')?.valueChanges.subscribe(checkedValue=>{
      if(checkedValue)
      {
        this.email?.setValidators(Validators.required);
      }
      else
      {
        this.email?.clearValidators();
      }
      this.email?.updateValueAndValidity();
    })
  }

}

  