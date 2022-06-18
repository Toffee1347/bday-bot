import {Env} from './../index';

const requestQueue: {
	apiUrl: string;
	method: 'GET' | 'POST' | 'PUT' | 'DELETE';
	body: any;
	resolve: (value: any) => void;
	reject: (reason: any) => void;
}[] = [];
let requestQueueRunning = false;

export default function makeRequest<T>(apiUrl: string, method: 'GET' | 'POST' | 'PUT' | 'DELETE', body: any, env: Env): Promise<T> {
	return new Promise((resolve, reject) => {
		requestQueue.push({
			apiUrl,
			method,
			body,
			resolve,
			reject,
		});
		runRequestQueue(env);
	});
}

async function runRequestQueue(env: Env, ignoreRequestRunning = false) {
	if (!ignoreRequestRunning && requestQueueRunning) return;
	requestQueueRunning = true;
	const request = requestQueue.shift();
	if (!request) {
		requestQueueRunning = false;
		return;
	}
	let requestOptions: RequestInit = {
		method: request.method,
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bot ${env.token}`,
		},
	};
	if (request.method === 'POST') {
		requestOptions.body = JSON.stringify(request.body);
	}
	const req = await fetch(`https://discord.com/api/v10${request.apiUrl}`, requestOptions);
	const res = await req.json();
	if (req.status !== 200) {
		request.reject(res);
	} else {
		request.resolve(res);
	}

	const rateLimit = req.headers.get('x-ratelimit-remaining');
	if (rateLimit === '0') {
		const retryAfter = req.headers.get('x-ratelimit-reset-after');
		console.log(`Rate limit recieved, retrying in ${retryAfter} seconds`);
		const retryTime = parseFloat(retryAfter || '5');
		setTimeout(() => {
			runRequestQueue(env, true);
		}, retryTime * 1000);
		return;
	}

	runRequestQueue(env, true);
}
