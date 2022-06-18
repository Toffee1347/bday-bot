import {Message} from './../utils';
import {Env} from "./../index";
import {Day, birthdayToString, months, setBirthday} from './../birthdayUtils';

export default async function adminSetBirthday(userId: string, month: number, day: number, env: Env): Promise<Message> {
	const birthday: Day = {
		month,
		day,
	}
	const result = await setBirthday(userId, birthday, env);

	return new Message(result ? `${months[month]} only has ${result} days!` : `<@${userId}>'s birthday has been set to ${birthdayToString(birthday)}!`);
}
