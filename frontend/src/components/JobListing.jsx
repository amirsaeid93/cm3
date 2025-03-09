import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const JobListingPage = ({ onDelete, onUpdate }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedDescription, setEditedDescription] = useState('');

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/jobs/${id}`);
        setJob(response.data);
        setEditedDescription(response.data.description);
      } catch (error) {
        console.error('Error fetching job:', error);
        setError(error.message);
      }
    };

    fetchJob();
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:4000/api/jobs/${id}`);
      onDelete(id);
      navigate('/');
    } catch (error) {
      console.error('Error deleting job:', error.response ? error.response.data : error.message);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      const updatedJob = { ...job, description: editedDescription };
      await axios.put(`http://localhost:4000/api/jobs/${id}`, updatedJob);
      onUpdate(updatedJob);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating job:', error.response ? error.response.data : error.message);
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!job) {
    return <div>Loading...</div>;
  }

  return (
    <div className="job-details">
      <h2>{job.title}</h2>
      {isEditing ? (
        <textarea
          value={editedDescription}
          onChange={(e) => setEditedDescription(e.target.value)}
        />
      ) : (
        <p>{job.description}</p>
      )}
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
      <button onClick={handleDelete}>Delete</button>
      {isEditing ? (
        <button onClick={handleSave}>Save</button>
      ) : (
        <button onClick={handleEdit}>Edit</button>
      )}
    </div>
  );
};

export default JobListingPage;