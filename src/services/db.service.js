import mongoose from 'mongoose';
import Example from '../models/example';

export default class DBService {
	static instance;

	constructor() {
		if (DBService.instance) {
			return DBService.instance;
		}
		DBService.instance = this;
	}

	async connection(name_db) {
		try {
			await mongoose.connect(`mongodb://localhost/${name_db}`, {
				useNewUrlParser: true,
				useUnifiedTopology: true,
				useCreateIndex: true,
				useFindAndModify: false,
				retryWrites: false,
			});
		} catch (ex) {
			console.error(ex);
			process.exit(1);
		}
	}

	async getExample() {
		try {
			const example_data = await Example.find({});
			return example_data;
		} catch (ex) {
			console.error(ex);
			throw 'Failed to get all examples';
		}
	}

	async createExample(obj) {
		try {
			const session = await mongoose.startSession();
			await session.startTransaction();
			const example = new Example(obj);
			await example.save(session);
			await session.commitTransaction();
			session.endSession();
			return example;
		} catch (ex) {
			console.error(ex);
			await session.abortTransaction();
			await session.endSession();
			throw 'Failed to add example';
		}
	}

	async deleteExample(id) {
		try {
			const session = await mongoose.startSession();
			await session.startTransaction();
			const example = await Example.findOne({ _id: id });
			await example.deleteOne(session);
			await session.commitTransaction();
			session.endSession();
		} catch (ex) {
			console.error(ex);
			await session.abortTransaction();
			await session.endSession();
			throw 'Failed to delete example';
		}
	}

	/**
	 * update item
	 * @param {*} query
	 * @param {*} newValues
	 */

	async updateExample(query, newValues) {
		try {
			const session = await mongoose.startSession();
			await session.startTransaction();
			await Example.updateOne(
				query,
				{
					$set: newValues,
				},
				{ upsert: true, ...session }
			);
			await session.commitTransaction();
			session.endSession();
		} catch (ex) {
			console.error(ex);
			await session.abortTransaction();
			await session.endSession();
			throw 'Failed to update example';
		}
	}
}
