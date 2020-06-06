const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const schema = new Schema({
  name: { type: String },
  price:{ type: Number },
  quantity:{ type: Number },
  color:{ type: String }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

module.exports = mongoose.model('Product', schema);
