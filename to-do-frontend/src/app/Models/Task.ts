export interface Task{
  id: string;
  title: string;
  done: boolean;
}

export interface TaskCreate{
  title: string;
  done: boolean;
}