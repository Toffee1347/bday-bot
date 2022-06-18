import {Routes} from 'discord-api-types/v10';

import {Env} from './../index';
import makeRequest from './makeRequest';

export default async function sendMessage(channelId: string, message: string, env: Env): Promise<void> {
	await makeRequest(Routes.channelMessages(channelId), 'POST', {
		content: message,
	}, env);
}
