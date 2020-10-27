
export class Question {
    id: number;
    name: string;
    answer: number;

    constructor(data: any) {
        data = data || {};
        this.id = data.id;
        this.name = data.name;
    }
}
