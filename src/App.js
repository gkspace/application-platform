import React, { useState, useEffect } from 'react';
import './App.css';
import JobCard from './Components/JobCard';

function App() {
  const [jobListings, setJobListings] = useState([]);
  const [offset, setOffset] = useState(0);
  const limit = 40;
  const scrollThreshold = 50; // Adjust this value as needed

  const fetchJobListings = async () => {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ limit, offset })
    };

    try {
      const response = await fetch('https://api.weekday.technology/adhoc/getSampleJdJSON', requestOptions);
      const data = await response.json();
      console.log('API Response:', data);
      if (Array.isArray(data.jdList)) {
        setOffset(prevOffset => prevOffset + limit);
        setJobListings(prevListings => [...prevListings, ...data.jdList]);
      } else {
        console.error('Invalid data format:', data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Fetch initial data
  useEffect(() => {
    fetchJobListings();
  }, []);

  // Fetch more data when scrolling to the bottom
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - scrollThreshold
      ) {
        fetchJobListings();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [offset]); // Trigger effect when offset changes

  return (
    <div className="App">
      <h1>Job Listings</h1>
      <div className="job-listings">
        {jobListings.map((job, index) => (
          <JobCard key={index} job={job} />
        ))}
      </div>
    </div>
  );
}

export default App;
