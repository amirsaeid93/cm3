const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const Job = require("../models/jobModel");

const requireAuth = async (req, res, next) => {
    // verify user is authenticated
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ error: "Authorization token required" });
    }

    const token = authorization.split(" ")[1];

    try {
        const { _id } = jwt.verify(token, process.env.SECRET);

        req.user = await User.findOne({ _id }).select("_id");
        req.jobs = await Job.find({ userId: _id }).select("_id title"); // Assuming jobs are associated with userId
        // console.log(req.user, req.jobs);
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({ error: "Request is not authorized" });
    }
};

module.exports = requireAuth;