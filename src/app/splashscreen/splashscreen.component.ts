import { PlayersService } from './../services/players-service/players-service.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { Router } from '@angular/router';
import { PlayersModel } from '@/models/players';

@Component({
  selector: 'app-splashscreen',
  templateUrl: './splashscreen.component.html',
  styleUrls: ['./splashscreen.component.scss']
})
export class SplashscreenComponent implements OnInit {
  frmRegister: FormGroup;
// public playerModel: PlayersModel = new PlayersModel();

  constructor(private router: Router, private fb: FormBuilder, private playersService: PlayersService) { }

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

    let  playerModel = new PlayersModel({
      teamName: "rin",
      email: "string",
      players: 2
    });

    let playerModelx = new PlayersModel(this.frmRegister.value);


    this.playersService.save("").subscribe(res => {
     // this.quest = new Quest(res);    
     console.log(res);  
    });

    console.log(value);
    this.router.navigate(['dashboard']);
  }



}
