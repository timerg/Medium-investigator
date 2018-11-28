import React from 'react';
import { Link } from 'react-router-dom'

import styled from 'styled-components'
import { DescriptBar, Color } from 'components/Styled'



const StartContainer = styled.div`
	display: flex;
	flex: 1 0 auto;
	flex-direction: column;
	justify-content: flex-start;

`

const StartBox = styled.div`
	flex: 1 1 auto;
	padding-top: 50px;
	display: flex;
	flex-direction: column;
	align-items: center;

`
const StartButton = styled(Link)`
	text-align: center;
	padding-top: 15px;
	padding-bottom: 15px;
	padding-left: 60px;
	padding-right: 60px;
	background-color: ${Color.color2};
	color: ${Color.color1};
	box-shadow: -2px 2px 2px 2px ${Color.color2};
`


class Start extends React.Component {
	render() {
		const url = 'GouGouHome'
		return (
			<StartContainer>
				<DescriptBar> Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Sed ac dolor sit amet purus malesuada congue. Etiam quis quam. Mauris metus. Duis sapien nunc, commodo et, interdum suscipit, sollicitudin et, dolor. Nunc auctor. Maecenas ipsum velit, consectetuer eu lobortis ut, dictum at dui. </DescriptBar>
				<StartBox><StartButton to={url}>Start</StartButton></StartBox>
			</StartContainer>
		)
	}
}



export default Start
