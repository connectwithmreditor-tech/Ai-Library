
import React, { useState, useEffect } from 'react';


const AddToolModal = ({ isOpen, onClose, onAdd, initialData }) => {
    const [formData, setFormData] = useState({
        name: '',
        category: 'text-generation',
        description: '',
        link: '',
        logo: '',
        tags: ''
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                ...initialData,
                tags: Array.isArray(initialData.tags) ? initialData.tags.join(', ') : initialData.tags,
                logo: initialData.logo || ''
            });
        } else {
            setFormData({
                name: '',
                category: 'text-generation',
                description: '',
                link: '',
                logo: '',
                tags: ''
            });
        }
    }, [initialData, isOpen]);

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.name || !formData.link || !formData.description) {
            alert('Please fill in all required fields');
            return;
        }

        // If no logo provided, use a random seed or keep existing if editing (handled by context if we don't send one, but here we likely want to send one)
        // Actually, if it's new and no logo, ToolsContext doesn't auto-generate one anymore because we removed that logic from App.jsx and put it in Context? 
        // Wait, Context DOES NOT generate a logo. App.jsx used to.
        // I need to ensure a default logo is set if empty.

        const finalToolData = {
            ...formData,
            tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
        };

        if (!finalToolData.logo) {
            finalToolData.logo = `https://picsum.photos/seed/${finalToolData.name.replace(/\s+/g, '')}${Date.now()}/50/50.jpg`;
        }

        onAdd(finalToolData);
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({
                    ...prev,
                    logo: reader.result
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h2>{initialData ? 'Edit Tool' : 'Add New Tool'}</h2>
                    <button className="close-btn" onClick={onClose}>&times;</button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Tool Name *</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="e.g. ChatGPT"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Tool Icon</label>
                        <div style={{ marginBottom: '10px' }}>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                style={{ marginBottom: '5px' }}
                            />
                            <p style={{ fontSize: '0.8rem', color: '#888' }}>OR</p>
                            <input
                                type="url"
                                name="logo"
                                value={formData.logo}
                                onChange={handleChange}
                                placeholder="Paste Image URL..."
                                style={{ marginTop: '5px' }}
                            />
                        </div>
                        {formData.logo && (
                            <div style={{ marginTop: '10px' }}>
                                <p style={{ fontSize: '0.8rem', marginBottom: '5px' }}>Preview:</p>
                                <img src={formData.logo} alt="Preview" style={{ width: '50px', height: '50px', borderRadius: '5px', objectFit: 'cover' }} />
                            </div>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="category">Category *</label>
                        <select
                            id="category"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                        >
                            <option value="text-generation">Text Generation</option>
                            <option value="image-generation">Image Generation</option>
                            <option value="code-assistance">Code Assistance</option>
                            <option value="productivity">Productivity</option>
                            <option value="video-generation">Video Generation</option>
                            <option value="audio-generation">Audio Generation</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Description *</label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Brief description of usage..."
                            rows="3"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="link">Link *</label>
                        <input
                            type="url"
                            id="link"
                            name="link"
                            value={formData.link}
                            onChange={handleChange}
                            placeholder="https://example.com"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="tags">Tags (comma separated)</label>
                        <input
                            type="text"
                            id="tags"
                            name="tags"
                            value={formData.tags}
                            onChange={handleChange}
                            placeholder="virtual, ai, bot"
                        />
                    </div>

                    <div className="modal-actions">
                        <button type="button" className="btn-cancel" onClick={onClose}>Cancel</button>
                        <button type="submit" className="btn-submit">{initialData ? 'Save Changes' : 'Add Tool'}</button>
                    </div>
                </form>
            </div>
        </div>
    );
};


export default AddToolModal;
