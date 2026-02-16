
import React from 'react';
import ToolCard from './ToolCard';

const ToolList = ({ tools }) => {
    if (tools.length === 0) {
        return (
            <div className="tools-section">
                <div className="tools-container">
                    <div className="no-results">
                        <h3>No tools found</h3>
                        <p>Try adjusting your search or filter criteria</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="tools-section">
            <div className="tools-container" id="toolsContainer">
                {tools.map(tool => (
                    <ToolCard key={tool.id} tool={tool} />
                ))}
            </div>
        </div>
    );
};

export default ToolList;
