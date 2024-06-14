import React from 'react';
import TaskItem from './TaskItem';

interface Task {
    id: number;
    name: string;
    completed: boolean;
}

interface TaskListProps {
    tasks: Task[];
    toggleTask: (id: number) => void;
    deleteTask: (id: number) => void;
}

export default function TaskList({ tasks, toggleTask, deleteTask }: TaskListProps) {
    return (
        <ul>
            {tasks.map((task) => (
                <TaskItem
                    key={task.id}
                    task={task}
                    toggleTask={() => toggleTask(task.id)}
                    deleteTask={() => deleteTask(task.id)}
                />
            ))}
        </ul>
    );
}
