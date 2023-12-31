import express from 'express';
import userController from '../controllers/userController.js';
const users = express.Router();

users.route('/add')
  .get(userController.addUser);

users.route('/get')
  .get(userController.getUsers);

users.route('/sort_by_country')
  .post(userController.getUsersSortByCountry);

users.route('/sort_by_date')
  .post(userController.getUsersSortByDate);

users.route('/getfake')
  .get(userController.getFakeUsers);

users.route('/sort_fake_by_country')
  .post(userController.getUsersSortFakeByCountry);

users.route('/sort_fake_by_date')
  .post(userController.getUsersSortFakeByDate);  

export default users;