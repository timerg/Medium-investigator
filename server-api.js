var medium = require('medium-sdk')

const PORT = process.env.PORT || 3000
const CONTYPE = process.env.PORT ? 'http' : 'https' 



////////// For tokens and authentication

var client = new medium.MediumClient({
  clientId: '3eca255d0ef2',
  clientSecret: '66aa65483a0026c2525fd07900a300c72418aa97'
})


var redirectURL = `${CONTYPE}://banacorn.com:${PORT}/Authorization`;

var authURL = client.getAuthorizationUrl('secretState', redirectURL, [
  medium.Scope.BASIC_PROFILE, medium.Scope.LIST_PUBLICATIONS
])


function getAuthURL(nextPath) {
  let state = nextPath
  if(!nextPath) {
    state = 'secretState'
  }
  return client.getAuthorizationUrl(nextPath, redirectURL, [
    medium.Scope.BASIC_PROFILE, medium.Scope.LIST_PUBLICATIONS
  ])
}

function exchangeRefreshToken(refreshToken) {
  return new Promise((resolve, reject) => {
    client.exchangeRefreshToken(refreshToken, function(err, data) {
      if(!err) {
        resolve({access: data.access_token, refresh: data.refresh_token, expire: data.expires_at})
      } else {
        reject(err)
      }
    })
  })
}



function exchangeAuthorizationCode(authCode){
  return new Promise ((resolve, reject) => {
    client.exchangeAuthorizationCode(authCode, redirectURL, function(err, data) {
      if(!err) {
        resolve({access: data.access_token, refresh: data.refresh_token, expire: data.expires_at})
      } else {
        reject(err)
      }
    })
  })
}



/////// For fetch information


function getUser(token) {
  let userClient = new medium.MediumClient({
    clientId: '3eca255d0ef2',
    clientSecret: '66aa65483a0026c2525fd07900a300c72418aa97'
  })
  userClient = userClient.setAccessToken(token)
	return new Promise((resolve, reject) => {
		userClient.getUser((err, data) => {
			if(!err) {
				resolve(data)
			} else {
				reject(err)
			}
		})
	})
}


function getPublications(uid, token) {
  let userClient = new medium.MediumClient({
    clientId: '3eca255d0ef2',
    clientSecret: '66aa65483a0026c2525fd07900a300c72418aa97'
  })
  userClient = userClient.setAccessToken(token)
	return new Promise((resolve, reject) => {
		userClient.getPublicationsForUser({'userId': uid}, (err, data) => {
			if(!err) {
        console.log(data);
				resolve(data)
			} else {
				reject(err)
			}
		})
	})
}


module.exports = { getUser, getAuthURL, getPublications, authURL, exchangeRefreshToken, exchangeAuthorizationCode}



