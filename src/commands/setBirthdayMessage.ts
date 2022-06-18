import { formatBirthdayMessage } from '../birthdayUtils';
import {Env} from './../index';
import {Message} from './../utils';

export default async function setBithdayMessage(message: string, userId: string, userName: string, env: Env): Promise<Message> {
	await env.BOT_KV.put('birthdayMessage', message);
	return new Message(`Updated birthday message\nExample: '${formatBirthdayMessage(message, userId, userName)}'`);
}
