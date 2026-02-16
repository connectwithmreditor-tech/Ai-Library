
import React from 'react';

const Categories = ({ categories, selectedCategory, onSelectCategory }) => {
    return (
        <div className="categories-section">
            <div className="categories-container" id="categoriesContainer">
                {categories.map(category => (
                    <button
                        key={category.id}
                        className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
                        onClick={() => onSelectCategory(category.id)}
                    >
                        <span className="category-icon">{category.icon}</span>
                        <span className="category-name">{category.name}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Categories;
