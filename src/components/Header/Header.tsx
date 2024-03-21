// Header.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
    return (
        <nav className="bg-gray-800 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                {/* Logo and Home link */}
                <Link to="/" className="flex items-center">
                    {/*<img src="/path/to/logo.png" alt="Logo" className="mr-2 h-8" /> */}
                    <span className="font-semibold text-xl tracking-tight">Conduit</span>
                </Link>

                {/* Navigation links */}
                <div className="flex items-center gap-4">
                    <Link to="/" className="btn btn-ghost btn-sm rounded-btn">
                        Home
                    </Link>
                    <Link to="/login" className="btn btn-ghost btn-sm rounded-btn">
                        Sign In
                    </Link>
                    <Link to="/register" className="btn btn-ghost btn-sm rounded-btn">
                        Sign Up
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Header;
