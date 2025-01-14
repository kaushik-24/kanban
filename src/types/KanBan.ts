
export interface Task {
    id: string;
    content: string;
    created: string;
  }
  
  export interface Column {
    id: string;
    title: string;
    taskIds: string[];
  }
  
  export interface Columns {
    [key: string]: Column;
  }
  
  export interface Tasks {
    [key: string]: Task;
  }