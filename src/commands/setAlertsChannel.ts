import { PermissionFlagsBits } from 'discord-api-types/v10';
import {addGuildToAlerts, removeGuildAlerts, setAlertsChannel} from '../alertsUtils';
import { formatBirthdayMessage } from '../birthdayUtils';
import {Message} from '../utils';
import {Env} from './../index';

export default async function setAlertsChannelCommand(channelId: string, guildId: string, message: string, permissionsFlag: string, userId: string, env: Env): Promise<Message> {
	if (!(BigInt(permissionsFlag) & PermissionFlagsBits.ManageChannels)) {
		return new Message('You need to have the `Manage Channel` permission to run this command!');
	}

	if (channelId === '') {
		await setAlertsChannel(guildId, '', '', env);
		await removeGuildAlerts(guildId, env);
		return new Message('The alerts channel has been removed');
	}
	await setAlertsChannel(guildId, channelId, message, env);
	await addGuildToAlerts(guildId, env);
	return new Message(`Set birthday alerts channel to <#${channelId}>\nExample message: ${formatBirthdayMessage(message, userId)}\nWarning: This feature will only 100% work if the server has less than 500 members`);
}
