browser.webRequest.onHeadersReceived.addListener(
	details => {
		browser.storage.local.get('whitelist').then(data => {
			var whitelist = data.whitelist.split('\n');

			if (!whitelist.includes(new URL(details.url).hostname)) {
				let newHeaders = details.responseHeaders.filter(header => {
					return header.name.toLowerCase() !== 'content-security-policy';
				});
				newHeaders.push({
					name: 'Content-Security-Policy',
					value: "script-src 'none'; object-src 'none';"
				});
				return {responseHeaders: newHeaders};
			}
		}, onError);
	},
	{urls: ['*://*.onion/*']},
	['blocking', 'responseHeaders']
);
