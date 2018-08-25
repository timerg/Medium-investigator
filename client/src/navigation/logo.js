import React from 'react';
import styled from 'styled-components'
import { Color } from 'components/Styled'



const Mbox = styled.div`
	display: flex;
	width: calc(36px + 2vw);
	height: calc(36px + 2vw);
	background-color: ${Color.color0};
	font-size: calc(22px + 2vw);
	margin-right: 3vw;

`;

const MboxInner = styled.div `
	padding-top: 6%;
	align-items: center;
	font-family: "BiauKai", "UKai", "標楷體";
	justify-content: center;
	text-align: center;
	width: 100%;
	color: ${Color.color1};
`;

const LogoContainer = styled.div`
	flex: 1 1 100%;
	display: flex;
	padding-bottom: 0.5%;
	align-items: center;
	justify-content: center;
	font-family: "Comic Sans", "Comic Sans MS";
	font-size: calc(18px + 2vw);
	color: ${Color.color0};
`;


const LogoStart = () => {
	return (
		<LogoContainer>
			<Mbox>
				<MboxInner>
					查
				</MboxInner>
			</Mbox>
			<p> Medium investigator  </p>
		</LogoContainer>
	)
}

const Logo = () => {
	return (
		<Mbox>
			<MboxInner>
				查
			</MboxInner>
		</Mbox>
	)
}

//* <div id='logoWords'> edium comparison </div> */

export { Logo, LogoStart }