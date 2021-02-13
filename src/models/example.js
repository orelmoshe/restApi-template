import mongoose from 'mongoose';

const exampleSchema = new mongoose.Schema({
	example: { type: String, required: true, unique: true },
});

const Example = new mongoose.model('Example', exampleSchema);

export default Example;
