// from https://gist.github.com/devsnek/77275f6e3f810a9545440931ed314dc1

'use strict';

import {Env} from '../index';

function hex2bin(hex: string) {
	const buf = new Uint8Array(Math.ceil(hex.length / 2));
	for (var i = 0; i < buf.length; i++) {
		buf[i] = parseInt(hex.substr(i * 2, 2), 16);
	}
	return buf;
}

const encoder = new TextEncoder();

export async function verify(request: Request, env: Env) {
	const signature = hex2bin(request.headers.get('X-Signature-Ed25519')!);
	const timestamp = request.headers.get('X-Signature-Timestamp');
	const unknown = await request.clone().text();

	// @ts-expect-error
	const PUBLIC_KEY = crypto.subtle.importKey(
		'raw',
		hex2bin(env.discord_public_key),
		{
			name: 'NODE-ED25519',
			namedCurve: 'NODE-ED25519',
			public: true,
		},
		true,
		['verify'],
	);


	return await crypto.subtle.verify(
		'NODE-ED25519',
		await PUBLIC_KEY,
		signature,
		encoder.encode(timestamp + unknown),
	);
}