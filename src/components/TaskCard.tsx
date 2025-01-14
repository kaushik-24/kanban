import { X } from "lucide-react";
import { Task } from "../types/KanBan";


  interface TaskCardProps {
    task: Task;
    onDelete: () => void;
    onDragStart: (e: React.DragEvent<HTMLDivElement>) => void;
    onDragEnd: (e: React.DragEvent<HTMLDivElement>) => void;
  }
  
  const TaskCard: React.FC<TaskCardProps> = ({ task, onDelete, onDragStart, onDragEnd }) => {
    return (
      <div
        className="bg-white  h-[8vh] p-3 rounded shadow-sm cursor-move flex justify-between items-start"
        draggable
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
      >
        <p className="text-lg">{task.content}</p>
        <button
          onClick={onDelete}
          className="text-gray-400 hover:text-red-500"
          type="button"
        >
          <X size={16} />
        </button>
      </div>
    );
  };
  export default TaskCard;

  