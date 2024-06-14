import React from 'react';

interface FooterProps {
    clearCompletedTasks: () => void;
    clearAllTasks: () => void;
}

export default function Footer({ clearCompletedTasks, clearAllTasks }: FooterProps) {
    return (
        <div className="footer-buttons">
            <button onClick={clearCompletedTasks}>Xóa công việc hoàn thành</button>
            <button onClick={clearAllTasks}>Xóa tất cả công việc</button>
        </div>
    );
}
