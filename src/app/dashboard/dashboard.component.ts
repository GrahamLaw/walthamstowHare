import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
// import { QuestService } from '../services/quest.service';
import { QuestService } from '@/services/quest.service';
import { Quest } from '../models/quest'
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmDialogComponent, ConfirmDialogModel } from '@/shared/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  questName: string;

  startTime: Date;
  ellapsedTime: string;
  timer: any;
  duration: string;
  quest: any;
  mode: string;
  public userAnswer = "";
  public errorAnswer = "";
  correct = true;

  pager = {
    index: 0,
    size: 1,
    count: 1
  };
  result: any;


  constructor(private questService: QuestService, private router: Router, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.questName = 'data/quest.json';
    this.mode = 'quest';
    this.loadQuiz(this.questName)
  }

  loadQuiz(questName: string): void  {
    console.log(questName);
    this.questService.get(questName).subscribe(res => {
      this.quest = new Quest(res);      
      this.pager.count = this.quest.questions.length;
    
      this.startTime = new Date();
      this.ellapsedTime = '00:00:00'; 
      this.timer = setInterval(() => { this.tick(); }, 1000);
     // this.duration = this.parseTime(this.config.duration);
    });
  }

  get filteredQuestions(): void  {
    console.log(this.pager.index);
    console.log(this.quest.questions.slice(this.pager.index, this.pager.index + this.pager.size));
    return (this.quest.questions) ?
      this.quest.questions.slice(this.pager.index, this.pager.index + this.pager.size) : [];
  }


  goTo(index: number): void  {
    console.log('index');
    console.log(index);

    if (index >= 0 && index < this.pager.count) {
      this.pager.index = index;
      console.log('index call');
    } else {
      console.log('end of questions');
      this.mode = "results"
    }
    console.log(this.pager.index);
  }

  tick() : void {
    const now = new Date();
    const diff = (now.getTime() - this.startTime.getTime()) / 1000;
/*     if (diff >= this.config.duration) {
      this.onSubmit();
    } */
    this.ellapsedTime = this.parseTime(diff);
    console.log(this.ellapsedTime);
  } 

  parseTime(totalSeconds: number): string {
    let hours: string | number = Math.floor(totalSeconds / (60*60));
    let mins: string | number = Math.floor(totalSeconds / 60);
    let secs: string | number = Math.round(totalSeconds % 60);
    hours = (hours < 10 ? '0' : '') + hours;
    mins = (mins < 10 ? '0' : '') + mins;
    secs = (secs < 10 ? '0' : '') + secs;    
    return `${hours}:${mins}:${secs}`;
  }

  onStart(): void {
    this.mode = 'quest';
  }

  onChange(): void  {
    console.log('changedddddd');
    console.log(this.userAnswer);
    this.correct = true;
  }

  
  onAnswer(): void  {
    console.log(this.userAnswer);
    console.log(this.filteredQuestions[0].answer);
    if (this.userAnswer == this.filteredQuestions[0].answer)
    {
      this.correct = true;
      this.userAnswer = null;
      this.goTo(this.pager.index + 1);
    }
    else 
    {
      this.errorAnswer = this.userAnswer
      console.log(this.errorAnswer);
      this.correct = false;
    }
  }

  
  onResults(): void  {
    this.router.navigate(['results']);
  }

  hintClick(): void  {
    console.log("hint click");

    this.confirmDialog();
/*     let dialogRef = dialog.open(YourDialog, {
      data: { name: 'austin' },
    }); */
  }

  confirmDialog(): void {
    
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "600px",
      data: new ConfirmDialogModel("Confirm Action", `Are you sure you want to do this?`)
    });
 
    dialogRef.afterClosed().subscribe(dialogResult => {
      this.result = dialogResult;
    });


    /* this.questService.get(questName).subscribe(res => {
      this.quest = new Quest(res);   
    } */
  }

}
