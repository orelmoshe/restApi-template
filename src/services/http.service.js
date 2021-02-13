import AxiosService from './axios.service';

const prefix = 'http://api-example/';
const apiKey = 'set-apiKey';
const ApiRoutes = {
	EXAMPLE: `${prefix}/set-path-url`,
};

export default class HttpService {
	static instance;
	axiosService;

	constructor() {
		if (HttpService.instance) {
			return HttpService.instance;
		}
		HttpService.instance = this;
		this.axiosService = new AxiosService();
	}

	async getExample() {
		try {
			const response = await this.axiosService.get(ApiRoutes.EXAMPLE, {});
			return response;
		} catch (ex) {
			console.error(ex);
			throw ex;
		}
	}

	async postExample() {
		try {
			const response = await this.axiosService.post(ApiRoutes.EXAMPLE, {});
			return response;
		} catch (ex) {
			console.error(ex);
			throw ex;
		}
	}
}
