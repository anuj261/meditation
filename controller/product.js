const mongoose = require('mongoose');
const moment = require('moment');

require('../models/product');
require('../models/purchase');
require('../models/user');

const Product = mongoose.model('Product');
const Purchase = mongoose.model('Purchase');
const User = mongoose.model('User');


const utility = require('../lib/utils');


/**
 * Create a Product
 * @param {*} req 
 * @param {*} res product details
 */
function createProduct(req, res, next) {
	const payload = req.body;
	const productQuery = {}

	const validate = utility.validateParams(payload, ['name', 'price', 'quantity']);
	if (validate) {
		return res.status(validate.status).json({
			error: validate.error
		})
	}

	productQuery.name = payload.name
	productQuery.price = payload.price
	productQuery.quantity = payload.quantity

	if (payload.color)
		productQuery.color = payload.color


	Product.create(productQuery, (err, productResults) => {
		if (err) {
			console.log(`error while creating product ${err || err.stack}`);

			if (err.code == 11000) {
				return res.status(400).json({
					error: 'Duplicate product'
				});
			}
			return res.status(400).json({
				error: 'something went wrong, please try again later'
			});
		}

		res.status(200).json({
			productResults,
			result: 'Product Created successfully'
		});
	});
}

/**
 * Create a Product purchase
 * @param {*} req 
 * @param {*} res product purchase details
 */
function createProductPurchase(req, res, next) {
	const payload = req.body;
	const productQuery = {}

	const validate = utility.validateParams(payload, ['user_id', 'product_id']);
	if (validate) {
		return res.status(validate.status).json({
			error: validate.error
		})
	}

	productQuery.user_id = payload.user_id
	productQuery.product_id = payload.product_id
	productQuery.date = payload.date

	Purchase.create(productQuery, (err, purchaseResults) => {
		if (err) {
			console.log(`error while creating product purchase ${err || err.stack}`);

			if (err.code == 11000) {
				return res.status(400).json({
					error: 'Duplicate record'
				});
			}
			return res.status(400).json({
				error: 'something went wrong, please try again later'
			});
		}

		res.status(200).json({
			purchaseResults,
			result: 'product purchase details stored successfully'
		});
	});
}

/**
 * To fetch details of product by id
 * @param {*} req product id
 * @param {*} res product details
 */
function productById(req, res) {

	let query = {}
	if (req.params && req.params.product_id && mongoose.Types.ObjectId.isValid(req.params.product_id)) {
		query["_id"] = req.params && req.params.product_id
	} else {
		return res.status(400).json({
			error: 'Invalid product id'
		});
	}

	Product.findOne(query, (err, productResult) => {
		if (err) {
			console.log(`error while fetching product ${err || err.stack}`);
			return res.status(400).json({
				error: 'something went wrong, please try again later'
			});
		} else if (!productResult || productResult && productResult.length < 1) {
			return res.status(400).json({
				error: 'Invalid product id'
			});
		}

		res.status(200).json(productResult);
	});
}

/**
 * To fetch details of product purchase by id
 * @param {*} req purchase id
 * @param {*} res product purchase details
 */
function purchaseById(req, res) {
	let query = {}
	if (req.params && req.params.purchase_id && mongoose.Types.ObjectId.isValid(req.params.purchase_id)) {
		query["_id"] = req.params && req.params.purchase_id
	} else {
		return res.status(400).json({
			error: 'Invalid purchase id'
		});
	}

	Purchase.findOne(query, (err, purchaseResult) => {
		if (err) {
			console.log(`error while fetching purchase ${err || err.stack}`);
			return res.status(400).json({
				error: 'something went wrong, please try again later'
			});
		} else if (!purchaseResult || purchaseResult && purchaseResult.length < 1) {
			return res.status(400).json({
				error: 'Invalid purchase id'
			});
		}

		res.status(200).json(purchaseResult);
	});
}

/**
 * To fetch details of product purchase list
 * @param {*} req purchase list
 * @param {*} res product purchase details
 */
function purchaselist(req, res) {
	let query = {}

	Purchase.find(query, (err, purchaseResult) => {
		if (err) {
			console.log(`error while fetching purchase ${err || err.stack}`);
			return res.status(400).json({
				error: 'something went wrong, please try again later'
			});
		} else if (!purchaseResult || purchaseResult && purchaseResult.length < 1) {
			return res.status(400).json({
				error: 'Invalid purchase id'
			});
		}

		res.status(200).json(purchaseResult);
	});
}

/**
 * To fetch details of product purchase list
 * @param {*} req purchase list
 * @param {*} res product purchase details
 */
function purchasebyproductFilter(req, res) {
	let filter = {},
		startDate, endDate;
	let filterby = req.query.filterby || req.query.filterBy
	let dateQuery = {}

	if (!filterby || typeof filterby == "undefined") {

	} else if (filterby == "today") {

		startDate = moment().startOf('day').toISOString();
		endDate = moment().endOf('day').toISOString();
	} else if (filterby == "tommorrow") {

		startDate = moment().add(1, 'day').startOf('day').toISOString();
		endDate = moment().add(1, 'day').endOf('day').toISOString();

	} else if (filterby == "yesterday") {
		startDate = moment().add(-1, 'day').startOf('day').toISOString();
		endDate = moment().add(-1, 'day').endOf('day').toISOString();
	} else if (filterby == "last2day") {
		startDate = moment().add(-2, 'day').startOf('day').toISOString();
		endDate = moment().endOf('day').toISOString();
	} else if (filterby == "custom") {
		if (req.query.startDate && req.query.endDate) {
			startDate = moment(req.query.startDate).startOf('day').toISOString();
			endDate = moment(req.query.endDate).endOf('day').toISOString();
		} else if (req.query.startDate) {
			startDate = moment(req.query.startDate).startOf('day').toISOString();
		} else if (req.query.endDate) {
			endDate = moment(req.query.endDate).endOf('day').toISOString();
		} else {
			return res.status(400).json({
				error: 'startDate and endDate is missing'
			});
		}

	}

	if (startDate && endDate) {
		dateQuery = {
			$gte: new Date(startDate),
			$lte: new Date(endDate)
		}
	} else if (startDate) {
		dateQuery = {
			$gte: new Date(startDate)
		}
	} else if (startDate) {
		dateQuery = {
			$lte: new Date(endDate)
		}
	}

	let query = [{
			$match: {
				date: dateQuery
			}
		},
		{
			$group: {
				_id: "$product_id",
				count: {
					$sum: 1
				},
				dates: {
					$push: "$date"
				}
			}
		},
		{
			$project: {
				_id: 0,
				product_id: "$_id",
				count: 1,
				dates: 1
			}
		}
	]

	Purchase.aggregate(query, (err, purchaseResult) => {

		if (err) {
			console.log(`error while fetching purchase ${err || err.stack}`);
			return res.status(400).json({
				error: 'something went wrong, please try again later'
			});
		}

		res.status(200).json(purchaseResult);
	});
}


module.exports = {
	createProduct,
	createProductPurchase,
	productById,
	purchaseById,
	purchaselist,
	purchasebyproductFilter
}