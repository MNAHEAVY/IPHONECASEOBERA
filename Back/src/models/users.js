const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");

const usersSchema = new mongoose.Schema({
  email: { type: String, required: true },
  userName: { type: String, required: true },
  userImage: { type: String, required: false },
  password: [{ type: String, required: true }],

  country: { type: String, required: false },
  city: { type: String, required: false },

  isAdmin: { type: Boolean, required: false, default: false },
  isBanned: { type: Boolean, required: false, default: false },
  purchase_order: {
    products: [
      {
        products: {
          type: Schema.Types.ObjectId,
          ref: "products",
        },
        quantity: {
          type: Number,
        },
      },
    ],

    buyHistory: { type: [Schema.Types.ObjectId], ref: "transaction" },
  },
});

const Users = mongoose.model("users", usersSchema);

module.exports = Users;
