import React from 'react';

const PortalHome = () => {
    return (
        <div>
            <div className="flex flex-col items-center justify-center w-full rounded-lg mb-8 p-16 p-sm-24 header accent" style={{ background: 'linear-gradient(to right, rgb(36, 18, 101) 0%, rgb(0, 130, 203) 100%)', color: 'white', boxSizing: 'border-box', display: 'flex', placeContent: 'center', alignItems: 'center' }}>
                <div className="hero-text w-full text-center">
                    <h1 className="ng-trigger ng-trigger-animate text-2xl text-center font-bold p-2">Portal Home</h1>
                    <p className="ng-trigger ng-trigger-animate">Welcome to the Portal</p>
                </div>
            </div>
        </div>
    );
};

export default PortalHome;