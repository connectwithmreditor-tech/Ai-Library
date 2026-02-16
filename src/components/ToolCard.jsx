
import React from 'react';

const ToolCard = ({ tool }) => {
    return (
        <div className="tool-card">
            <div className="tool-header">
                <img src={tool.logo} alt={tool.name} className="tool-logo" />
                <h3 className="tool-name">{tool.name}</h3>
            </div>
            <p className="tool-description">{tool.description}</p>
            <div className="tool-tags">
                {tool.tags.map((tag, index) => (
                    <span key={index} className="tag">#{tag}</span>
                ))}
            </div>
            <a href={tool.link} target="_blank" rel="noopener noreferrer" className="tool-link">
                Visit Tool →
            </a>
        </div>
    );
};

export default ToolCard;
