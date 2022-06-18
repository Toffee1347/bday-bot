// @ts-nocheck
import fetch from 'node-fetch';
import {commands, adminCommands} from './commands.js';

import dotenv from 'dotenv';
dotenv.config();

const production = process.argv.includes('--production') || process.argv.includes('-p');
if (production) console.log('Registering commands with production variables');
else console.log('Registering commands with development variables');

const global = process.argv.includes('--global') || process.argv.includes('-g');
if (global) console.log('Registering commands globally');
else console.log('Registering commands for guild');

const envVars = process.env;
const env = {
	application_id: production ? envVars.producation_application_id : envVars.application_id,
	guild_id: production ? envVars.producation_guild_id : envVars.guild_id,
	token: production ? envVars.production_token : envVars.token,
}

if (global) {
	await registerGlobalCommands(commands);
	await registerGuildCommands(adminCommands);
} else {
	await registerGuildCommands([...commands, ...adminCommands]);
}

async function registerGuildCommands(commands) {
	const applicationId = env.application_id;
	const devGuildId = env.guild_id;

	const url = `https://discord.com/api/v10/applications/${applicationId}/guilds/${devGuildId}/commands`;
	await registerCommands(url, commands);
}

async function registerGlobalCommands(commands) {
	const applicationId = env.application_id;
	const url = `https://discord.com/api/v10/applications/${applicationId}/commands`;
	await registerCommands(url, commands);
}

async function registerCommands(url, commands) {
	const response = await fetch(url, {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bot ${env.token}`,
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
