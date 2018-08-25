import React from 'react';
import { NavLink as Nav } from 'react-router-dom'
import { Route } from 'react-router' ;
import { isTokenExpired, fetchAuthURL } from './api'




class Redirect extends React.Component {
  componentDidMount(){
    window.location = this.props.loc;
  }
  render(){
    return (<section>Sign in with Medium...</section>);
  }
}


class RouteWithToken extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      authURL: props.authURL,
      authUrlWithNext: '',
      error: ''
    }
  }

  componentDidMount() {
    fetchAuthURL(this.props.path).then((authURL) => {
      this.setState({
        authUrlWithNext: authURL
      })
    }).catch((err) => {
      this.setState({
        error: 'AUTHFAIL'
      })
    })
  }

	render() {
		let thisComp = this
		return <Route path={this.props.path} render={({ match, history, location }) => {
			if(!isTokenExpired(thisComp.props.token)) {
				return <thisComp.props.component {...this.props.comProps} match={match} history={history} location={location}/>
			} else{
				if(!thisComp.state.error) {
					if(thisComp.state.authUrlWithNext) {
						return <Redirect loc={thisComp.state.authUrlWithNext} />
					} else {
						return <div />
					}
				} else if(thisComp.state.error === 'AUTHFAIL'){

					return <Nav to={thisComp.props.path} activeClassName="ErrorButton"> Fetch authURL Error. Click to try again. <br /> "{this.state.error}" </Nav>
				}
			}
		}} />
	}
}

export { RouteWithToken, Redirect }