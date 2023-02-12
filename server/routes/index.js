module.exports = app =>{
    app.use('/api/employees',require("./employee.routes")(app));
};