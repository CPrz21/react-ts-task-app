import { useState, useRef } from "react";

type FormElementEvent = React.FormEvent<HTMLFormElement>;

interface ITask {
  name: string;
  done: boolean;
}

function App(): JSX.Element {
  const [newTask, setNewTask] = useState<string>("");
  const [tasks, setTasks] = useState<ITask[]>([]);
  const taskInput = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormElementEvent): void =>{
    e.preventDefault();
    addTask(newTask);
    setNewTask("");
    taskInput.current?.focus();
  }

  const addTask = (name: string): void =>{
    const newTasks: ITask[] = [...tasks, { name, done: false }];
    setTasks(newTasks);
  }

  const toggleStatusTask = (i: number): void =>{
    const newTasks: ITask[] = [...tasks];
    newTasks[i].done = !newTasks[i].done;
    setTasks(newTasks);
  }

  const removeTask = (i: number): void =>{
    const newTasks: ITask[] = [...tasks];
    newTasks.splice(i, 1);
    setTasks(newTasks);
  }

  return (
    <div className="container p-4">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-header">
              <h1 className="text-center">React TS Task App</h1>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  value={newTask}
                  onChange={e => setNewTask(e.target.value)}
                  ref={taskInput}
                  className="form-control"
                  required
                  autoFocus
                />
                <button 
                  className="btn btn-success btn-block mt-2" 
                  disabled={newTask === ""}
                >
                  {newTask === "" ? "Type a task 😊" : "Save ✓"}
                </button>
              </form>
              {tasks.map((t: ITask, i: number) => (
                <div key={i} className="card card-body mt-2">
                  <h2 style={{ textDecoration: t.done ? "line-through" : "" }}>
                    {t.name}
                  </h2>
                  <div>
                    <button
                      onClick={() => toggleStatusTask(i)}
                      className="btn btn-secondary mr-2"
                    >
                      {t.done ? "✓" : "✗"}
                    </button>
                    <button
                      onClick={() => removeTask(i)}
                      className="btn btn-danger"
                    >
                      🗑
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
