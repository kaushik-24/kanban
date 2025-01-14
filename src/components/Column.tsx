import {  Tasks } from "../types/KanBan";
import AddTaskForm from "./AddTaskForm";
import TaskCard from "./TaskCard";

interface Column {
    id: string;
    title: string;
    taskIds: string[];
  }

  // Column.tsx
  interface ColumnProps {
    column: Column;
    tasks: Tasks;
    onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
    onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
    onDeleteTask: (taskId: string, columnId: string) => void;
    onAddTask: (columnId: string) => void;
    newTaskText: string;
    onNewTaskTextChange: (value: string) => void;
    onDragStart: (e: React.DragEvent<HTMLDivElement>, taskId: string) => void;  
    onDragEnd: (e: React.DragEvent<HTMLDivElement>) => void;  
  }
  
  const Column: React.FC<ColumnProps> = ({
    column,
    tasks,
    onDragOver,
    onDrop,
    onDeleteTask,
    onAddTask,
    newTaskText,
    onNewTaskTextChange,
    onDragStart,
    onDragEnd,
  }) => {
    return (
      <div
        className="flex-shrink-0 w-80 bg-red-300 rounded-lg p-4"
        onDragOver={onDragOver}
        onDrop={onDrop}
      >
        <h3 className="font-semibold mb-4">{column.title}</h3>
        
        <div className="space-y-2">
          {column.taskIds.map(taskId => (
            <TaskCard
              key={taskId}
              task={tasks[taskId]}
              onDelete={() => onDeleteTask(taskId, column.id)}
              onDragStart={(e) => onDragStart(e, taskId)}
              onDragEnd={onDragEnd}
            />
          ))}
        </div>
  
        <AddTaskForm
          onAddTask={() => onAddTask(column.id)}
          newTaskText={newTaskText}
          onTextChange={onNewTaskTextChange}
        />
      </div>
    );
  };

  export default Column;