const Job = require('../models/jobModel');
const mongoose = require('mongoose');

// Get All
const getAllJobs = async (req, res) => {
    try {
        const jobs = await Job.find({}).sort({ createdAt: -1 });
        if (jobs.length === 0) {
            return res.status(404).json({ message: 'No jobs found' });
        }
        res.status(200).json(jobs);
    } catch (error) {
        console.error('Error fetching jobs:', error);
        res.status(500).json({ error: 'Failed to retrieve jobs' });
    }
}

// Get One
const getJob = async (req, res) => {
    const { jobId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(jobId)) {
        return res.status(404).json({ error: 'Invalid ID' });
    }

    try {
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({ error: 'Job does not exist' });
        }
        res.status(200).json(job);
    } catch (error) {
        console.log('Server error: ', error);
        res.status(500).json({ error: 'Failed to retrieve job' });
    }
}

// Add One
const createJob = async (req, res) => {
    try {
        const job = new Job({ ...req.body });
        await job.save();
        res.status(201).json(job);
    } catch (error) {
        console.error('Error creating job:', error);
        res.status(400).json({ error: 'Failed to create job' });
    }
}

// Update One
const updateJob = async (req, res) => {
    const { jobId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(jobId)) {
        return res.status(404).json({ error: 'Invalid ID' });
    }
    try {
        const job = await Job.findOneAndUpdate({ _id: jobId }, {
            ...req.body
        }, { new: true });
        if (!job) {
            return res.status(404).json({ error: 'Job does not exist' });
        }
        res.status(200).json(job);
    } catch (error) {
        console.log('Server error:', error);
        res.status(500).json({ error: 'Failed to update job' });
    }
}

// Delete One
const deleteJob = async (req, res) => {
    const { jobId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(jobId)) {
        return res.status(404).json({ Error: 'Invalid ID' });
    }
    try {
        const job = await Job.findOneAndDelete({ _id: jobId });
        res.status(200).json(job);
    } catch (error) {
        console.log('Server error:', error);
        res.status(500).json({ Error: 'Failed to delete job' });
    }
}

// Export Controller
module.exports = {
    getAllJobs,
    getJob,
    createJob,
    updateJob,
    deleteJob
};