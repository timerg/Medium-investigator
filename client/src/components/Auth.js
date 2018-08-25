import React from 'react';
import { Redirect, withRouter } from 'react-router'
import { NavLink as Nav } from 'react-router-dom'
import qs from 'query-string'

import { fetchAccess } from 'api/api'




function RedirectTo(props) {
	if(!props.error && props.rePath) {
		return <Redirect to={props.rePath} />
	} else {
		if (props.error === 'ERR_REFRESH') {
			return <Nav to={props.authURL} activeClassName="ErrorButton"> Unknown failure to use authoriztion code for access token. Click to authorize again.</Nav>
		} else if (props.error === 'ERR_AUTHO') {
			return <Nav to={props.authURL} activeClassName="ErrorButton"> Authoriztion failed. Click to authorize again. </Nav>
		}
	}

	return null
}

class _RouteToAuth extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			redirectTo: '',
			errorType: ''
		}
	}

	componentDidMount() {
		const authCode = qs.parse(this.props.location.search).code
		const nextPath = qs.parse(this.props.location.search).state
    const error = qs.parse(this.props.location.search).error
		var thisComp = this;
		if(!error && authCode) {
			fetchAccess(authCode).then(function(tokens) {
				thisComp.props.onAuth(tokens)
				thisComp.setState({
					redirectTo: nextPath,
					errorType: ''
				})
			}).catch(function(err) {
				console.log(err)
				thisComp.setState({
					redirectTo: '',
					errorType: 'ERR_REFRESH'
				})
			})
		} else if (error) {
			console.log(error)
			thisComp.setState({
						redirectTo: '',
						errorType: 'ERR_AUTHO'
				})
		} else {
			thisComp.setState({
						redirectTo: '/',
						errorType: ''
				})
		}
	}
  render() {
    return (
      <RedirectTo error={this.state.errorType} rePath={this.state.redirectTo} authURL={this.props.authURL}/>
    )
  }
}


const RouteToAuth = withRouter(_RouteToAuth)



export default RouteToAuth