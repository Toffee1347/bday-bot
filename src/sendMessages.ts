import {Env} from "./index";
import {formatBirthdayMessage, getBirthdaysToday} from "./birthdayUtils";
import makeDmChannel from "./discord/makeDmChannel";
import sendMessage from "./discord/sendMessage";

export default async function sendMessages(env: Env): Promise<void> {
	const baseMessage = await env.BOT_KV.get('birthdayMessage') || 'Happy birthday!';
	const users = await getBirthdaysToday(env);

	for (const userId of users) {
		const userChannel = await makeDmChannel(userId, env);

		const userName = userChannel.recipients?.find(recipient => recipient.id === userId)?.username || `<@${userId}>`;
		await sendMessage(userChannel.id, formatBirthdayMessage(baseMessage, userId, userName), env).catch(e => console.error('Failed to send birthday message', e));
		console.log(`Sent birthday message to ${userId}`);
	}
}
