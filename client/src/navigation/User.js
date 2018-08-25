import React from 'react';
import styled from 'styled-components'
import { Color } from 'components/Styled'
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router'
import Dropdown from 'api/dropdown'
var api = require('api/api')


const UserContainer = styled.div`
	flex: 0 1 auto;
	display: flex;
	flex-wrap: wrap;
	justify-content: flex-end;
	align-items: center;
	position: relative;
	height: 47px;
	color: ${Color.color0};
`

const UserImage = styled.img`
	flex: 0 0 auto;
	width: 32px;
	height: 32px;
	radius: 100%;
	border-radius: 100%;
	margin-left: 10px;
`

const UserSpan = styled.span`
	flex 0 0 auto;
`


const Logout = () => <Link to={'/logout'} > Logout  </Link>


class User extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			userId: '',
			userName: '',
			name: '',
			userImage: '',
			userUrl: '',
		}
		this.getUserInfo = this.getUserInfo.bind(this)
	}


	componentDidMount() {
		this.getUserInfo()
	}

	componentDidUpdate(prevProps) {
		if((!this.props.logged === prevProps.logged)){
			this.getUserInfo()
		}
	}


	getUserInfo() {
		if(this.props.logged) {
			api.getUser(
				this.props.access
			).then((response) => {
				let userInfo = {
					userId: response.id,
					userName: response.username,
					name: response.name,
					userImage: response.imageUrl,
					userUrl: response.url
				}
				this.setState(userInfo)
				this.props.onUserInfo(userInfo)
			}).catch((error) => {
				console.log(error)
				this.setState({error: error.status})
			})
		}
	}

	render() {
		if(this.state.error === 401) {
			return <Redirect to='/logout' />
		} else if(this.state.error === 500) {
			console.log("error = 500");
			return (
				<UserContainer>
					<UserSpan> Error: server no response </UserSpan>
				</UserContainer>
			)
		} else {
			return (
				this.props.logged ? (
					<UserContainer>
						<Dropdown>
							<GetPubs />
							<span href={this.state.userUrl}> Your Profile </span>
							<Logout />
						</Dropdown>
						<UserSpan> Hi, {this.state.userName}</UserSpan>
						<UserImage src={this.state.userImage} ></UserImage>
					</UserContainer>
				) : null
			)
		}
	}
}


const GetPubs = ({ userId, token }) => {
	if(userId !== '') {
		// api.getPublication({userId: userId, access: token}).then((res) => console.log(res)).catch((err) => console.log(err))
		return <div>Your Investigation</div>
	} else {
		return <div></div>
	}
}

export default User