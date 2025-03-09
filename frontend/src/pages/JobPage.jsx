import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const JobPage = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/jobs/${id}`);
        setJob(response.data);
      } catch (error) {
        console.error('Error fetching job:', error);
        setError(error.message);
      }
    };

    fetchJob();
  }, [id]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!job) {
    return <div>Loading...</div>;
  }

  return (
    <div className="job-details">
      <h2>{job.title}</h2>
      <p>{job.description}</p>
      <p>Type: {job.type}</p>
      <p>Location: {job.location}</p>
      <p>Salary: {job.salary}</p>
      <p>Experience Level: {job.experienceLevel}</p>
      <p>Application Deadline: {job.applicationDeadline}</p>
      <p>Status: {job.status}</p>
      <h3>Company Details</h3>
      <p>Name: {job.company.name}</p>
      <p>Email: {job.company.contactEmail}</p>
      <p>Phone: {job.company.contactPhone}</p>
      {job.company.website && <p>Website: {job.company.website}</p>}
      {job.company.size && <p>Size: {job.company.size}</p>}
      <h3>Requirements</h3>
      <ul>
        {job.requirements.map((req, index) => (
          <li key={index}>{req}</li>
        ))}
      </ul>
    </div>
  );
};

export default JobPage;