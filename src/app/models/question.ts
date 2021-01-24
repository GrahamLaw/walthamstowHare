
export class Question {
    id: number;
    name: string;
    answer: number;
    hint: string;

    constructor(data: any) {
        data = data || {};
        this.id = data.id;
        this.name = data.name;
        this.answer = data.answer;
        this.hint = data.hint;
    }
}
