//import { isAbsolute } from 'path';
const { isAbsolute } = require('path');
const { residents } = require('../models/residents');

const residentsController = {
  add: (req, res) => {
    // add a new resident item
    const { name, address, phone, gender, email } = req.body;

    const id = residents.length + 1;
    const newResident = {
      id,
      name,
      address,
      phone,
      gender,
      email
    };

    if (typeof newResident === 'object') {
      residents.push(newResident);
      return res.json({
        status: 201,
        data: {
          message: 'resident record created successfully',
          resident: newResident,
        },
      });
    }

    return res.json({
      status: 400,
      error: 'error adding new resident',
    });
  },
  get: (req, res) => res.json({
    // retrieve all available residents
    status: 200,
    data: {
      message: 'residents retrieved successfully',
      residents,
    },
  }),
  getByID: (req, res) => {
    // retrieve food object using id
    const id = parseInt(req.params.id, 10);

    if (id < 1) {
      return res.json({
        status: 400,
        error: 'id is inavlid',
      });
    }
    residents.map((resident) => {
      if (resident.id === id) {
        return res.json({
          status: 200,
          data: {
            message: 'resident retrieved successfully',
            resident,
          },
        });
      }
    });
    return res.json({
      status: 404,
      error: 'resident not available',
    });
  },
  edit: (req, res) => {
    // modify detail of resident's record
    const { id } = req.params;
    const residentId = parseInt(id, 10);

    const foundResident = {};
    let position;

    const { name, address, phone, gender, email } = req.body;

    residents.map((resident, index) => {
      if (resident.id === residentId) {
        position = index;
        foundResident.id = resident.id;
        foundResident.name = name || resident.name;
        foundResident.address = address || resident.address;
        foundResident.phone = phone || resident.phone;
        foundResident.gender = gender || resident.gender;
        foundResident.email = email || resident.email;
      }
    });

    if (typeof foundResident !== 'object') {
      return res.json({
        status: 404,
        error: 'resident not found',
      });
    }

    foods.splice(position, 1, foundResident);
    return res.json({
      status: 201,
      data: {
        message: 'resident record update successfully',
        resident: foundResident,
      },
    });
  },
  remove: (req, res) => {
    // remove resident by id
    const id = parseInt(req.params.id, 10);

    if (id < 1) {
      return res.json({
        status: 400,
        error: 'id is invalid',
      });
    }

    let position;

    residents.map((resident, index) => {
      if (resident.id === id) {
        position = index;
      }
    });

    if (typeof position !== 'undefined') {
      residents.splice(position, 1);
      return res.json({
        status: 200,
        data: {
          message: 'resident deleted successfully',
          foods,
        },
      });
    }

    return res.json({
      status: 404,
      error: 'resident not found',
    });
  },
};

module.exports = { residentsController };