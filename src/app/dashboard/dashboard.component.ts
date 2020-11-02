import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { QuestService } from '../services/quest.service';
import { Quest } from '../models/quest'
import { FormsModule } from '@angular/forms';

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
  public userAnswer: string;
  correct: boolean = true;

  pager = {
    index: 0,
    size: 1,
    count: 1
  };

  constructor(private questService: QuestService) { }

  ngOnInit() {
    this.questName = 'data/quest.json';
    this.mode = 'start';
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

  onSubmit() {
    let answers = [];
    // this.quest.questions.forEach(x => answers.push({ 'quizId': this.quiz.id, 'questionId': x.id, 'answered': x.answered }));

    // Post your data to the server here. answers contains the questionId and the users' answer.
    console.log(this.quest.questions);
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
      this.correct = false;
    }
  }

}
