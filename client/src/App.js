import React from 'react';
import { Route, Switch } from 'react-router' ;
import { BrowserRouter as Router } from 'react-router-dom';

import styled from 'styled-components'
import Navigation from 'navigation/Navigation'

import GouGouHome from 'components/GouGouHome';
import NoResponse from 'components/NoResponse';
import Info from 'components/Info'
import Start from 'components/Start';
import RouteToAuth from 'components/Auth';
import { fetchAuthURL, isTokenExpired } from 'api/api'
var RouteWithToken = require('api/routeWidget').RouteWithToken;

const PORT = process.env.PORT || 3000

const Container = styled.div`
	display: flex;
	flex-direction: column;
	margin: 0 auto;
	height: 100%;
	align-items: center;
`

const PageContainer = styled.div`
	flex: 1 0 auto;
	display: flex;
	flex-direction: column;
	padding-left: 24px;
	padding-right: 24px;
	padding-top: 50px;
	max-width: 1000px;
	margin: 0 auto;
`



class App extends React.Component {
	constructor(props){
		super(props)

		let access = localStorage.getItem('MediumAccessToken')
		let expire = localStorage.getItem('MediumAccessTokenExpireTime')
		let logged
		if(!isTokenExpired({access: access, expire: expire})) {
			logged = true
		} else {
			logged = false
		}

		this.state = {
			authURL: '',
			token: {
				access: access,
				expire: expire
			},
			logged: logged
		}

		this.nextLoc = ''
		this.handleAuth = this.handleAuth.bind(this)
		this.cacheNextLoc = this.cacheNextLoc.bind(this)
		this.handleLogout = this.handleLogout.bind(this)
		this.handleUserInfo = this.handleUserInfo.bind(this)
	}

	componentDidMount() {
		// asynchronous method. doesn't want it trigger re-render
		fetchAuthURL().then(authURL => this.setState({
			authURL: authURL
		})).catch(e => this.setState({
			authURL: ''
		}))
	}



	handleAuth(token) {
		localStorage.setItem('MediumAccessToken', token.access);
		localStorage.setItem('MediumAccessTokenExpireTime', token.expire);
		this.setState({
			token: {
				access: token.access,
				expire: token.expire
			},
			logged: true
		})
	}

	cacheNextLoc(path) {
		this.nextLoc= path
	}

	handleLogout() {
		localStorage.setItem('MediumAccessToken', '')
		localStorage.setItem('MediumAccessTokenExpireTime', '')
		window.location=`https://banacorn.com:${PORT}`
	}

	handleUserInfo(userInfo) {
		this.setState({userInfo: userInfo})
	}

	render() {
		return(
			<Router>
				<Container>
					<Navigation logged={this.state.logged} access={this.state.token.access} onUserInfo={this.handleUserInfo}/>
					<PageContainer>
						<Switch>
							<Route exact path='/' component={Start} />
							<Route exact path='/Info' component={Info} />
							<Route exact path='/Server-not-response' component={NoResponse} />
							<Route exact path='/logout' render={() =>{
								this.handleLogout()
								return null
							}} />
							<RouteWithToken
								path={`/GouGouHome:${PORT}`}
								token={this.state.token}
								authURL={this.state.authURL}
								component={GouGouHome}
								comProps={{
									token: this.state.token,
									userInfo: this.state.userInfo,
									callback: this.handleLogout,
								}}
								/>}
							/>
							<Route path='/Authorization' render={() =>
								<RouteToAuth onAuth={this.handleAuth} authURL={this.state.authURL} />
								} />
						</Switch>
					</PageContainer>
				</Container>
			</Router>
		)
	}
}







export default App;

// lightskyblue, aliceblue, moccasin, saddlebrown

//https://tylermcginnis.com/react-router-nested-routes/
