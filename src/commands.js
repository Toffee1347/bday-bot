export const commands = [
	{
		name: 'set-birthday',
		description: 'Set your birthday',
		options: [
			{
				name: 'month',
				description: 'Your birthday month',
				type: 3, // STRING
				required: true,
				choices: [
					{
						name: 'January',
						value: '0',
					},
					{
						name: 'February',
						value: '1',
					},
					{
						name: 'March',
						value: '2',
					},
					{
						name: 'April',
						value: '3',
					},
					{
						name: 'May',
						value: '4',
					},
					{
						name: 'June',
						value: '5',
					},
					{
						name: 'July',
						value: '6',
					},
					{
						name: 'August',
						value: '7',
					},
					{
						name: 'September',
						value: '8',
					},
					{
						name: 'October',
						value: '9',
					},
					{
						name: 'November',
						value: '10',
					},
					{
						name: 'December',
						value: '11',
					},
				],
			},
			{
				name: 'day',
				description: 'Your birthday day',
				type: 4, // INTEGER
				required: true,
				min_value: 1,
				max_value: 31,
			},
		],
	},
	{
		name: 'get-birthday',
		description: 'Get your birthday',
		options: [
			{
				name: 'user',
				description: 'Get the birthday of a user',
				type: 6, // USER
				required: false,
			},
		],
	},
	{
		name: 'set-alerts-channel',
		description: 'Set the channel where the bot will send birthday alerts',
		options: [
			{
				name: 'channel',
				description: 'The channel where the bot will send birthday alerts',
				type: 7, // CHANNEL
				required: true,
			},
			{
				name: 'message',
				description: 'The message sent to the channel, replace the user tag with {user}',
				type: 3, // STRING
				required: true,
			},
		],
	},
	{
		name: 'remove-alerts-channel',
		description: 'Remove the channel where the bot will send birthday alerts',
	},
];

export const adminCommands = [
	{
		name: 'admin-set-birthday',
		description: 'Set the birthday of a user',
		options: [
			{
				name: 'user',
				description: 'The user id to set the birthday of',
				type: 3, // STRING
				required: true,
			},
			{
				name: 'month',
				description: 'The month of the birthday',
				type: 3, // STRING
				required: true,
				choices: [
					{
						name: 'January',
						value: '0',
					},
					{
						name: 'February',
						value: '1',
					},
					{
						name: 'March',
						value: '2',
					},
					{
						name: 'April',
						value: '3',
					},
					{
						name: 'May',
						value: '4',
					},
					{
						name: 'June',
						value: '5',
					},
					{
						name: 'July',
						value: '6',
					},
					{
						name: 'August',
						value: '7',
					},
					{
						name: 'September',
						value: '8',
					},
					{
						name: 'October',
						value: '9',
					},
					{
						name: 'November',
						value: '10',
					},
					{
						name: 'December',
						value: '11',
					},
				],
			},
			{
				name: 'day',
				description: 'Your birthday day',
				type: 4, // INTEGER
				required: true,
				min_value: 1,
				max_value: 31,
			},
		],
	},
	{
		name: 'set-birthday-message',
		description: 'Set the birthday message',
		options: [
			{
				name: 'message',
				description: 'The message, replace the user tag with {user} and replace the user\'s name with {username}',
				type: 3, // STRING
				required: true,
			},
		],
	}
];
