const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;
const bcrypt = require("bcrypt");
var uniqueValidator = require("mongoose-unique-validator");

const UserSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
    },
    password: String,
    cart:{
      type: [{type : ObjectId,ref:'products'}]
    }
  },
  { timestamps: true }
);
UserSchema.plugin(uniqueValidator);

//hash password
UserSchema.pre("save", function (next) {
  const user = this;
  bcrypt.hash(user.password, 10, (error, hash) => {
    user.password = hash;
    next();
  });
});

// export model
const User = mongoose.model("User", UserSchema);
module.exports = User;
