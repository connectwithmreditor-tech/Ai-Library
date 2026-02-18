
import React, { useState, useEffect } from 'react';

const NewToolPopup = ({ tools }) => {
    const [newTool, setNewTool] = useState(null);
    const [isVisible, setIsVisible] = useState(false);
    const [isExiting, setIsExiting] = useState(false);

    useEffect(() => {
        if (!tools || tools.length === 0) return;

        // Check what the user has previously seen
        const seenToolIds = localStorage.getItem('seenToolIds');
        const seenSet = seenToolIds ? new Set(JSON.parse(seenToolIds)) : new Set();

        // Find the newest tool that hasn't been seen
        // Sort by ID descending (higher ID = more recently added)
        const sortedTools = [...tools].sort((a, b) => b.id - a.id);
        const unseenTool = sortedTools.find(t => !seenSet.has(String(t.id)));

        // Only show popup for tools that were added after initial data (id > 10)
        if (unseenTool && unseenTool.id > 10) {
            setNewTool(unseenTool);
            const timer = setTimeout(() => setIsVisible(true), 1200);
            return () => clearTimeout(timer);
        }
    }, [tools]);

    const handleDismiss = () => {
        setIsExiting(true);
        setTimeout(() => {
            setIsVisible(false);
            // Mark ALL current tools as seen
            const allIds = tools.map(t => String(t.id));
            localStorage.setItem('seenToolIds', JSON.stringify(allIds));
            setNewTool(null);
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
