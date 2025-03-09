import { Link } from "react-router-dom";

const JobListings = ({ jobs, onDelete, onUpdate }) => {
  return (
    <div className="job-list">
      {jobs.map((job) => (
        <div className="job-preview" key={job._id}>
          <Link to={`/jobs/${job._id}`}>
            <h2>{job.title}</h2>
          </Link>
          <p>Type: {job.type}</p>
          <p>Company: {job.company.name}</p>
          <button onClick={() => onDelete(job._id)}>Delete</button>
          <Link to={`/edit-job/${job._id}`}>Edit</Link>
        </div>
      ))}
    </div>
  );
};

export default JobListings;