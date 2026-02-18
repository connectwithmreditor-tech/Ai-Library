
import React, { createContext, useState, useEffect, useContext } from 'react';

const ToolsContext = createContext();

// GitHub repo details
const GITHUB_OWNER = 'connectwithmreditor-tech';
const GITHUB_REPO = 'Ai-Library';
const GITHUB_FILE_PATH = 'public/tools.json';
const GITHUB_PAGES_URL = `https://${GITHUB_OWNER}.github.io/${GITHUB_REPO}/tools.json`;
const GITHUB_API_URL = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${GITHUB_FILE_PATH}`;

export const ToolsProvider = ({ children }) => {
    const [tools, setTools] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch tools from GitHub Pages on load
    useEffect(() => {
        fetchToolsFromGitHub();
    }, []);

    const fetchToolsFromGitHub = async () => {
        try {
            setLoading(true);
            setError(null);
            // Add cache-busting timestamp to avoid stale data
            const response = await fetch(`${GITHUB_PAGES_URL}?t=${Date.now()}`);
            if (!response.ok) throw new Error('Failed to fetch tools');
            const data = await response.json();
            setTools(data);
        } catch (err) {
            console.error('Failed to fetch tools from GitHub:', err);
            setError('Failed to load tools. Please refresh the page.');
            // Fallback: try localStorage
            try {
                const cached = localStorage.getItem('aiToolsCache');
                if (cached && cached !== 'undefined') {
                    setTools(JSON.parse(cached));
                }
            } catch (e) {
                console.error('localStorage fallback failed:', e);
            }
        } finally {
            setLoading(false);
        }
    };

    // Cache tools locally whenever they update
    useEffect(() => {
        if (tools.length > 0) {
            localStorage.setItem('aiToolsCache', JSON.stringify(tools));
        }
    }, [tools]);

    // Save tools to GitHub via API
    const saveToolsToGitHub = async (updatedTools) => {
        const token = sessionStorage.getItem('githubToken');
        if (!token) {
            throw new Error('GitHub token not found. Please log in again with your GitHub token.');
        }

        // Step 1: Get the current file SHA (required for updates)
        const getResponse = await fetch(GITHUB_API_URL, {
            headers: {
                'Authorization': `token ${token}`,
                'Accept': 'application/vnd.github.v3+json'
            }
        });

        if (!getResponse.ok) {
            throw new Error('Failed to access GitHub repository. Check your token permissions.');
        }

        const fileData = await getResponse.json();
        const currentSha = fileData.sha;

        // Step 2: Update the file
        const content = btoa(unescape(encodeURIComponent(JSON.stringify(updatedTools, null, 4))));
        const updateResponse = await fetch(GITHUB_API_URL, {
            method: 'PUT',
            headers: {
                'Authorization': `token ${token}`,
                'Accept': 'application/vnd.github.v3+json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: `Update tools.json - ${new Date().toLocaleString()}`,
                content: content,
                sha: currentSha
            })
        });

        if (!updateResponse.ok) {
            const errorData = await updateResponse.json();
            throw new Error(errorData.message || 'Failed to save to GitHub');
        }

        return true;
    };

    const addTool = async (newTool) => {
        const toolWithId = { ...newTool, id: Date.now() };
        const updatedTools = [...tools, toolWithId];

        try {
            await saveToolsToGitHub(updatedTools);
            setTools(updatedTools);
            // Track latest tool for popup
            localStorage.setItem('latestNewToolId', String(toolWithId.id));
            return { success: true };
        } catch (err) {
            console.error('Failed to add tool:', err);
            return { success: false, error: err.message };
        }
    };

    const updateTool = async (id, updatedTool) => {
        const updatedTools = tools.map(tool =>
            tool.id === id ? { ...tool, ...updatedTool } : tool
        );

        try {
            await saveToolsToGitHub(updatedTools);
            setTools(updatedTools);
            return { success: true };
        } catch (err) {
            console.error('Failed to update tool:', err);
            return { success: false, error: err.message };
        }
    };

    const deleteTool = async (id) => {
        const updatedTools = tools.filter(tool => tool.id !== id);

        try {
            await saveToolsToGitHub(updatedTools);
            setTools(updatedTools);
            return { success: true };
        } catch (err) {
            console.error('Failed to delete tool:', err);
            return { success: false, error: err.message };
        }
    };

    return (
        <ToolsContext.Provider value={{ tools, loading, error, addTool, updateTool, deleteTool, refetch: fetchToolsFromGitHub }}>
            {children}
        </ToolsContext.Provider>
    );
};

export const useTools = () => useContext(ToolsContext);
