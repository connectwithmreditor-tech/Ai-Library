
import React, { useState, useEffect } from 'react';
import { useTools } from '../context/ToolsContext';
import { useNavigate } from 'react-router-dom';
import AddToolModal from '../components/AddToolModal';

// Styles for the table
const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
    background: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '8px',
    overflow: 'hidden'
};

const thStyle = {
    textAlign: 'left',
    padding: '15px',
    background: 'rgba(255, 255, 255, 0.1)',
    color: 'var(--text-primary)',
    borderBottom: '1px solid var(--border-color)'
};

const tdStyle = {
    padding: '15px',
    borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
    color: 'var(--text-secondary)'
};

const AdminDashboard = () => {
    const { tools, loading, addTool, updateTool, deleteTool } = useTools();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTool, setEditingTool] = useState(null);
    const [saving, setSaving] = useState(false);
    const [statusMessage, setStatusMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const isAuthenticated = sessionStorage.getItem('isAdminAuthenticated');
        if (!isAuthenticated) {
            navigate('/admin');
        }
    }, [navigate]);

    const showStatus = (message, isError = false) => {
        setStatusMessage(message);
        setTimeout(() => setStatusMessage(''), 4000);
    };

    const handleLogout = () => {
        sessionStorage.removeItem('isAdminAuthenticated');
        sessionStorage.removeItem('githubToken');
        navigate('/');
    };

    const handleAddClick = () => {
        setEditingTool(null);
        setIsModalOpen(true);
    };

    const handleEditClick = (tool) => {
        setEditingTool(tool);
        setIsModalOpen(true);
    };

    const handleDeleteClick = async (id) => {
        if (window.confirm('Are you sure you want to delete this tool?')) {
            setSaving(true);
            const result = await deleteTool(id);
            setSaving(false);
            if (result.success) {
                showStatus('✅ Tool deleted and synced to GitHub!');
            } else {
                showStatus('❌ ' + result.error, true);
            }
        }
    };

    const handleSaveTool = async (toolData) => {
        setSaving(true);
        let result;
        if (editingTool) {
            result = await updateTool(editingTool.id, toolData);
            setEditingTool(null);
        } else {
            result = await addTool(toolData);
        }
        setSaving(false);
        setIsModalOpen(false);

        if (result.success) {
            showStatus(editingTool ? '✅ Tool updated and synced to GitHub!' : '✅ Tool added and synced to GitHub!');
        } else {
            showStatus('❌ ' + result.error, true);
        }
    };

    return (
        <div className="container">
            <header className="library-header">
                <div className="header-content">
                    <h1>Admin Dashboard</h1>
                    <p>Manage AI Tools and Configuration</p>
                </div>
                <div className="header-buttons admin-actions">
                    <button className="glowing-btn" style={{ background: '#4b5563' }} onClick={() => navigate('/')}>
                        Home
                    </button>
                    <button className="glowing-btn" style={{ background: '#ef4444' }} onClick={handleLogout}>
                        Logout
                    </button>
                    <button className="glowing-btn" onClick={handleAddClick} disabled={saving}>
                        + Add New Tool
                    </button>
                </div>
            </header>

            {/* Status message */}
            {statusMessage && (
                <div style={{
                    padding: '12px 16px',
                    borderRadius: '8px',
                    background: statusMessage.startsWith('❌')
                        ? 'rgba(239, 68, 68, 0.15)'
                        : 'rgba(34, 197, 94, 0.15)',
                    border: `1px solid ${statusMessage.startsWith('❌') ? 'rgba(239, 68, 68, 0.3)' : 'rgba(34, 197, 94, 0.3)'}`,
                    color: 'var(--text-primary)',
                    marginBottom: '16px',
                    fontSize: '0.95rem',
                    animation: 'fadeIn 0.3s ease'
                }}>
                    {statusMessage}
                </div>
            )}

            {/* Saving overlay */}
            {saving && (
                <div style={{
                    padding: '12px 16px',
                    borderRadius: '8px',
                    background: 'rgba(99, 102, 241, 0.15)',
                    border: '1px solid rgba(99, 102, 241, 0.3)',
                    color: 'var(--text-primary)',
                    marginBottom: '16px',
                    fontSize: '0.95rem',
                    textAlign: 'center'
                }}>
                    ⏳ Saving to GitHub...
                </div>
            )}

            {loading ? (
                <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-secondary)' }}>
                    Loading tools...
                </div>
            ) : (
                <div style={{ overflowX: 'auto' }}>
                    <table style={tableStyle}>
                        <thead>
                            <tr>
                                <th style={thStyle}>Icon</th>
                                <th style={thStyle}>Name</th>
                                <th style={thStyle}>Category</th>
                                <th style={thStyle}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tools.map(tool => (
                                <tr key={tool.id}>
                                    <td style={tdStyle}>
                                        <img src={tool.logo} alt={tool.name} style={{ width: '40px', height: '40px', borderRadius: '8px', objectFit: 'cover' }} />
                                    </td>
                                    <td style={{ ...tdStyle, color: 'var(--text-primary)', fontWeight: '500' }}>{tool.name}</td>
                                    <td style={tdStyle}>{tool.category}</td>
                                    <td style={tdStyle}>
                                        <button
                                            onClick={() => handleEditClick(tool)}
                                            disabled={saving}
                                            style={{ marginRight: '10px', background: 'none', border: 'none', color: '#6366f1', cursor: 'pointer' }}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDeleteClick(tool.id)}
                                            disabled={saving}
                                            style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {isModalOpen && (
                <AddToolModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onAdd={handleSaveTool}
                    initialData={editingTool}
                />
            )}
        </div>
    );
};

export default AdminDashboard;
