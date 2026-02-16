
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
    const { tools, addTool, updateTool, deleteTool } = useTools();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTool, setEditingTool] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const isAuthenticated = localStorage.getItem('isAdminAuthenticated');
        if (!isAuthenticated) {
            navigate('/admin');
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('isAdminAuthenticated');
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

    const handleDeleteClick = (id) => {
        if (window.confirm('Are you sure you want to delete this tool?')) {
            deleteTool(id);
        }
    };

    const handleSaveTool = (toolData) => {
        if (editingTool) {
            updateTool(editingTool.id, toolData);
            setEditingTool(null);
        } else {
            addTool(toolData);
        }
        setIsModalOpen(false);
    };

    return (
        <div className="container">
            <header className="library-header" style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <div className="header-content">
                    <h1>Admin Dashboard</h1>
                    <p>Manage AI Tools and Configuration</p>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <button className="glowing-btn" style={{ background: '#4b5563' }} onClick={() => navigate('/')}>
                        Home
                    </button>
                    <button className="glowing-btn" style={{ background: '#ef4444' }} onClick={handleLogout}>
                        Logout
                    </button>
                    <button className="glowing-btn" onClick={handleAddClick}>
                        + Add New Tool
                    </button>
                </div>
            </header>

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
                                        style={{ marginRight: '10px', background: 'none', border: 'none', color: '#6366f1', cursor: 'pointer' }}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDeleteClick(tool.id)}
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

            {isModalOpen && (
                <AddToolModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onAdd={handleSaveTool}
                    initialData={editingTool} // We need to update AddToolModal to accept this
                />
            )}
        </div>
    );
};

export default AdminDashboard;
