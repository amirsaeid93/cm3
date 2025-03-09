import { useEffect, useState } from 'react';
import JobListings from '../components/JobListings';

const HomePage = () => {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch('/api/jobs'); // Ensure the URL is correct
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setJobs(data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
        setError(error.message);
      }
    };

    fetchJobs();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/jobs/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      setJobs(jobs.filter(job => job._id !== id));
    } catch (error) {
      console.error('Error deleting job:', error);
      setError(error.message);
    }
  };

  const handleUpdate = (updatedJob) => {
    setJobs(jobs.map(job => (job._id === updatedJob._id ? updatedJob : job)));
  };

  return (
    <div className="home">
      {error && <div>{error}</div>}
      {jobs && <JobListings jobs={jobs} onDelete={handleDelete} onUpdate={handleUpdate} />}
    </div>
  );
};

export default HomePage;