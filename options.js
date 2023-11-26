var whitelist = document.getElementById('whitelist');

function save_options() {
	browser.storage.local
		.set({
			whitelist: whitelist.value
		})
		.then(() => {
			alert('Settings saved');
			restore_options();
		}, onError);
}

function restore_options() {
	browser.storage.local.get('whitelist').then(data => {
		whitelist.value = data.whitelist;
	}, onError);
}

function onError(error) {
	console.error(`Error: ${error}`);
}

document.getElementById('save').addEventListener('click', save_options);
document.addEventListener('DOMContentLoaded', restore_options);
