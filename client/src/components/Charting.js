import React from 'react'
import { Route, Redirect, Switch } from 'react-router'
import { NavLink as Nav } from 'react-router-dom'
import styled from 'styled-components'
import { Color, Icons } from 'components/Styled'

import IvgClapsPost from 'charts/IvgClapsPost'
import IvgReadmin from 'charts/IvgReadmin'

const Container = styled.div`
	display: flex;
	flex-flow: row wrap;
	justify-content: center;
	width: 100%;
`

const PlotContainer = styled.div`
	flex: 1 1 100%;
	display: flex;
	flex-direction: column;
	position: relative;
	max-width: 880px;
	min-width: 315px;
	margin-top: 20px;
	margin-bottom: 20px;
`



const UserProfile = styled.div`
	flex: 1 0 100%;
	display: flex;
	flex-flow: row wrap;
	margin-bottom: 50px;
	& > ul {
		margin-left: 20px;
		flex: 1 1 400px;
		font-size: inherit;
		color: ${Color.color5};
		min-width: 300px;
	}
`

const UserImg = styled.img`
	flex: 0 0 auto;
	width: 150px;
	height: 150px;
	radius: 100%;
	border-radius: 100%;
`

const ChartNav = styled.div`
	flex: 1 1 100px;
	display: flex;
	flex-flow: row wrap;
	color: ${Color.color5};
	justify-content: space-around;
`

const NavLiNone = styled(Nav)`
	flex: 0 0 50px;
	height: 50px;
	padding: 5px;
	margin: 20px 0;
	display: flex;
	justify-content: center;
	align-items: center;
	border: 2px solid ${Color.color0};
	background-color: ${Color.color1};
	border-radius: 30%;
	& > svg {
		fill: ${Color.color0};
	}
	&:hover {
		background-color: ${Color.color0};
		& > svg {
			fill: ${Color.color1};
		}
	};
`

 const NavLiMatch = styled(Nav)`
	flex: 0 0 70px;
	order: -1;
	height: 70px;
	padding: 5px;
	margin: 10px 0;
	display: flex;
	justify-content: center;
	align-items: center;
	color: ${Color.color2};
	border: 2px solid ${Color.color2};
	border-radius: 30%;
	& > svg {
		width: 45px;
		height: 45px;
		fill: ${Color.color2};
	}
`



 const NavLi = (props) => {
	return <Switch>
		<Route exact path={props.path} render={() => {
			return <NavLiMatch to={props.path}>{props.children}</NavLiMatch>
		}}/>
		<Route render={() => {
			return <NavLiNone to={props.path}>{props.children}</NavLiNone>
		}} />
	</Switch>
 }


class Charts extends React.Component {
	render() {
		let u = this.props.userObj.payload.user
		const userInfo = {
			name: u.name,
			twitterName: u.twitterScreenName,
			createdAt: new Date(u.createdAt),
			bio: u.bio,
		}

		return (
			<Container>
				<UserProfile>
					<UserImg src={`https://miro.medium.com/fit/c/240/240/${this.props.userObj.payload.user.imageId}`} />
					<ul>
						<li> Medium Name: {userInfo.name} </li>
						<li> Twitter: {userInfo.twitterName} </li>
						<li> Created Date: {userInfo.createdAt.toDateString()} </li>
						{userInfo.bio}
					</ul>
				</UserProfile>
				<ChartNav>
					<NavLi path={`${this.props.match.url}/claps`}> {<Icons.claps/>} </NavLi>
					<NavLi path={`${this.props.match.url}/read-time`}> {<Icons.time />} </NavLi>
					<NavLi path={`${this.props.match.url}/response`}> </NavLi>
					<NavLi path='/GouGouHome'>  {<Icons.return />} </NavLi>
				</ChartNav>
				<PlotContainer>
					<Switch>
						<Route path={`${this.props.match.url}/claps`} render={() => <IvgClapsPost userObj={this.props.userObj} />} />
						<Route path={`${this.props.match.url}/read-time`} render={() => <IvgReadmin userObj={this.props.userObj} />} />
						<Route path='/' render={() => {
							return <Redirect to={`${this.props.match.url}/claps`} />
						}} />
					</Switch>
				</PlotContainer>
			</Container>
		)
	}
}


export default Charts


// How can one get tooltip but not open new page when he is using a cellphone