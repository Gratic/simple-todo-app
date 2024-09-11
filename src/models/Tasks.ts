
export class Task {
    private constructor(public id: number, public title: string, public content: string) {
    }

    static current_id: number = 0;

    static Create_Task(title: string, content: string) {
        this.current_id++;
        return new Task(this.current_id, title, content);
    }
}
