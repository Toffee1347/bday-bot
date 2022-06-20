import {APIPingInteraction} from 'discord-api-types/payloads/v10/_interactions/ping';
import {InteractionType, InteractionResponseType, APIChatInputApplicationCommandInteraction} from 'discord-api-types/v10';

import {JsonResponse} from './utils';
import {verify} from './discord/verifiy';
import onCommand from './onCommand';
import sendMessages from './sendMessages';
import sendAlerts from './sendAlerts';

export interface Env {
	BOT_KV: KVNamespace;
	discord_public_key: string;
	token: string;
}

export default {
	async fetch(
		req: Request,
		env: Env,
		ctx: ExecutionContext
	): Promise<Response> {
		if (req.method !== 'POST') return new Response('Method Not Allowed.', { status: 405 });

		// Verifying the request has come from Discord
		if (!await verify(req, env)) return new Response('Bad request', { status: 403 });
	  
		const command = await req.json() as APIPingInteraction | APIChatInputApplicationCommandInteraction;
		if (command.type === InteractionType.Ping) {
			// Respond to ping command from Discord
			return new JsonResponse({
				type: InteractionResponseType.Pong,
			});
		}
		if (command.type === InteractionType.ApplicationCommand) {
			return onCommand(command, env);
		}

		return new Response('Bad request', { status: 401 });
	},
	async scheduled(event: any, env: Env, ctx: ExecutionContext) {
		console.log('Initializing birthday messages');
		try {
			await sendMessages(env);
			console.log('All birthday messages sent');
		} catch (e) {
			console.error('Failed to send birdthday messages', e);
		}

		console.log('Initializing birthday alerts');
		try {
			await sendAlerts(env);
			console.log('All birthday alerts sent');
		} catch (e) {
			console.error('Failed to send birthday alerts', e);
		}
	},
};
