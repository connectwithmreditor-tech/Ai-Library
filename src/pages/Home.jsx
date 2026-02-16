
import React, { useState, useEffect } from 'react';
import { useTools } from '../context/ToolsContext';
import Header from '../components/Header';
import Stats from '../components/Stats';
import Search from '../components/Search';
import Categories from '../components/Categories';
import ToolList from '../components/ToolList';

const categoriesData = [
    { id: 'all', name: 'All Categories', icon: '🌐' },
    { id: 'text-generation', name: 'Text Generation', icon: '📝' },
    { id: 'image-generation', name: 'Image Generation', icon: '🖼️' },
    { id: 'code-assistance', name: 'Code Assistance', icon: '💻' },
    { id: 'productivity', name: 'Productivity', icon: '🚀' },
    { id: 'video-generation', name: 'Video Generation', icon: '🎬' },
    { id: 'audio-generation', name: 'Audio Generation', icon: '🎵' }
];

function Home() {
    const { tools } = useTools();
    const [filteredTools, setFilteredTools] = useState([]);

    // Initialize with a random category (excluding 'all')
    const [selectedCategory, setSelectedCategory] = useState(() => {
        const specificCategories = categoriesData.filter(c => c.id !== 'all');
        const randomIndex = Math.floor(Math.random() * specificCategories.length);
        return specificCategories[randomIndex].id;
    });

    const [searchTerm, setSearchTerm] = useState('');

    // Filter tools effect
    useEffect(() => {
        const filters = () => {
            let result = tools;

            if (selectedCategory !== 'all') {
                result = result.filter(tool => tool.category === selectedCategory);
            }

            if (searchTerm) {
                const lowerTerm = searchTerm.toLowerCase();
                result = result.filter(tool =>
                    tool.name.toLowerCase().includes(lowerTerm) ||
                    tool.description.toLowerCase().includes(lowerTerm) ||
                    tool.tags.some(tag => tag.toLowerCase().includes(lowerTerm))
                );
            }

            setFilteredTools(result);
        };

        filters();
    }, [tools, selectedCategory, searchTerm]);

    // Particle effect
    useEffect(() => {
        const createParticle = () => {
            const particle = document.createElement('div');
            particle.style.position = 'fixed';
            particle.style.width = '4px';
            particle.style.height = '4px';
            particle.style.background = 'rgba(255, 255, 255, 0.5)';
            particle.style.borderRadius = '50%';
            particle.style.pointerEvents = 'none';
            particle.style.left = Math.random() * window.innerWidth + 'px';
            particle.style.top = window.innerHeight + 'px';
            particle.style.zIndex = '1';
            document.body.appendChild(particle);

            const duration = Math.random() * 3000 + 2000;
            const animation = particle.animate([
                { transform: 'translateY(0) scale(1)', opacity: 0.5 },
                { transform: `translateY(-${window.innerHeight + 100}px) scale(0)`, opacity: 0 }
            ], {
                duration: duration,
                easing: 'ease-out'
            });

            animation.onfinish = () => particle.remove();
        };

        const intervalId = setInterval(createParticle, 300);
        return () => clearInterval(intervalId);
    }, []);

    const handleSearchChange = (term) => {
        setSearchTerm(term);
        if (term) {
            setSelectedCategory('all');
        }
    };

    return (
        <div className="container">
            <Header />

            <Stats
                totalTools={tools.length}
                totalCategories={categoriesData.length - 1}
                visibleTools={filteredTools.length}
            />

            <Search
                searchTerm={searchTerm}
                onSearchChange={handleSearchChange}
            />

            <Categories
                categories={categoriesData.filter(c => c.id !== 'all')}
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
            />

            <ToolList tools={filteredTools} />

            <footer className="library-footer">
                <p>© 2023 AI Tools Library. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default Home;
