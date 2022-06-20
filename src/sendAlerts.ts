import {Env} from './index';
import {getAlertsChannel, getAllAlerts} from './alertsUtils';
import {formatBirthdayMessage, getBirthdaysToday} from './birthdayUtils';
import getGuildMembers from './discord/getGuildMembers';
import sendMessage from './discord/sendMessage';

export default async function sendAlerts(env: Env) {
	const alerts = await getAllAlerts(false, env);
	const users = await getBirthdaysToday(env);

	for (const guildId of alerts) {
		const alert = await getAlertsChannel(guildId, env);
		if (!alert.channelId) continue;

		const message = alert.message || 'Happy birthday {username}!';

		let guildMembers = await getGuildMembers(guildId, 500, env);
		for (const userId of guildMembers) {
			if (!users.includes(userId)) continue;
			sendMessage(alert.channelId, formatBirthdayMessage(message, userId), env).catch(e => console.error('Failed to send birthday alert', e));
		}
	}
}
