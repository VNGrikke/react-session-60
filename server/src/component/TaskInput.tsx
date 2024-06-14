import React, { useState } from 'react';

interface TaskInputProps {
    addTask: (task: string) => void;
}

export default function TaskInput({ addTask }: TaskInputProps) {
    const [task, setTask] = useState<string>('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (task.trim()) {
            addTask(task);
            setTask('');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                placeholder="Nhập tên công việc"
            />
            <button type="submit">Thêm công việc</button>
        </form>
    );
}
