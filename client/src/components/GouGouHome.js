import React from 'react'
import { Route, Redirect } from 'react-router' ;
import Charts from 'components/Charting.js'
import styled from 'styled-components'
import { getTargetUser } from 'api/api'
import { Loading, Color }  from  'components/Styled'

const HomeContainer = styled.div`
	display: flex;
	flex: 1 0 auto;
	flex-direction: column;
`

const FormContainer = styled.section`
	flex: 1 1 auto;
	display: flex;
	justify-content: center;
	align-items: flex-start;
	font-size: inherit;
	color: ${Color.color5};

	& > p {
		flex: 1 0 auto;
		margin: 0 auto;
	}
`
const MyForm = styled.form`
	flex: 1 1 auto;
	display: flex;
	flex-flow: row wrap;
	flex-direction: row;
	margin-left: 10px;
`

const MyInput = styled.input`
	flex: 0 0 auto;
	border-radius: 4px;
	margin: 0 5px;
	padding-left: 5px;
	border: 1px solid ${Color.color25};
	color: ${Color.color5};
`


// const Prompt = styled.span`
// 	color: red;
// `


const PomptSpan = styled.div`
	flex-shrink: 0;
	display: flex;
	flex-flow: row wrap;
	color: ${props => props.color || Color.color5};
	& > input {
		margin-right: 5px;
	}
`




class UserInterface extends React.Component {
  constructor(props) {
    super(props);
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleChange = this.handleChange.bind(this)
		this.state = {
			username: ''
		}
  }


	handleSubmit(event) {
		event.preventDefault();
		this.props.onSubmit(this.state.username);
	}

	handleChange(event) {
		this.setState({username: event.target.value})
	}


  render () {
		let prompt;
		if(this.props.valid === 'invalid') {
			prompt = <PomptSpan color='red'> <input type="submit" value="Send"/> Username doesn't exist </PomptSpan>
		} else if (this.props.valid === 'loading') {
			prompt = <PomptSpan><Loading size='12px' border={`1px solid ${Color.color5}`} /> Loading </PomptSpan>
		} else {
			prompt = <PomptSpan><input type="submit" value="Send"/></PomptSpan>
		}
    return (
			<MyForm onSubmit={this.handleSubmit}>
				<MyInput
					id='username'
					placeholder="username"
					type='text'
					autoComplete='off'
					required="true"
					onChange={this.handleChange}
					ref={this.props.usernameRef}
				/>{prompt}
			</MyForm>
		)
  }
}

class Home extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			username: '',
			userInfo: props.userInfo,
		}
		this.usernameRef = null
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	handleSubmit(username) {
		this.setState({valid: 'loading'})
		getTargetUser(username).then((obj) => {
			if(obj.success === true) {
				this.setState({
					userObj: obj,
					valid: 'valid',
				})
				this.props.history.push(`${this.props.match.url}/plot`)

			} else {
				this.setState({
					valid: 'invalid'
				})
			}
		}).catch(err => {
			this.setState({
				valid: 'noResponse',
			})
			console.log(err)
		})
	}


  render() {
    return (
			<HomeContainer>
				<Route path={`${this.props.match.url}/plot`} render={({ match }) => {
					if(this.state.valid === 'valid') {
						return <Charts userObj={this.state.userObj} match={match}/>
					} else {
						return <Redirect to={`${this.props.match.url}`} />
					}
				}}/>
				<Route exact path={`${this.props.match.url}`} render={() => {
					if(this.state.valid === 'noResponse') {
						return <Redirect to='/Server-not-response' />
					} else {
						return (
							<FormContainer>
								<p>Who do you want to investigate? </p>
								<UserInterface onSubmit={this.handleSubmit} onChange={this.handleChange} valid={this.state.valid}/>
							</FormContainer>
						)
					}
				}} />
			</HomeContainer>
    )
  }
}



// add loading time out


export default Home
