
import React from 'react';

const Stats = ({ totalTools, totalCategories, visibleTools }) => {
    return (
        <div className="stats">
            <div className="stat-item">
                <div className="stat-number" id="totalTools">{totalTools}</div>
                <div className="stat-label">Total Tools</div>
            </div>
            <div className="stat-item">
                <div className="stat-number" id="totalCategories">{totalCategories}</div>
                <div className="stat-label">Categories</div>
            </div>
            <div className="stat-item">
                <div className="stat-number" id="visibleTools">{visibleTools}</div>
                <div className="stat-label">Visible Tools</div>
            </div>
        </div>
    );
};

export default Stats;
