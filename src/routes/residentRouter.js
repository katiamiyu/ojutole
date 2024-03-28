const express = require('express');
const { residentsController  } = require('../controllers/residentsController');

const residentRouter = express.Router();

residentRouter.route('/residents')
  .get(residentsController.get)
  .post(residentsController.add);

residentRouter.route('/residents/:id')
  .get(residentsController.getByID)
  .put(residentsController.edit)
  .delete(residentsController.remove);

module.exports = { residentRouter };