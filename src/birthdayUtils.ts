import {Env} from './index';

export interface Day {
	day: number;
	month: number;
}

export async function getBirthday(userId: string, env: Env): Promise<Day | undefined> {
	const birthday = await env.BOT_KV.get(`birthday_${userId}`);
	if (!birthday) return;
	const [day, month] = birthday.split('-');
	return {
		day: parseInt(day),
		month: parseInt(month),
	};
}

export async function setBirthday(userId: string, birthday: Day, env: Env): Promise<number | void> {
	if (birthday.day > monthSizes[birthday.month]) return monthSizes[birthday.month];

	const oldBirthday = await getBirthday(userId, env);
	if (oldBirthday) {
		let usersOnSameOldDay = await getPeopleOnDay(oldBirthday, false, env);
		usersOnSameOldDay = usersOnSameOldDay.filter(id => id !== userId);
		await setPeopleOnDay(oldBirthday, usersOnSameOldDay, env);
	}

	const peopleOnNewDay = await getPeopleOnDay(birthday, false, env);
	peopleOnNewDay.push(userId);
	await setPeopleOnDay(birthday, peopleOnNewDay, env);

	await env.BOT_KV.put(`birthday_${userId}`, `${birthday.day}-${birthday.month}`);
}

export async function getPeopleOnDay(day: Day, row: true, env: Env): Promise<string>;
export async function getPeopleOnDay(day: Day, row: false, env: Env): Promise<string[]>;
export async function getPeopleOnDay(day: Day, raw: boolean, env: Env): Promise<string[] | string> {
	const people = await env.BOT_KV.get(`day_${day.day}-${day.month}`);
	if (!people) return raw ? '' : [];
	return raw ? people : people.split(',');
}

export async function setPeopleOnDay(day: Day, people: string[], env: Env): Promise<void> {
	await env.BOT_KV.put(`day_${day.day}-${day.month}`, people.join(','));
}

export function birthdayToString(birthday: Day): string {
	const numberFollower = (() => {
		switch (birthday.day) {
			case 1:
				return 'st';
			case 2:
				return 'nd';
			case 3:
				return 'rd';
			default:
				return 'th';
		}
	})();
	return `${birthday.day}${numberFollower} ${months[birthday.month]}`;
}

export function formatBirthdayMessage(baseMessage: string, userId: string, username: string): string {
	return baseMessage
		.replace(/{user}/g, `<@${userId}>`)
		.replace(/{username}/g, username);
}

export const months = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December',
];
export const monthSizes = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
