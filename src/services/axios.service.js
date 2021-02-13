import axios from 'axios';

export default class AxiosService {
	static instance;

	constructor() {
		if (AxiosService.instance) {
			return AxiosService.instance;
		}
		AxiosService.instance = this;
	}

	defaultOnError = (err) => {
		if (!err) {
			return;
		}
		// console.log('err ?', err);
		if (err.status === 400) {
			throw 'got status 400 - bad request';
		}
		if (err.status === 401) {
			throw 'got status 401 - unauthorized';
		}
		if (err.status === 404) {
			throw 'got status 404 - not found';
		}
		throw err;
	};

	defaultOnSuccess = (response) => {
		// console.log('response ?', response);
		return response;
	};

	get = async (route, params, onSuccess, onError) => {
		if (!onSuccess) {
			onSuccess = this.defaultOnSuccess;
		}
		if (!onError) {
			onError = this.defaultOnError;
		}
		try {
			const response = await axios.get(route, params);
			return onSuccess(response.data);
		} catch (error) {
			onError(error);
		}
	};

	post = async (route, params, onSuccess, onError) => {
		if (!onSuccess) {
			onSuccess = this.defaultOnSuccess;
		}
		if (!onError) {
			onError = this.defaultOnError;
		}
		const options = {
			headers: { 'Content-Type': 'application/json' },
		};
		try {
			const response = await axios.post(route, params, options || {});
			return onSuccess(response.data);
		} catch (error) {
			onError(error);
		}
	};
}
