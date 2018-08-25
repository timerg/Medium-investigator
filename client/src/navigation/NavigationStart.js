import React from 'react';
import { NavLink as Nav } from 'react-router-dom';

import styled from 'styled-components'
import { Color } from 'components/Styled'

import Logo from './logo.js'
import User from './User'



const NavContainer = styled.div`
	flex: 0 0 20%;
	display: flex;
	flex-direction: column;
	justify-content: center;
  width: 60%;
	padding-top: 5%;
	padding-left: 20%;
	padding-right: 20%;
	background-color: ${Color.color1};
	background-size: 100%;
`;



// const NavUl = styled.div`
  // flex: 1 1 100%;
	// display: flex;
	// flex-direction: row;
	// justify-content: flex-end;
	// margin-bottom: 0.5%;
	// font-size: 1.5vw
// `;

// const NavLi = styled.div`
	// flex: 1 0 auto;
	// border: 2px red;
	// display: inline-flex;
	// justify-content: center;
	// color: ${Color.color0};
	// padding: '2px'
// `;

// const NavActiveStyle = {
	// backgroundColor: Color.color0,
	// color: Color.color1,
// }





const Navigate = ({ logged, access, onUserInfo }) =>
	<NavContainer>
		<User logged={logged} access={access} onUserInfo={onUserInfo} />
		<Logo />
		{/* <NavUl>
			<NavLi>
				<HomeBotton logged={logged} />
			</NavLi>
			<NavLi>
				<Nav to='/cute-dogs' activeStyle={NavActiveStyle} > Cute Dogs </Nav>
			</NavLi>
			<NavLi>
				<Nav to='/Info' activeStyle={NavActiveStyle} > Information </Nav>
			</NavLi>
		</NavUl> */}
	</NavContainer>

// function HomeBotton({ logged }) {
	// if(logged) {
		// return <Nav exact to='/GouGouHome:3000' activeStyle={NavActiveStyle} > Home </Nav>
	// } else {
		// return <Nav exact to='/' activeStyle={NavActiveStyle} > Home </Nav>
	// }
// }


export default Navigate