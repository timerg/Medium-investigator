import React from 'react';
import { Route, Switch } from 'react-router' ;
import { NavLink as Nav } from 'react-router-dom';

import styled from 'styled-components'
import { Color } from 'components/Styled'

import { LogoStart, Logo } from './logo.js'
import User from './User'



const HeaderStartContainer = styled.div`
	flex: 0 0 150px;
	max-width: 1000px;
	display: flex;
	flex-flow: row wrap;
	justify-content: space-between;
	padding-left: 24px;
	padding-right: 24px;
	background-color: ${Color.color1};
	background-size: 100%;
`;

const HeaderContainer = styled.div`
	flex: 0 0 auto;
	width: 100%;
	max-width: 1000px;
	margin: 0 auto;
	display: flex;
	justify-content: space-between;
	align-items: flex-Start;
	padding-left: 24px;
	padding-top: 10px;
	color: ${Color.color0};
`;


const NavStartUl = styled.div`
	flex: 0 1 auto;
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	justify-content: flex-start;
	height: 47px;
	width: 210px;
	color: ${Color.color0};
`;

const NavUl = styled.div`
	flex: 1 1 auto;
	height: 47px;
    width: 150px;
	display: flex;
	align-items: center;
	justify-content: flex-start;
	color: ${Color.color0};
`;

const NavLi = styled.div`
	flex: 0 0 auto;
	justify-content: flex-start;
	margin-right: 30px;
`;

const Headerers = (props) =>
	<Switch key='switch'>
		<Route path='/GouGouHome:3000/plot' render={() =>
			<HeaderContainer>
				<Logo/>
				<NavUl>
					<NavLi>
						<HomeBotton logged={props.logged} />
					</NavLi>
					<NavLi>
						<Nav to='/Info' > Information </Nav>
					</NavLi>
				</NavUl>
				{props.children}
			</HeaderContainer>

		} />
		<Route render={() =>
			<HeaderStartContainer>
				<NavStartUl>
					<NavLi>
						<HomeBotton logged={props.logged} />
					</NavLi>
					<NavLi>
						<Nav to='/Info' > Information </Nav>
					</NavLi>
				</NavStartUl>
				{props.children}
				<LogoStart/>
			</HeaderStartContainer>
		} />
	</Switch>



const Navigate = ({ logged, access, onUserInfo }) => {
	return <Headerers logged={logged}><User logged={logged} access={access} onUserInfo={onUserInfo} key='user'/></Headerers>
}

function HomeBotton({ logged }) {
	if(logged) {
		return <Nav exact to='/GouGouHome'  > Home </Nav>
	} else {
		return <Nav exact to='/'  > Home </Nav>
	}
}


export default Navigate