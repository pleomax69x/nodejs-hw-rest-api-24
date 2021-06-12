const { Schema, model } = require("mongoose");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const { nanoid } = require("nanoid");
const { Gender } = require("../../helpers/constans");
const SALT_FACTOR = 6;

const userSchema = new Schema(
  {
    name: {
      type: String,
      minLength: 2,
      // required: true,
      default: "Guest",
    },
    gender: {
      type: String,
      enum: {
        values: [Gender.MALE, Gender.FEMALE, Gender.NONE],
        message: "But it not allowed",
      },
      default: Gender.NONE,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate(value) {
        const re = /\S+@\S+\.\S+/gi;
        return re.test(String(value).toLowerCase());
      },
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    password: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      default: null,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verifyToken: {
      type: String,
      required: [true, "Verify token is required"],
      default: nanoid(),
    },
    avatar: {
      type: String,
      default: function () {
        return gravatar.url(this.email, { s: 250 }, true);
      },
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(SALT_FACTOR);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

userSchema.methods.validPassword = async function (password) {
  return await bcrypt.compare(String(password), this.password);
};

const User = model("user", userSchema);

module.exports = User;
