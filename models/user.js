const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'User name required'],
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: [true, 'User Decription required'],
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: [true, 'Avatar required'],
    validate: {
      validator(v) {
        return /^(http[s]?:\/\/[www]?)[a-zA-Z0-9-._~:/?%#[\]@!$&'()*+,;=]+\.[a-zA-Z]+\/?[a-zA-Z0-9-._~:/?%#[\]@!$&'()*+,;=]*$/i.test(v);
      },
      message: (props) => `${props.value} is not a valid URL`,
    },
  },
});

module.exports = mongoose.model('user', userSchema);
