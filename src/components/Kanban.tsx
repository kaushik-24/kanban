import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import { Columns, Task, Tasks } from "../types/KanBan";
import Column from "./Column";
import { initialColumns } from "../constants/InitialData";
 
  //useLocalStorage
  function useLocalStorage<T>(key: string, initialValue: T): [T, React.Dispatch<React.SetStateAction<T>>] {
    const [storedValue, setStoredValue] = useState<T>(() => {
      try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : initialValue;
      } catch (error) {
        console.error('Error reading from localStorage:', error);
        return initialValue;
      }
    });
  
    useEffect(() => {
      try {
        localStorage.setItem(key, JSON.stringify(storedValue));
      } catch (error) {
        console.error('Error writing to localStorage:', error);
      }
    }, [key, storedValue]);
  
    return [storedValue, setStoredValue];
  }
  
  // hooks useDragAndDrop
  interface DragAndDropHook {
    draggedItem: string | null;
    handleDragStart: (e: React.DragEvent<HTMLDivElement>, taskId: string) => void;
    handleDragEnd: (e: React.DragEvent<HTMLDivElement>) => void;
    handleDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
    handleDrop: (e: React.DragEvent<HTMLDivElement>, columnId: string) => void;
  }
  
  const useDragAndDrop = (onDropTask: (taskId: string, columnId: string) => void): DragAndDropHook => {
    const [draggedItem, setDraggedItem] = useState<string | null>(null);
  
    const handleDragStart = (e: React.DragEvent<HTMLDivElement>, taskId: string): void => {
      setDraggedItem(taskId);
      e.dataTransfer.effectAllowed = 'move';
      e.currentTarget.style.opacity = '0.5';
    };
  
    const handleDragEnd = (e: React.DragEvent<HTMLDivElement>): void => {
      e.currentTarget.style.opacity = '1';
      setDraggedItem(null);
    };
  
    const handleDragOver = (e: React.DragEvent<HTMLDivElement>): void => {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
    };
  
    const handleDrop = (e: React.DragEvent<HTMLDivElement>, columnId: string): void => {
      e.preventDefault();
      if (draggedItem) {
        onDropTask(draggedItem, columnId);
        setDraggedItem(null);
      }
    };
  
    return {
      draggedItem,
      handleDragStart,
      handleDragEnd,
      handleDragOver,
      handleDrop
    };
  };
  
  
  export const initialTasks: Tasks = {};
  
  const KanbanBoard: React.FC = () => {
    const [columns, setColumns] = useLocalStorage<Columns>('kanbanColumns', initialColumns);
    const [tasks, setTasks] = useLocalStorage<Tasks>('kanbanTasks', initialTasks);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [newTaskText, setNewTaskText] = useState<string>('');
  
    const handleDropTask = (taskId: string, targetColumnId: string): void => {
      const sourceColumnId = Object.keys(columns).find(
        colId => columns[colId].taskIds.includes(taskId)
      );
      
      if (!sourceColumnId || sourceColumnId === targetColumnId) return;
  
      setColumns(prev => ({
        ...prev,
        [sourceColumnId]: {
          ...prev[sourceColumnId],
          taskIds: prev[sourceColumnId].taskIds.filter(id => id !== taskId)
        },
        [targetColumnId]: {
          ...prev[targetColumnId],
          taskIds: [...prev[targetColumnId].taskIds, taskId]
        }
      }));
    };
  
    const {
      handleDragStart,
      handleDragEnd,
      handleDragOver,
      handleDrop
    } = useDragAndDrop(handleDropTask);
  
    const handleAddTask = (columnId: string): void => {
      if (!newTaskText.trim()) return;
      
      const newTaskId = `task-${Date.now()}`;
      const newTask: Task = {
        id: newTaskId,
        content: newTaskText,
        created: new Date().toISOString()
      };
  
      setTasks(prev => ({ ...prev, [newTaskId]: newTask }));
      setColumns(prev => ({
        ...prev,
        [columnId]: {
          ...prev[columnId],
          taskIds: [...prev[columnId].taskIds, newTaskId]
        }
      }));
      setNewTaskText('');
    };
  
    const handleDeleteTask = (taskId: string, columnId: string): void => {
      const newTasks = { ...tasks };
      delete newTasks[taskId];
      setTasks(newTasks);
  
      setColumns(prev => ({
        ...prev,
        [columnId]: {
          ...prev[columnId],
          taskIds: prev[columnId].taskIds.filter(id => id !== taskId)
        }
      }));
    };
  
    return (
      <div className="p-4 max-w-6xl mx-auto">
        <SearchBar 
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />
  
        <div className="flex gap-4 overflow-x-auto pb-4">
          {Object.values(columns).map(column => (
            <Column
              key={column.id}
              column={column}
              tasks={tasks}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, column.id)}
              onDeleteTask={handleDeleteTask}
              onAddTask={handleAddTask}
              newTaskText={newTaskText}
              onNewTaskTextChange={setNewTaskText}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
            />
          ))}
        </div>
      </div>
    );
  };
  
  export default KanbanBoard;