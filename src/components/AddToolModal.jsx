
import React, { useState, useEffect } from 'react';

const AddToolModal = ({ isOpen, onClose, onAdd, initialData }) => {
    const [formData, setFormData] = useState({
        name: '',
        category: 'text-generation',
        description: '',
        link: '',
        tags: ''
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                ...initialData,
                tags: Array.isArray(initialData.tags) ? initialData.tags.join(', ') : initialData.tags
            });
        } else {
            setFormData({
                name: '',
                category: 'text-generation',
                description: '',
                link: '',
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

        onAdd({
            ...formData,
            tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
        });

        // Form reset happens in useEffect when modal opens/closes or initialData changes
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
