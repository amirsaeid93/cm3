import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditJobPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState({
    title: '',
    type: '',
    description: '',
    company: {
      name: '',
      contactEmail: '',
      contactPhone: '',
      website: '',
      size: '',
    },
    location: '',
    salary: '',
    experienceLevel: '',
    applicationDeadline: '',
    status: '',
    requirements: [],
  });

  useEffect(() => {
    const fetchJob = async () => {
      const response = await fetch(`/api/jobs/${id}`);
      const data = await response.json();
      setJob(data);
    };

    fetchJob();
  }, [id]);

  const updateJob = async (updatedJob) => {
    const response = await fetch(`/api/jobs/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedJob),
    });

    if (response.ok) {
      navigate(`/jobs/${id}`);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJob((prevJob) => ({
      ...prevJob,
      [name]: value,
    }));
  };

  const handleCompanyChange = (e) => {
    const { name, value } = e.target;
    setJob((prevJob) => ({
      ...prevJob,
      company: {
        ...prevJob.company,
        [name]: value,
      },
    }));
  };

  const handleRequirementsChange = (e, index) => {
    const { value } = e.target;
    const newRequirements = [...job.requirements];
    newRequirements[index] = value;
    setJob((prevJob) => ({
      ...prevJob,
      requirements: newRequirements,
    }));
  };

  const addRequirement = () => {
    setJob((prevJob) => ({
      ...prevJob,
      requirements: [...prevJob.requirements, ''],
    }));
  };

  const removeRequirement = (index) => {
    const newRequirements = job.requirements.filter((_, i) => i !== index);
    setJob((prevJob) => ({
      ...prevJob,
      requirements: newRequirements,
    }));
  };

  const submitForm = (e) => {
    e.preventDefault();
    updateJob(job);
  };

  return (
    <form onSubmit={submitForm}>
      <input
        type="text"
        name="title"
        value={job.title || ''}
        onChange={handleChange}
        placeholder="Job Title"
      />
      <input
        type="text"
        name="type"
        value={job.type || ''}
        onChange={handleChange}
        placeholder="Job Type"
      />
      <textarea
        name="description"
        value={job.description || ''}
        onChange={handleChange}
        placeholder="Job Description"
      />
      <input
        type="text"
        name="location"
        value={job.location || ''}
        onChange={handleChange}
        placeholder="Location"
      />
      <input
        type="number"
        name="salary"
        value={job.salary || ''}
        onChange={handleChange}
        placeholder="Salary"
      />
      <input
        type="text"
        name="experienceLevel"
        value={job.experienceLevel || ''}
        onChange={handleChange}
        placeholder="Experience Level"
      />
      <input
        type="date"
        name="applicationDeadline"
        value={job.applicationDeadline || ''}
        onChange={handleChange}
        placeholder="Application Deadline"
      />
      <input
        type="text"
        name="status"
        value={job.status || ''}
        onChange={handleChange}
        placeholder="Status"
      />
      <h3>Company Details</h3>
      <input
        type="text"
        name="name"
        value={job.company.name || ''}
        onChange={handleCompanyChange}
        placeholder="Company Name"
      />
      <input
        type="email"
        name="contactEmail"
        value={job.company.contactEmail || ''}
        onChange={handleCompanyChange}
        placeholder="Contact Email"
      />
      <input
        type="text"
        name="contactPhone"
        value={job.company.contactPhone || ''}
        onChange={handleCompanyChange}
        placeholder="Contact Phone"
      />
      <input
        type="text"
        name="website"
        value={job.company.website || ''}
        onChange={handleCompanyChange}
        placeholder="Website"
      />
      <input
        type="number"
        name="size"
        value={job.company.size || ''}
        onChange={handleCompanyChange}
        placeholder="Company Size"
      />
      <h3>Requirements</h3>
      {job.requirements.map((req, index) => (
        <div key={index}>
          <input
            type="text"
            value={req || ''}
            onChange={(e) => handleRequirementsChange(e, index)}
            placeholder="Requirement"
          />
          <button type="button" onClick={() => removeRequirement(index)}>Remove</button>
        </div>
      ))}
      <button type="button" onClick={addRequirement}>Add Requirement</button>
      <button type="submit">Update Job</button>
    </form>
  );
};

export default EditJobPage;