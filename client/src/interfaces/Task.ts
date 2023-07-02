interface Task {
  _id: string;
  title: string;
  desc: string;
  due_date: number;
  tags: string[];
  author: string;
  completed: boolean;
}

export default Task;
