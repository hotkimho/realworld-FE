// HeroImage.tsx
import React from 'react';

const HeroImage: React.FC = () => {
    return (
        <div className="bg-white hero min-h-screen"  style={{ backgroundImage: `url('')` }}>
            <div className="hero-overlay bg-opacity-60">hi</div>
            <div className="hero-content text-center text-neutral-content">
                <div className="max-w-md">
                    <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
                    <p className="mb-5">Welcome to Conduit</p>
                </div>
            </div>
        </div>
    );
};

export default HeroImage;
