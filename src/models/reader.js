module.exports = (connection, DataTypes) => {
  const schema = {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: {
          args: [true],
          msg: "Please enter a correct email address.",
        },

        notNull: {
          msg: "Email cannot be empty",
        },
        notEmpty: {
          msg: "Please enter a correct email address.",
        },
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: [true],
          msg: "Please enter your name. This field can't be empty",
        },
        notNull: {
          msg: "Name cannot be empty",
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [8],
          msg: "Please enter a password containing 8 characters or more.",
        },
        notNull: {
          msg: "Password field cannot be empty",
        },
      },
    },
  };

  const ReaderModel = connection.define("Reader", schema);
  return ReaderModel;
};
