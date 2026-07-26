import Enrollment from "../models/enrollment.model.js";

export const isEnrolled = async (req, res, next) => {
    try {
        const { courseId } = req.params;
        const userId = req.user._id;

        console.log({ userId, courseId });

        const enrolledStatus = await Enrollment.findOne({
            userId,
            courseId,
        });

        console.log("is enrolled",enrolledStatus);

        if (!enrolledStatus) {
            return res.status(403).json({
                success: false,
                message: "You are not enrolled in this course."
            });
        }

        next();

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
};