import React from 'react';

interface FilterProps {
    setFilter: (filter: string) => void;
}

export default function Filter({ setFilter }: FilterProps) {
    return (
        <div className="filter-buttons">
            <button onClick={() => setFilter('all')}>Tất cả</button>
            <button onClick={() => setFilter('completed')}>Hoàn thành</button>
            <button onClick={() => setFilter('active')}>Đang thực hiện</button>
        </div>
    );
}
