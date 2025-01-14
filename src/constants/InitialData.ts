import { Columns } from "../types/KanBan";

  // Data for app
  export const initialColumns: Columns = {
    todo: {
      id: 'todo',
      title: 'To Do',
      taskIds: []
    },
    inProgress: {
      id: 'inProgress',
      title: 'In Progress',
      taskIds: []
    },
    done: {
      id: 'done',
      title: 'Done',
      taskIds: []
    }
  };