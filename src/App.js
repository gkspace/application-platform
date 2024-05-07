import React, { useState, useEffect } from 'react';
import './App.css';
import JobCard from './Components/JobCard';

function App() {
  const [jobListings, setJobListings] = useState([]);
  const [filters, setFilters] = useState({
    minExperience: '',
    companyName: '',
    location: '',
    role: '',
    minBasePay: ''
  });
  const [offset, setOffset] = useState(0);
  const limit = 40;
  const scrollThreshold = 50; // Adjust this value as needed

  useEffect(() => {
    fetchJobListings();
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [filters]);

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
        // Filter the data based on the applied filters
        const filteredData = data.jdList.filter(job => {
          return (
            (!filters.minExperience || (job.minExp !== null && job.minExp <= parseInt(filters.minExperience))) &&
            (!filters.companyName || (job.companyName !== null && job.companyName.toLowerCase().includes(filters.companyName.toLowerCase()))) &&
            (!filters.location || (job.location !== null && job.location.toLowerCase() === filters.location.toLowerCase())) &&
            (!filters.role || (job.jobRole !== null && job.jobRole.toLowerCase() === filters.role.toLowerCase())) &&
            (!filters.minBasePay || (job.minJdSalary !== null && job.minJdSalary >= parseInt(filters.minBasePay)))
          );
        });
        // Update the job listings with the filtered data
        setJobListings(prevListings => [...prevListings, ...filteredData]);
        setOffset(prevOffset => prevOffset + limit);
      } else {
        console.error('Invalid data format:', data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - scrollThreshold
    ) {
      fetchJobListings();
    }
  };

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    console.log("Filter change detected:", { name, value });
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value
    }));
    // Reset offset to fetch new data from the beginning when filters change
    setOffset(0);
    // Clear previous job listings
    setJobListings([]);
  };

  const clearFilters = () => {
    setFilters({
      minExperience: '',
      companyName: '',
      location: '',
      role: '',
      minBasePay: ''
    });
    // Reset offset to fetch new data from the beginning when filters are cleared
    setOffset(0);
    // Clear previous job listings
    setJobListings([]);
  };

  return (
    <div className="App">
      <h1>Job Listings</h1>
      <div className="filters">
        <select name="minExperience" value={filters.minExperience} onChange={handleFilterChange}>
          <option value="">Minimum Experience</option>
          <option value="1">1+ years</option>
          <option value="3">3+ years</option>
          <option value="5">5+ years</option>
          <option value="8">8+ years</option>
        </select>
        <select name="location" value={filters.location} onChange={handleFilterChange}>
          <option value="">Location</option>
          <option value="Bangalore">Bangalore</option>
          <option value="Chennai">Chennai</option>
          <option value="delhi ncr">Delhi ncr</option>
          <option value="Mumbai">Mumbai</option>
        </select>
        <select name="role" value={filters.role} onChange={handleFilterChange}>
          <option value="">Role</option>
          <option value="Android">Android</option>
          <option value="Backend">Back-end</option>
          <option value="Frontend">Front-end</option>
          <option value="Ios">Ios</option>
          <option value="Tech lead">Tech lead</option>
        </select>
        <select name="minBasePay" value={filters.minBasePay} onChange={handleFilterChange}>
          <option value="">Min Base Pay in $</option>
          <option value="10">10+</option>
          <option value="25">25+</option>
          <option value="50">50+</option>
        </select>
        <input
          type="text"
          name="companyName"
          value={filters.companyName}
          placeholder="Company Name"
          onChange={handleFilterChange}
        />
        <button onClick={clearFilters}>Clear Filters</button>
      </div>
      <div className="job-listings">
        {jobListings.map((job, index) => (
          <JobCard key={index} job={job} />
        ))}
      </div>
    </div>
  );
}

export default App;
