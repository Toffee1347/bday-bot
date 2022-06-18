import {APIApplicationCommandInteractionDataUserOption, APIChatInputApplicationCommandInteraction, ApplicationCommandOptionType} from 'discord-api-types/v10';

import setBirthdayCommand from './commands/setBirthday';
import getBirthdayCommand from './commands/getBirthday';
import setBithdayMessage from './commands/setBirthdayMessage';
import adminSetBirthday from './commands/adminSetBirthday';
import handleError from './handleError';
import {Message} from './utils';
import {Env} from './index';

export default async function onCommand(command: APIChatInputApplicationCommandInteraction, env: Env): Promise<Message> {
	const user = command.member?.user || command.user;
	if (!user) return new Message('Please either run this command in a server or DMs');

	try {
		switch (command.data.name) {
			case 'set-birthday':
				// Set option types for ts
				if (
					!command.data.options ||
					command.data.options[0].type !== ApplicationCommandOptionType.String ||
					command.data.options[1].type !== ApplicationCommandOptionType.Integer
				) return handleError();

				return await setBirthdayCommand(user.id, parseInt(command.data.options[0].value), command.data.options[1].value, env).catch(handleError);
			case 'get-birthday':
				// Set option types for ts
				if (
					command.data.options &&
					command.data.options[0].type !== ApplicationCommandOptionType.User
				) return handleError();

				return await getBirthdayCommand((<APIApplicationCommandInteractionDataUserOption> command.data.options?.[0])?.value || user.id, env).catch(handleError);
			case 'admin-set-birthday':
				// Set option types for ts
				if (
					!command.data.options ||
					command.data.options[0].type !== ApplicationCommandOptionType.String ||
					command.data.options[1].type !== ApplicationCommandOptionType.String ||
					command.data.options[2].type !== ApplicationCommandOptionType.Integer
				) return handleError();

				return await adminSetBirthday(command.data.options[0].value, parseInt(command.data.options[1].value), command.data.options[2].value, env).catch(handleError);
			case 'set-birthday-message':
				// Set option types for ts
				if (
					!command.data.options ||
					command.data.options[0].type !== ApplicationCommandOptionType.String
				) return handleError();

				return await setBithdayMessage(command.data.options[0].value, user.id, user.username, env).catch(handleError);
		}
	} catch (e) {
		console.error(e);
		return handleError();
	}
	return handleError();
}
