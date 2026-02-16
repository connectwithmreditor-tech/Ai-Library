
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        if (password === 'Abd*') {
            localStorage.setItem('isAdminAuthenticated', 'true');
            navigate('/admin/dashboard');
        } else {
            setError('Invalid Password');
        }
    };

    return (
        <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
            <div className="modal-content" style={{ maxWidth: '400px', width: '100%' }}>
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
