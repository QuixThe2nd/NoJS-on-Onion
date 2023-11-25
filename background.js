browser.webRequest.onHeadersReceived.addListener(
	details => {
		let newHeaders = details.responseHeaders.filter(header => {
			return header.name.toLowerCase() !== 'content-security-policy';
		});
		newHeaders.push({
			name: 'Content-Security-Policy',
			value: "script-src 'none'; object-src 'none';"
		});
		return {responseHeaders: newHeaders};
	},
	{urls: ['*://*.onion/*']},
	['blocking', 'responseHeaders']
);
