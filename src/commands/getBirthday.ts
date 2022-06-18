import {birthdayToString, getBirthday} from "./../birthdayUtils";
import {Env} from "./../index";
import {Message} from "./../utils";

export default async function getBirthdayCommand(userId: string, env: Env): Promise<Message> {
	const birthday = await getBirthday(userId, env);
	if (!birthday) {
		return new Message(`<@${userId}> hasn't set their birthday yet!`);
	} else {
		return new Message(`<@${userId}>'s birthday is ${birthdayToString(birthday)}!`);
	}
}
