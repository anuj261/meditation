const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const schema = new Schema({
  user_id: { type: String },
  product_id:{ type: String },
  viewDate:{
		type: Date,
		default: Date.now,
		required: 'Must have start date - default value is the created date'
	},
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

module.exports = mongoose.model('UserView', schema);
