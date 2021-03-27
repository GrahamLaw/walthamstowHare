import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-splashscreen',
  templateUrl: './splashscreen.component.html',
  styleUrls: ['./splashscreen.component.scss']
})
export class SplashscreenComponent implements OnInit {
  frmRegister: FormGroup;
  constructor(private router: Router, private fb: FormBuilder) { }

   ngOnInit(): void {
    console.log('splash screen loaded')
    
/*     this.frmRegister = this.fb.group({  
      regName: "",  
      regEmail: "",
      regNumber: ""    
    });   */

    this.frmRegister = this.fb.group({ 
      regName: ['', Validators.required],
      regNumber: ['', Validators.required],
      regEmail: ['', [Validators.required, Validators.email]]      
    });  
  } 

  onClick(){
    console.log('ckeciked here')
    this.router.navigate(['dashboard']);
  }

  SaveTeam(value) {
    console.log('on submit')
    

    if (this.frmRegister.invalid) {
      console.log('NOOOOOOOOOOOOOOOOOOOOOOOOOOOOO');
      return;
    }

    console.log(value);
    this.router.navigate(['dashboard']);
  }

}
