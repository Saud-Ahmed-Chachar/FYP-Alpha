import React, { useEffect, useState } from 'react';
import { db, auth } from '../../backend/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { onAuthStateChanged } from "firebase/auth";

const universityUrls = [
    'gcuf.edu.pk',
    'uol.edu.pk',
    'www.comsats.edu.pk',
    'www.lums.edu.pk',
    'www.pu.edu.pk_',
    'uaf.edu.pk'
];

const fetchApplicants = async (userEmail) => {
    const allApplicants = [];
    for (const universityUrl of universityUrls) {
        const applicantsRef = collection(db, `applications/${universityUrl}/applicants`);
        const q = query(applicantsRef, where("userEmail", "==", userEmail));
        const querySnapshot = await getDocs(q);
        const applicants = querySnapshot.docs.map(doc => ({
            id: doc.id,
            universityUrl,
            ...doc.data()
        }));
        allApplicants.push(...applicants);
    }
    return allApplicants;
};

const AppliedApplications = () => {
    const [applicants, setApplicants] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setCurrentUser(user);
                fetchApplicants(user.email).then(setApplicants);
            } else {
                setApplicants([]);
            }
        });

        return () => unsubscribe();
    }, []);

    const pendingApplicants = applicants.filter(app => !app.status);
    const updatedApplicants = applicants.filter(app => app.status);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-2xl font-semibold text-gray-800 mt-5 mb-3">Applied Applications</h1>
            <h2 className="text-xl font-semibold text-gray-700 mt-5 mb-2">Pending Applications</h2>
            <ul className="list-disc pl-5">
                {pendingApplicants.map(app => (
                    <li key={app.id} className="mt-1 text-gray-600">
                        {app.universityUrl}: {app.rejectionReason || 'Pending review'}
                    </li>
                ))}
            </ul>
            <h2 className="text-xl font-semibold text-gray-700 mt-5 mb-2">Application Status</h2>
            <table className="min-w-full mt-2 bg-white shadow-md rounded-lg">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">University</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User Email</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applied At</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rejection Reason</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {updatedApplicants.map(app => (
                        <tr key={app.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{app.universityUrl}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{app.userEmail}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {app.appliedAt.seconds ? new Date(app.appliedAt.seconds * 1000).toLocaleString() : 'N/A'}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{app.status}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {app.rejectionReason || 'N/A'}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AppliedApplications;
