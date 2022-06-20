import {Env} from "./index";

export async function setAlertsChannel(guildId: string, channelId: string, message: string, env: Env) {
	await env.BOT_KV.put(`alert_${guildId}`, channelId);
	await env.BOT_KV.put(`alert_message_${guildId}`, message);
}

export async function getAlertsChannel(guildId: string, env: Env): Promise<{channelId: string | null, message: string | null}> {
	const channelId = await env.BOT_KV.get(`alert_${guildId}`);
	const message = await env.BOT_KV.get(`alert_message_${guildId}`);
	return {channelId, message};
}

export async function getAllAlerts(raw: true, env: Env): Promise<string>;
export async function getAllAlerts(raw: false, env: Env): Promise<string[]>;
export async function getAllAlerts(raw: boolean, env: Env): Promise<string[] | string> {
	const alerts = await env.BOT_KV.get(`alerts`);
	if (!alerts) return raw ? '' : [];
	return raw ? alerts : alerts.split(',');
}

export async function addGuildToAlerts(guildId: string, env: Env) {
	const alerts = await getAllAlerts(false, env);
	if (!alerts.includes(guildId)) alerts.push(guildId);
	await env.BOT_KV.put(`alerts`, alerts.join(','));
}

export async function removeGuildAlerts(guildId: string, env: Env) {
	const alerts = await getAllAlerts(false, env);
	const index = alerts.indexOf(guildId);
	if (index > -1) alerts.splice(index, 1);
	await env.BOT_KV.put(`alerts`, alerts.join(','));
}
