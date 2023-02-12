module.exports = app => {
    const employees = require("../controllers/employee.controller.js");
  
    var router = require("express").Router();

   // Create a new Employee
   router.post("/", employees.create);

   // Retrieve all Employee
  router.get("/", employees.findAll);
 
  // Retrieve a single Employee with id
  router.get("/:id", employees.findOne);
  
  // Update a Tutorial with id
    router.put("/:id", employees.update);

 // Delete a Tutorial with id
  router.delete("/:id", employees.delete);
return router
};