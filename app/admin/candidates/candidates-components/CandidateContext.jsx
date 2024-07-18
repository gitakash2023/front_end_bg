import React, { useEffect, useState } from 'react';
import { _getAll } from '@/utils/apiUtils';
import CandidateList from './CandidateList';  

const CandidateContext = () => {
    const [candidateData, setCandidateData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await _getAll('/candidate');
                console.log(data)
                setCandidateData(data);
            } catch (error) {
                setError('Failed to fetch data. Please try again later.');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);
    console.log("candidateData in Context",candidateData)

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return <CandidateList candidateData={candidateData} />;
};

export default CandidateContext;
