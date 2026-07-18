import cors from 'cors';
import express from 'express';
import { errorHandler, notFoundHandler } from './middlewares/error.middleware.js';
import courseRoutes from './routes/course.routes.js';
import lectureRoutes from './routes/lecture.routes.js';
import sectionRoutes from './routes/section.routes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/courses', courseRoutes);
app.use('/courses/:courseId/sections', sectionRoutes);
app.use('/courses', lectureRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
