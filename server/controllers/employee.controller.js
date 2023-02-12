const db = require("../models");
const Employee = db.employees;
const { getAuth } = require ("firebase-admin/auth");
const bcrypt = require('bcrypt');

// Create and Save a new Employee
exports.create = (req, res) => {
    // Validate request
    if (!req.body.firstName) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    }
   
    // Create a Employee
    const employee = new Employee({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phone: req.body.phone,
      adress: req.body.adress,
      birthDate: req.body.birthDate,
      gender: req.body.gender,
      salary: req.body.salary,
      job: req.body.job,
      email: req.body.email,
      password:req.body.password,
      role: req.body.role,
    });

   
    // Save Employee in the database
    employee
      .save(employee)
      .then(data => {
        res.send(data);
        //create user in firebase
        getAuth()
        .createUser({
          email: data.email,
          password: data.password,
          uid: data.id,
        })
        .then((userRecord) => {
          // See the UserRecord reference doc for the contents of userRecord.
          console.log('Successfully created new user:', userRecord.uid);
         
        })
        .catch((error) => {
          console.log('Error creating new user:', error);
        });

      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the employee."
        });
      });
  };
  // Retrieve all Employee from the database.
exports.findAll = (req, res) => {
    Employee.find()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Employee."
        });
      });
  };

  // Find a single employee with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Employee.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found Employee with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving Employee with id=" + id });
      });
  };

  // Update a Employee by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!"
      });
    }

    const id = req.params.id;

    Employee.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update Employee with id=${id}. Maybe Employee was not found!`
          });
        } else {
          res.send({ message: "Employee was updated successfully." });
          //upadte the user in the firebase 
          getAuth()
          .updateUser(id, {
            email: req.body.email,
            password:req.body.password,
              
          })
          .then((userRecord) => {
            // See the UserRecord reference doc for the contents of userRecord.
            console.log('Successfully updated user', userRecord.toJSON());

          })
          .catch((error) => {
            console.log('Error updating user:', error);
          });
  
        
        
            }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Employee with " 
        });
      });
  };

  // Delete a Employee with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  
    Employee.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Employee with id=${id}. Maybe Empolyee was not found!`
          });
        } else {
          res.send({
            message: "Employee was deleted successfully!"
          });

          //delete user in firebase
          getAuth()
              .deleteUser(id)
              .then(() => {
                console.log('Successfully deleted user');
              })
              .catch((error) => {
                console.log('Error deleting user:', error);
              });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Employee with id=" + id
        });
      });
  };





exports.findAllPublished = (req, res) => {
  
};