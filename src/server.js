import express from 'express';
import router from './routes/routes';
import DBService from '../src/services/db.service';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(function (req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
	res.setHeader('Access-Control-Allow-Credentials', 'true');
	next();
});

app.use(router);

app.listen(process.env.PORT || PORT, async () => {
	try {
		console.log(`server listening on port ${PORT}`);
		const db = new DBService();
		await db.connection('example');
		console.log('success db connection');
	} catch (ex) {
		console.error(ex);
		process.exit(1);
	}
});

export default app;
