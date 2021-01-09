import { Question } from './question';

export class Quest {
    id: number;
    name: string;
    description: string;
    questions: Question[];
    hintCount: number;

    constructor(data: any) {
        if (data) {
            this.id = data.id;
            this.name = data.name;
            this.description = data.description;
            this.hintCount = data.hintCount;
            this.questions = [];
            data.questions.forEach(q => {
                this.questions.push(new Question(q));
            });
        }
    }
}
