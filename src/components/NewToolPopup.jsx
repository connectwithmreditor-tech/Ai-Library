
import React, { useState, useEffect } from 'react';

const NewToolPopup = ({ tools }) => {
    const [newTool, setNewTool] = useState(null);
    const [isVisible, setIsVisible] = useState(false);
    const [isExiting, setIsExiting] = useState(false);

    useEffect(() => {
        const latestToolId = localStorage.getItem('latestNewToolId');
        if (!latestToolId) return;

        const seenToolId = localStorage.getItem('seenNewToolId');

        // Show popup only if the user hasn't seen this specific tool yet
        if (latestToolId !== seenToolId) {
            const tool = tools.find(t => String(t.id) === latestToolId);
            if (tool) {
                setNewTool(tool);
                // Small delay so the page loads first
                const timer = setTimeout(() => setIsVisible(true), 800);
                return () => clearTimeout(timer);
            }
        }
    }, [tools]);

    const handleDismiss = () => {
        setIsExiting(true);
        setTimeout(() => {
            setIsVisible(false);
            setNewTool(null);
            // Mark as seen so it never shows again for this tool
            const latestToolId = localStorage.getItem('latestNewToolId');
            if (latestToolId) {
                localStorage.setItem('seenNewToolId', latestToolId);
            }
        }, 400);
    };

    if (!newTool || !isVisible) return null;

    return (
        <div className={`new-tool-popup ${isExiting ? 'popup-exit' : 'popup-enter'}`}>
            <div className="popup-glow"></div>
            <button className="popup-close" onClick={handleDismiss} aria-label="Close">×</button>
            <div className="popup-badge">✨ New Tool Added!</div>
            <div className="popup-body">
                <img
                    src={newTool.logo}
                    alt={newTool.name}
                    className="popup-logo"
                    onError={(e) => { e.target.src = 'https://picsum.photos/50/50'; }}
                />
                <div className="popup-info">
                    <h4 className="popup-name">{newTool.name}</h4>
                    <p className="popup-desc">{newTool.description}</p>
                </div>
            </div>
            <a
                href={newTool.link}
                target="_blank"
                rel="noopener noreferrer"
                className="popup-action"
                onClick={handleDismiss}
            >
                Check it out →
            </a>
        </div>
    );
};

export default NewToolPopup;
