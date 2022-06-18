import {Env} from "./index";
import {formatBirthdayMessage, getPeopleOnDay} from "./birthdayUtils";
import makeDmChannel from "./discord/makeDmChannel";
import sendMessage from "./discord/sendMessage";

export default async function sendMessages(env: Env): Promise<void> {
	console.log('Initializing birthday messages');

	const date = new Date();
	const day = {
		day: date.getDate(),
		month: date.getMonth(),
	};

	const baseMessage = await env.BOT_KV.get('birthdayMessage') || 'Happy birthday!';

	const users = await getPeopleOnDay(day, false, env);

	for (const userId of users) {
		console.log(`Sending birthday message to ${userId}`);
		const userChannel = await makeDmChannel(userId, env);

		const userName = userChannel.recipients?.find(recipient => recipient.id === userId)?.username || `<@${userId}>`;
		await sendMessage(userChannel.id, formatBirthdayMessage(baseMessage, userId, userName), env);
		console.log(`Sent birthday message to ${userId}`);
	}
}
