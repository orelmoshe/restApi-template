import { HttpCodes } from '../shared';
import joi from '@hapi/joi';
import DBService from '../services/db.service';
class IndexController {
	static instance;

	constructor() {
		if (IndexController.instance) {
			return IndexController.instance;
		}
		IndexController.instance = this;
	}
	test(req, res, next) {
		try {
			res.status(HttpCodes.OK).json({ message: 'Test success' });
		} catch (ex) {
			console.error(ex);
			res.status(HttpCodes.ERROR).json({ message: ex });
		}
	}

	async getExample(req, res, next) {
		try {
			const db = new DBService();
			const example = await db.getExample();
			res.status(HttpCodes.OK).json({ message: example });
		} catch (ex) {
			console.error(ex);
			res.status(HttpCodes.ERROR).json({ message: ex });
		}
	}

	async createExample(req, res, next) {
		try {
			const schema = joi.object().keys({
				example: joi.string().required(),
			});

			const result = schema.validate(req.body);

			if (result.error) {
				throw result.error.message;
			}
			const db = new DBService();
			const example = await db.createExample(req.body);
			res.status(HttpCodes.CREATED).json({ message: example });
		} catch (ex) {
			console.error(ex);
			res.status(HttpCodes.ERROR).json({ message: ex });
		}
	}

	async updateExample(req, res, next) {
		try {
			const schema = joi.object().keys({
				example: joi.string().required(),
			});

			const result = schema.validate(req.body);

			if (result.error) {
				throw result.error.message;
			}
			const db = new DBService();
			await db.updateExample({ _id: req.params.id }, req.body);
			res.status(HttpCodes.OK).json({ message: 'OK' });
		} catch (ex) {
			console.error(ex);
			res.status(HttpCodes.ERROR).json({ message: ex });
		}
	}

	async deleteExample(req, res, next) {
		try {
			const schema = joi.object().keys({
				id: joi.string().required(),
			});

			const result = schema.validate(req.params);

			if (result.error) {
				throw result.error.message;
			}
			const db = new DBService();
			await db.deleteExample(req.params.id);
			res.status(HttpCodes.OK).json({ message: 'OK' });
		} catch (ex) {
			console.error(ex);
			res.status(HttpCodes.ERROR).json({ message: ex });
		}
	}
}

export default IndexController;
