
export class PlayersModel {
    teamName: string;
    email: string;
    players: number;

    constructor(data: any) {
        Object.assign(this, data);
    }
}