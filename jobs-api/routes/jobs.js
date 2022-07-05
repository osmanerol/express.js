import express from 'express'
import jobsController from '../controllers/jobs.js'

const router = express.Router()

router.route('/')
  .get(jobsController.getAllJobs)
  .post(jobsController.createJob)

router.route('/:id')
  .get(jobsController.getJob)
  .put(jobsController.updateJob)
  .delete(jobsController.deleteJob)

export default router