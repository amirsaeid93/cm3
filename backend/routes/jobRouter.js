const express = require("express");
const {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob
} = require("../controllers/jobController");

const router = express.Router();

router.get("/", getAllJobs); // Ensure this route is correct
router.get("/:jobId", getJob);
router.post("/", createJob);
router.put("/:jobId", updateJob);
router.delete("/:jobId", deleteJob);

module.exports = router;