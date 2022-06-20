import {APIGuildMember, Routes} from 'discord-api-types/v10';

import {Env} from './../index';
import makeRequest from './makeRequest';

export default async function getGuildMembers(guildId: string, limit: number, env: Env): Promise<string[]> {
	const list = await makeRequest<APIGuildMember[]>(`${Routes.guildMembers(guildId)}?limit=${limit}`, 'GET', {}, env);
	const userIds = [];
	for (const member of list) {
		if (member.user) {
			userIds.push(member.user.id);
		}
	}
	return userIds;
}
