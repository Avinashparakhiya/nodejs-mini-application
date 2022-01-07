const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  id: String,
  login_method: String,
});

const User = mongoose.model('user', userSchema);

module.exports = User;
