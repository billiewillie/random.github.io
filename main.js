document.addEventListener('DOMContentLoaded', () => {
	// на странице должен быть элемент с id banner
	const banner = document.getElementById('banner');

	// создаем iframe
	const iframe = document.createElement('iframe');

	// присваиваем аттрибуты
	setAttributes(iframe, {src: 'https://belinovich.com/', height: '200', width: '200'});

	// вставляем iframe в banner
	banner.append(iframe);

	// отправляем данные
	postData();
});

// функция присвоения аттрибутов
function setAttributes(el, attrs) {
	Object.keys(attrs).forEach((key) => el.setAttribute(key, attrs[key]));
}

// получить  IP
async function getIP(url) {
	const fetchURL = await fetch(url);
	const data = await fetchURL.text();
	let ipRegex = /[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}/;
	return data.match(ipRegex)[0];
}

// функция отправки данных
async function postData() {
	const domain = location.hostname;
	const ip = await getIP('https://www.cloudflare.com/cdn-cgi/trace');

	const response = await fetch('https://belinovich.com/api/domains/', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({domain, ip}),
	});

	console.log(response);
}
