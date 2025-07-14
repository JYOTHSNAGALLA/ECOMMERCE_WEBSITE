// model/UserModel.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//const ecomDbConnection = mongoose.connection.useDb('ecomDb');

const userSchema = new Schema({
  name: { type: String, required: true, trim: true },
  phone: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true },
  dp: {
    type: String,
    default: 'https://placehold.co/100x100/A0B0C0/FFFFFF?text=DP'
  },
  cart: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
  order: [{ type: Schema.Types.ObjectId, ref: 'Order' }],
  history: [{ type: Schema.Types.ObjectId, ref: 'PurchaseBook' }]
}, {
  timestamps: true
});

const UserModel = mongoose.model('User', userSchema);
module.exports = UserModel;