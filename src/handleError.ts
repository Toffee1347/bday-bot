import {Message} from './utils';

export default function handleError(e?: Error) {
	if (e) console.error(e);
	return new Message(`There was an error when executing your command! Please try again`, true);
}
