import { Plus } from "lucide-react";

interface AddTaskFormProps {
    onAddTask: () => void;
    newTaskText: string;
    onTextChange: (value: string) => void;
}

const AddTaskForm: React.FC<AddTaskFormProps> = ({ onAddTask, newTaskText, onTextChange }) => {
    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
      if (e.key === 'Enter') {
        onAddTask();
      }
    };
  
    return (
      <div className="mt-4">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Add new task..."
            value={newTaskText}
            onChange={(e) => onTextChange(e.target.value)}
            className="flex-1 px-3 py-2 border rounded"
            onKeyUp={handleKeyPress}
          />
          <button
            onClick={onAddTask}
            className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            type="button"
          >
            <Plus size={20} />
          </button>
        </div>
      </div>
    );
  };
  
  export default AddTaskForm;