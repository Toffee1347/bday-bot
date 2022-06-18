import {Message} from './../utils';
import {birthdayToString, setBirthday, months} from "./../birthdayUtils";
import {Env} from "./../index";

export default async function setBirthdayCommand(userId: string, month: number, day: number, env: Env): Promise<Message> {
	const birthday = {
		day,
		month,
	};
	const result = await setBirthday(userId, birthday, env);

	return new Message(result ? `${months[month]} only has ${result} days!` : `Birthday set to ${birthdayToString(birthday)}`, true);
}
