export class MasterStream {
    constructor() {
        this.actions = {};
    }

    emit(action, data) {
        if (this.actions[action]) {
            this.actions[action].forEach(handler => handler(data));
        }
    }

    subscribe(action, handler) {
        this.actions[action] ||= [];

        this.actions[action].push(handler);

        return {
            unsubscribe: () => {
                this.actions[action] = this.actions[action].filter(h => h !== handler);
            }
        }
    }
}