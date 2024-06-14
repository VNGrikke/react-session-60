import React from 'react';

interface Task {
    id: number;
    name: string;
    completed: boolean;
}

interface TaskItemProps {
    task: Task;
    toggleTask: () => void;
    deleteTask: () => void;
    // repairTask: () => void;
}

export default function TaskItem({ task, toggleTask, deleteTask }: TaskItemProps) {
    return (
        <li>
            <input
                type="checkbox"
                checked={task.completed}
                onChange={toggleTask}
            />
            <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                {task.name}
            </span>
            <button onClick={deleteTask}>Delete</button>
            {/* <button onClick={repairTask}>repair</button> */}
        </li>
    );
}
