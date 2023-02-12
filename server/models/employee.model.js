const validator = require('validator');
module.exports = mongoose => {

    var schema = mongoose.Schema(
      {
        firstName:{
          type:String,
          required: [true, 'first name required'],
          minlength:[3,'Minimun length 3 characters']
        }, 
        lastName: {
          type:String,
          required: [true, 'last name required'],
          minlength:[3,'Minimun length 3 characters']
        }, 
        phone: {
          type: String,
          required: [true, 'phone required'],
         //async validation
            validate: {
              validator: function (v) {
              return new Promise(function (resolve, reject) {
              //resolve(true) pass valitation
              //resolve(false) fail valitation
              const regexPhone = /^(00213|\+213|0)(5|6|7)[0-9]{8}$/
              resolve(regexPhone.test(v));
              });
              },
              message: props => `${props.value} is not a valid phone format!`
              }
       
          },
          
        adress:{
          type:String,
          required: [true, 'adress required']
        }, 
        birthDate: {
          type:Date,
          max:Date.now
        }, 
        gender:  {
          type:String,
          required: [true, 'gender required'],
          enum: ['male', 'female']
        },

        salary:{
          type:Number,
          required: [true, 'salary required'],
          min:0
        }, 
        job: {
          type:String,
          required: [true, 'job required'],
          minlength:[3,'Minimun length 3 characters']
        }, 
        email:  {
          type:String,
          required: [true, 'email required'],
          unique:true,
          validate: validateEmail,
        },
        password: {
          type:String,
          required: [true, 'password required']
        }, 
        role:  {
          type:String,
          required: [true, 'role required'],
          enum: ['manager', 'employee']
        },

      },
      { timestamps: true }
    );

    async function validateEmail(email,id) {
      if (!validator.isEmail(email)) throw new Error("Please enter a valid email address.")
      const user = await this.constructor.findOne({ email:email, id:!id })
      if (user) throw new Error("A user is already registered with this email address.")
    }
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const Employee = mongoose.model("employee", schema);
    return Employee;
  };





  