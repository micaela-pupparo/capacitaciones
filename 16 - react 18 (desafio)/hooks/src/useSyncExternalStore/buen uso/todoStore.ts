type Listener = () => void;

interface Todo {
  id: number;
  text: string;
}

let nextId = 0;
let todos: Todo[] = [{ id: nextId++, text: "Todo #1" }];
let listeners: Listener[] = [];

export const todosStore = {
  addTodo() {
    todos = [...todos, { id: nextId++, text: "Todo #" + nextId }];
    emitChange();
  },
  subscribe(listener: Listener): () => void {
    listeners = [...listeners, listener];
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  },
  getSnapshot(): Todo[] {
    return todos;
  },
};

function emitChange(): void {
  for (const listener of listeners) {
    listener();
  }
}
