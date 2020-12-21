import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { QuestService } from '../services/quest.service';
import { Quest } from '../models/quest'
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

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
  public userAnswer: string = "";
  public errorAnswer: string = "";
  correct: boolean = true;

  pager = {
    index: 0,
    size: 1,
    count: 1
  };

  constructor(private questService: QuestService, private router: Router) { }

  ngOnInit() {
    this.questName = 'data/quest.json';
    this.mode = 'quest';
    this.loadQuiz(this.questName);
  }

  loadQuiz(questName: string) {
    console.log(questName);
    this.questService.get(questName).subscribe(res => {
      this.quest = new Quest(res);
      this.pager.count = this.quest.questions.length;
    
      this.startTime = new Date();
      this.ellapsedTime = '00:00'; 
      // this.timer = setInterval(() => { this.tick(); }, 1000);
     // this.duration = this.parseTime(this.config.duration);
    });
  }

  get filteredQuestions() {
    console.log(this.pager.index);
    console.log(this.quest.questions.slice(this.pager.index, this.pager.index + this.pager.size));
    return (this.quest.questions) ?
      this.quest.questions.slice(this.pager.index, this.pager.index + this.pager.size) : [];
  }


  goTo(index: number) {
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

/*   tick() {
    const now = new Date();
    const diff = (now.getTime() - this.startTime.getTime()) / 1000;
    if (diff >= this.config.duration) {
      this.onSubmit();
    }
    this.ellapsedTime = this.parseTime(diff);
  } */

  parseTime(totalSeconds: number) {
    let mins: string | number = Math.floor(totalSeconds / 60);
    let secs: string | number = Math.round(totalSeconds % 60);
    mins = (mins < 10 ? '0' : '') + mins;
    secs = (secs < 10 ? '0' : '') + secs;
    return `${mins}:${secs}`;
  }

  onStart(){
    this.mode = 'quest';
  }

  onChange() {
    console.log('changedddddd');
    console.log(this.userAnswer);
    this.correct = true;
  }

  
  onAnswer() {
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

  
  onResults() {
    this.router.navigate(['results']);
  }

}
