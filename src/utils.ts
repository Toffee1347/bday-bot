import {InteractionResponseType} from "discord-api-types/v10";

export class JsonResponse extends Response {
	constructor(body: any, init?: Response | ResponseInit | undefined) {
	  const jsonBody = JSON.stringify(body);
	  init = init || {
			headers: {
				'content-type': 'application/json;charset=UTF-8',
			},
	  };
	  super(jsonBody, init);
	}
}

export class Message extends JsonResponse {
	constructor(message: string, empheral?: boolean) {
		super({
			type: InteractionResponseType.ChannelMessageWithSource,
			data: {
				content: message,
				flags: empheral ? 64 : 0,
			},
		});
	}
}
