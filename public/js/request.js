(function(factory) {
	window.request = factory()
})(function() {
	function querystring(object) {
		let array = []
		for (let key in object) {
			let value = object[key]

			if (value == undefined) continue

			if (Array.isArray(value))
				array = array.concat(value.filter(val => val != null).map(val => `${key}=${val}`))
			else
				array.push(`${key}=${value}`)
		}
		return array.join('&')
	}

	function request(method, url, { headers = {}, query, body = {}, override = true, ...settings } = {}) {
		return fetch(url + (query ? `?${querystring(query)}` : ''), {
			method: override ? 'POST' : method,
			headers: new Headers({
				'X-HTTP-Method-Override': method,
				'Content-Type': 'application/json',
				...headers
			}),
			body: ('Content-Type' in headers && headers['Content-Type'] != 'application/json') ? body : JSON.stringify(body),
			...settings
		})
	}

	['get', 'post', 'put', 'patch', 'delete', 'head', 'trace'].forEach(verb => {
		request[verb] = request.bind(null, verb)
	})

	return request
})