// model/OrderModel.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ecomDbConnection = mongoose.connection.useDb('ecomDb');

const orderSchema = new Schema({
  prod: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  delPt: { type: String, required: true, trim: true },
  status: {
    type: String,
    default: 'Pending',
    enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled']
  },
  approxDate: { type: Date },
  isDelivered: { type: Boolean, default: false },
  total: { type: Number, required: true, min: 0 }
}, {
  timestamps: true
});

const OrderModel = ecomDbConnection.model('Order', orderSchema);
module.exports = OrderModel;