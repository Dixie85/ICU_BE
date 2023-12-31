import axios from "axios";
import userModel from "../models/userModel.js";
import { fakeDB } from '../../db/fakeDB.js'

// Using [x-forwarded-for] to get users IP and api.ipify
// curl http://localhost:3000/users
const addUser = async (req, res) => {
  try {
    const date = new Date().toISOString().split('T')[0];

    const { data } = await axios.get('https://api.ipify.org');
    const ip = req.headers['x-forwarded-for']?.split(',').shift() || data;
    
    // Use IP-API to get geospatial data)
    const ipApiResponse = await axios.get(`http://ip-api.com/json/${ip}`);
    const ipData = ipApiResponse.data;

    if (ipData.status === "fail") {
      return res.status(500).json({ error: "Error fetching geospatial data" });
    }

    // Providing geospatial data to the module to store it in the DB
    const addUserNoIpResponse = await userModel.addUser({ ip, lat: ipData.lat, lng: ipData.lon, country: ipData.country, date});
    
    res.status(201).json({ message: addUserNoIpResponse.message });
        
  } catch (error) {
    res.status(500).json( error.message );
  }
};

// curl http://localhost:3000/users/get
const getUsers = async (_req, res) => {
  try {
    const userData = await userModel.getUsers();
    res.json(userData);
  } catch (error) {
    res.status(500).json( error.message );
  }
};

//  curl -X POST -H "Content-Type: application/json" -d '{"country": "Sweden"}' http://localhost:3000/users/sort_by_country
const getUsersSortByCountry = async (req, res) => {
  try {
    const country = req.body
    const userData = await userModel.getUsersSortByCountry(country);

    res.json(userData);
  } catch (error) {
    res.status(500).json( error.message );
  }
};

//  curl -X POST -H "Content-Type: application/json" -d '{"date": "2023-12-29"}' http://localhost:3000/users/sort_by_date
const getUsersSortByDate = async (req, res) => {
  try {
    const date = req.body
    const userData = await userModel.getUsersSortByDate(date);

    res.json(userData);
  } catch (error) {
    res.status(500).json( error.message );
  }
};

// curl http://localhost:3000/users/getfake
const getFakeUsers = (_req, res) => {
  try {
    const userData = fakeDB();

    res.json(userData);
  } catch (error) {
    res.status(500).json( error.message );
  }
};

//  curl -X POST -H "Content-Type: application/json" -d '{"country": "Sweden"}' http://localhost:3000/users/sort_fake_by_country
const getUsersSortFakeByCountry = (req, res) => {
  try {
    const { country } = req.body
    const db = fakeDB();
    const userData = db.filter( u => u.country === country)

    res.json(userData);
  } catch (error) {
    res.status(500).json( error.message );
  }
};

//  curl -X POST -H "Content-Type: application/json" -d '{"date": "2023-12-29"}' http://localhost:3000/users/sort_fake_by_date
const getUsersSortFakeByDate = (req, res) => {
  try {
    const { date } = req.body
    const db = fakeDB();
    const userData = db.filter( u => u.date === date)

    res.json(userData);
  } catch (error) {
    res.status(500).json( error.message );
  }
};

export default {
addUser,
getUsers,
getUsersSortByCountry,
getUsersSortByDate,
getFakeUsers,
getUsersSortFakeByCountry,
getUsersSortFakeByDate
}