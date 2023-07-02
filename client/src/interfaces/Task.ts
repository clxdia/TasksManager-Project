interface Task {
  _id: string;
  title: string;
  desc: string;
  due_date: number;
  tags: string[];
  author: string;
}

export default Task;
