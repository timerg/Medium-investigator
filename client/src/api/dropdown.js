import React from 'react';
import styled from 'styled-components'
import { Color } from 'components/Styled'



const DropdownContainer = styled.div`
	position: absolute;
	width: 100%;
	height: 100%;
	cursor: pointer;
`

const DropdownUl = styled.ul`
	position: relative;
	top: 100%;
	margin-top: 10px;
	padding-left: 0;
	list-style: none;
	z-index: 1;
	box-shadow: -1px 1px 1px ${Color.color4};
	&:after {
	    border-bottom: 8px solid ${Color.color4};
	    border-left: 6px solid transparent;
	    border-right: 6px solid transparent;
	    top: -8px;
	    content: "";
	    position: absolute;
	    left: 82%;
	    width: 0;
	    height: 0;
  }


`

const DropdownLi = styled.li`
	padding: 10px;
	display: flex;
	justify-content: center;
	color: ${Color.color5};
	background-color: ${Color.color1};
	border-bottom: solid 1px ${Color.color4};
	&:hover {
		background-color: ${Color.color4};
		color: ${Color.color3};
	}
`

class Dropdown extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			showMenu: false
		}

		this.showMenu = this.showMenu.bind(this)
		this.closeMenu = this.closeMenu.bind(this)
	}

	showMenu(event) {
		event.preventDefault()
		this.setState({showMenu: true}, () => {
			document.addEventListener('click', this.closeMenu)
		})
	}

	closeMenu(event) {
		if(this.dropdownMenu) {
			if(!this.dropdownMenu.contains(event.target)){
				this.setState({showMenu: false}, () => {
					document.removeEventListener('click', this.closeMenu)
				})
			}
		}
		// The click in document elements that aren't typically interactive won't fire 'click'. (https://developer.mozilla.org/zh-TW/docs/Web/Events/click#Safari_Mobile)
		// The work around here is to close menu by clicking DropdownContainer box again
	}

	render() {
		return (
			<DropdownContainer onClick={this.showMenu}>
				{this.state.showMenu ? (
					<DropdownUl innerRef={(element) => {
						// Ref issue for styled-components. See https://www.styled-components.com/docs/advanced#refs
		              	this.dropdownMenu = element;
					}}>
						{React.Children.map(this.props.children, (child) => {
							return <DropdownLi >{child}</DropdownLi>
						})}
					</DropdownUl>
				):(
					null
				)}
			</DropdownContainer>
		)
	}
}




export default Dropdown