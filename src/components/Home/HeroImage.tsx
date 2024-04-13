// HeroImage.tsx
import React from 'react';

const HeroImage: React.FC = () => {
    return (
        <div className="bg-green-500 hero h-64" style={{ backgroundImage: `url('')` }}>
            <div className="hero-overlay bg-opacity-10"></div>
            <div className="hero-content text-center text-neutral-content">
                <div className="max-w-md">
                    <h1 className="mb-5 text-5xl font-bold">conduit</h1>
                    <p className="mb-5">A place to share your knowledge.</p>
                </div>
            </div>
        </div>
    );
};


export default HeroImage;
