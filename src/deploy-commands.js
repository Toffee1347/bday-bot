// @ts-nocheck
import fetch from 'node-fetch';
import {commands, adminCommands} from './commands.js';

import dotenv from 'dotenv';
dotenv.config();

async function registerGuildCommands(env, commands) {
	const applicationId = env.APPLICATION_ID;
	const devGuildId = env.DEV_GUILD_ID;

	const url = `https://discord.com/api/v10/applications/${applicationId}/guilds/${devGuildId}/commands`;
	await registerCommands(url, env.token, commands);
}

async function registerGlobalCommands(env, commands) {
	const applicationId = env.APPLICATION_ID;
	const url = `https://discord.com/api/v10/applications/${applicationId}/commands`;
	await registerCommands(url, env.token, commands);
}

async function registerCommands(url, token, commands) {
	const response = await fetch(url, {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bot ${token}`,
		},
		method: 'PUT',
		body: JSON.stringify(commands),
	});
	
	if (response.ok) {
		console.log('Registered all commands');
	} else {
		console.error('Error registering commands');
		const text = await response.text();
		console.error(text);
	}
	return response;
}

async function initRegisterCommands(type) {
	const env = process.env;

	if (type === 'guild') {
		await registerGuildCommands(env, [...commands, ...adminCommands]);
	} else {
		await registerGlobalCommands(env, commands);
		await registerGuildCommands(env, adminCommands);
	}
}

initRegisterCommands('guild');
