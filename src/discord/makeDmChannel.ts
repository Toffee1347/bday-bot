import {APIDMChannel, Routes} from 'discord-api-types/v10';

import {Env} from './../index';
import makeRequest from './makeRequest';

export default async function makeDmChannel(userId: string, env: Env): Promise<APIDMChannel> {
	const channel = await makeRequest(Routes.userChannels(), 'POST', {
		recipient_id: userId,
	}, env) as APIDMChannel;
	return channel;
}
