
function fetchWithTimeout(path, optionObj, time=6000) {
	let timeoutPromise = new Promise((resolve, reject) => {
		setTimeout(() => {
			reject(new Error('Request Timeout'))
		}, time)
	})

	return Promise.race([timeoutPromise, fetch(path, optionObj)])
}


function fetchAuthURL(nextPath) {
	return makePOST('/GET/authurl', nextPath)
}


function fetchAccess(authCode) {
  return makePOST('/GET/access', authCode)
}


function getUser(access) {
	return makePOST('/GET/user', access)
}

// function getPublication(idAndToken) {
// 	return makePOST('/GET/publications', idAndToken)
// }

function getTargetUser(username) {
	return makePOST('/v1/user_object', username.trim())
}

function makePOST(path, data) {
	return new Promise ((resolve, reject) => {
		fetchWithTimeout(path, {
	    	method: "POST",
	    	mode: "same-origin",
	    	cache: "no-cache",
				credentials: 'include',
	    	headers: {
	    		'content-type': "application/json"
	    	},
	      	body: JSON.stringify({reqData: data}),
    	}).then((response) => {
			if(!response.ok){
				reject(response)
			} else {
				return response.json()
			}
		}).then((resJSON) => resolve(resJSON.resData)
		).catch((e) => reject(e))
	})
}

function isTokenExpired(token) {
	if((token.access === '') || (Date.now() - token.expire >= 0)) {
		return true
	} else {
		return false
	}
}

export { getUser, getTargetUser, fetchAccess, fetchAuthURL, isTokenExpired }


// https://stackoverflow.com/questions/35588699/response-to-preflight-request-doesnt-pass-access-control-check