import React from 'react';
import approved from '../../images/approved.png';
const AppliedApplications = () => {
    const steps = [
        { number: 1, text: 'Step 1', color: 'green', textColor: 'gray' },
        { number: 2, text: 'Step 2', color: 'green', textColor: 'gray' },
        { number: 3, text: 'Step 3', color: 'green', textColor: 'gray' },
        { number: 4, text: 'Step 4', color: 'gray', textColor: 'gray' }
      ];
    return (
        <div>
             <div className="flex flex-col items-center justify-center w-full rounded-lg mb-8 p-16 p-sm-24 header accent" style={{ background: 'linear-gradient(to right, rgb(36, 18, 101) 0%, rgb(0, 130, 203) 100%)', color: 'white', boxSizing: 'border-box', display: 'flex', placeContent: 'center', alignItems: 'center' }}>
                <div className="hero-text w-full text-center">
                    <h1 className="ng-trigger ng-trigger-animate text-2xl text-center font-bold p-2">My Applications</h1>
                    <p className="ng-trigger ng-trigger-animate">Download Challan | View Status of Application</p>
                </div>
            </div>
            

            <div className='p-4 m-8 relative rounded-lg border-4 border-blue-500'>
                
            <div className="content flex flex-col flex-1" style={{ flexDirection: 'column', boxSizing: 'border-box', display: 'flex' }}>
                <div className='p-2 rounded-lg' style={{ background: 'linear-gradient(to right, rgb(36, 18, 101) 0%, rgb(0, 130, 203) 100%)', color: 'white', boxSizing: 'border-box', display: 'flex', placeContent: 'center', alignItems: 'center' }}><h1 className='text-2xl text-center font-bold'>Application Status</h1></div>
                <div className="flex flex-wrap">
            {/* First Column */}
            <div className="flex flex-col flex-100 sm:flex-50 md:flex-60" style={{ alignSelf: 'center', marginBottom: '20px', flexDirection: 'column', boxSizing: 'border-box', display: 'flex', flex: '1 1 50%', maxWidth: '50%' }}>
                <div><strong>Application ID: </strong>231423</div>
                <div><strong>University: </strong>Sukkur IBA University, Sukkur</div>
                
                <div><strong>Program </strong>Computer Science</div>
                <div><strong>Applied On: </strong>31-03-2024</div>
                <div className="badge accent sts-badge animate" style={{ marginTop: '15px', width: 'fit-content' }}><strong>Application Status: </strong><span>Qualified for Written Test</span></div>
            </div>
            {/* Second Column */}
            <div className="flex flex-col flex-100 sm:flex-50 md:flex-40 p-8" style={{ alignSelf: 'center', marginBottom: '20px', flexDirection: 'column', boxSizing: 'border-box', display: 'flex', flex: '1 1 50%', maxWidth: '50%' }}>
                {/* Image */}
                <div className="info">
                    <img src={approved} alt="Approved" className="w-auto h-auto" />
                </div>
            </div>

            </div>
            </div>
            <div className='p-2 '>
                <ol className="flex items-center justify-center">
                    {steps.map(step => (
                        <li key={step.number} className="relative w-full mb-6">
                        <div className="flex items-center">
                            <div className={`z-10 flex items-center justify-center w-6 h-6 bg-${step.color}-300 rounded-full ring-0 ring-white dark:bg-${step.color}-900 sm:ring-8 dark:ring-gray-900 shrink-0`}>
                            <svg className={`w-2.5 h-2.5 text-${step.color}-600 dark:text-${step.color}-300`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5.917 5.724 10.5 15 1.5"/>
                            </svg>
                            </div>
                            {step.number !== 4 && (
                            <div className="flex w-full bg-gray-200 h-0.5 dark:bg-gray-700"></div>
                            )}
                        </div>
                        <div className="mt-3">
                            <h3 className={`font-medium text-${step.textColor} dark:text-${step.textColor}`}>{step.text}</h3>
                        </div>
                        </li>
                    ))}
                    </ol>
            </div>
            </div>
        </div>
            
    );
};

export default AppliedApplications;