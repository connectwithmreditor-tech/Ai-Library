
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
    const [password, setPassword] = useState('');
    const [githubToken, setGithubToken] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const isAuthenticated = sessionStorage.getItem('isAdminAuthenticated');
        if (isAuthenticated) {
            navigate('/admin/dashboard');
        }
    }, [navigate]);

    const handleLogin = (e) => {
        e.preventDefault();
        if (password === 'Abd*') {
            if (!githubToken.trim()) {
                setError('GitHub Token is required to manage tools');
                return;
            }
            sessionStorage.setItem('isAdminAuthenticated', 'true');
            sessionStorage.setItem('githubToken', githubToken.trim());
            navigate('/admin/dashboard');
        } else {
            setError('Invalid Password');
        }
    };

    return (
        <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
            <div className="modal-content" style={{ maxWidth: '420px', width: '100%' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Admin Login</h2>
                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter Admin Password"
                            autoFocus
                        />
                    </div>
                    <div className="form-group">
                        <label>GitHub Token</label>
                        <input
                            type="password"
                            value={githubToken}
                            onChange={(e) => setGithubToken(e.target.value)}
                            placeholder="Paste your GitHub Personal Access Token"
                        />
                        <p style={{ fontSize: '0.75rem', color: '#888', marginTop: '6px' }}>
                            Required to save changes. Get one at{' '}
                            <a href="https://github.com/settings/tokens" target="_blank" rel="noopener noreferrer" style={{ color: '#6366f1' }}>
                                github.com/settings/tokens
                            </a>
                        </p>
                    </div>
                    {error && <p style={{ color: '#ff4d4d', marginTop: '10px' }}>{error}</p>}
                    <button type="submit" className="btn-submit" style={{ width: '100%', marginTop: '20px' }}>
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
