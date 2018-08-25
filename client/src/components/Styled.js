import React from 'react'
import styled, { keyframes }from 'styled-components'


const Color = {
  color1: 'white',
  color0: 'cadetblue',
  color2: 'coral',
  color3: 'lightblue',
  color4: 'lightgrey',
  color5: 'slategray',
  color6: 'mistyrose',
}

const DescriptBar = styled.section`
	flex: 0 1 auto;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: inherit;
	color: ${Color.color5};
`


// Spinning Loading Circle


const rotate360 = keyframes`
	from { transform: rotate(0deg); }
	to { transform: rotate(360deg); }
`


const LoadingThis = styled.div`
	position: relative;
	width: ${props => props.size || '28px'};
	height: ${props => props.size || '28px'};
	margin-left: 0.5vw;
	margin-right: 0.5vw;
	& > div {
		position: absolute;
		left: 1px;
		top: 1px;
		width: calc(${props => props.size || '28px'} - 2px);
		height: calc(${props => props.size || '28px'} - 2px);
		animation: ${rotate360} 1s infinite linear;
		& > div {
			width: calc(${props => props.size || '28px'} / 2);
			height: calc(${props => props.size || '28px'} / 2);
			overflow: hidden;
			& > div {
				width: calc(${props => props.size || '28px'});
				height: calc(${props => props.size || '28px'});
				border: ${props => props.border || `3px solid ${Color.color5}`};
				border-radius: calc(${props => props.size || '28px'} / 2 - 2px);
			}
		}
	}
`

const Loading = (props) => { return (
	<LoadingThis {...props}>
		<div>
			<div>
				<div></div>
			</div>
		</div>
	</LoadingThis>
)}

const Icons = {
    claps: () => <svg width="25" height="25" viewBox="0 0 25 25" xmlns="http://www.w3.org/2000/svg" ><g fillRule="evenodd"><path  d="M11.74 0l.76 2.97.76-2.97zM14.81 3.78l1.84-2.56-1.42-.47zM8.38 1.22l1.84 2.56L9.8.75zM20.38 21.62a5.11 5.11 0 0 1-3.16 1.61l.49-.45c2.88-2.89 3.45-5.98 1.69-9.21l-1.1-1.94-.96-2.02c-.31-.67-.23-1.18.25-1.55a.84.84 0 0 1 .66-.16c.34.05.66.28.88.6l2.85 5.02c1.18 1.97 1.38 5.12-1.6 8.1M7.1 21.1l-5.02-5.02a1 1 0 0 1 .7-1.7 1 1 0 0 1 .72.3l2.6 2.6a.44.44 0 0 0 .63-.62L4.1 14.04l-1.75-1.75a1 1 0 1 1 1.41-1.41l4.15 4.15a.44.44 0 0 0 .63 0 .44.44 0 0 0 0-.62L4.4 10.26 3.22 9.08a1 1 0 0 1 0-1.4 1.02 1.02 0 0 1 1.41 0l1.18 1.16L9.96 13a.44.44 0 0 0 .62 0 .44.44 0 0 0 0-.63L6.43 8.22a.99.99 0 0 1-.3-.7.99.99 0 0 1 .3-.7 1 1 0 0 1 1.41 0l7 6.98a.44.44 0 0 0 .7-.5l-1.35-2.85c-.31-.68-.23-1.19.25-1.56a.85.85 0 0 1 .66-.16c.34.06.66.28.88.6L18.63 14c1.57 2.88 1.07 5.54-1.55 8.16a5.62 5.62 0 0 1-5.06 1.65 9.35 9.35 0 0 1-4.93-2.72zM11 5.98l2.56 2.56c-.5.6-.56 1.41-.15 2.28l.26.56-4.25-4.25a.98.98 0 0 1-.12-.45 1 1 0 0 1 .29-.7 1.02 1.02 0 0 1 1.41 0zm8.89 2.06c-.38-.56-.9-.92-1.49-1.01a1.74 1.74 0 0 0-1.34.33c-.38.29-.61.65-.71 1.06a2.1 2.1 0 0 0-1.1-.56 1.78 1.78 0 0 0-.99.13l-2.64-2.64a1.88 1.88 0 0 0-2.65 0 1.86 1.86 0 0 0-.48.85 1.89 1.89 0 0 0-2.67-.01 1.87 1.87 0 0 0-.5.9c-.76-.75-2-.75-2.7-.04a1.88 1.88 0 0 0 0 2.66c-.3.12-.61.29-.87.55a1.88 1.88 0 0 0 0 2.66l.62.62a1.88 1.88 0 0 0-.9 3.16l5.01 5.02c1.6 1.6 3.52 2.64 5.4 2.96a7.16 7.16 0 0 0 1.18.1c1.03 0 2-.25 2.9-.7A5.9 5.9 0 0 0 21 22.24c3.34-3.34 3.08-6.93 1.74-9.17l-2.87-5.04z"></path></g>
    </svg>,
    time: () => <svg width="25" height="25" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30"><path d="M 14 3 L 14 8 A 1.0001 1.0001 0 1 0 16 8 L 16 5.2011719 C 21.038002 5.7243045 25 9.8205415 25 15 C 25 20.534534 20.534534 25 15 25 C 9.4654664 25 5 20.534534 5 15 C 5 12.546287 5.8819179 10.312748 7.3457031 8.5742188 A 1.0008008 1.0008008 0 1 0 5.8144531 7.2851562 C 4.0602383 9.3686271 3 12.065713 3 15 C 3 21.615466 8.3845336 27 15 27 C 21.615466 27 27 21.615466 27 15 C 27 8.3845336 21.615466 3 15 3 L 14 3 z M 9.3945312 9.0078125 C 9.1017031 9.0505156 8.883125 9.3939687 9.078125 9.6992188 C 10.542125 11.996219 13.041937 15.870062 13.585938 16.414062 C 14.366937 17.195062 15.633062 17.195062 16.414062 16.414062 C 17.195062 15.633063 17.195062 14.366938 16.414062 13.585938 C 15.870062 13.040937 11.996219 10.542125 9.6992188 9.078125 C 9.5974687 9.013125 9.4921406 8.9935781 9.3945312 9.0078125 z"></path>
    </svg>,
    return: () => <svg width="25" height="25" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30"><path  d="M 15 3 C 11.946149 3 9.1595062 4.1553732 7.0390625 6.0390625 L 5 4 L 5 10 L 11 10 L 8.4550781 7.4550781 C 10.209519 5.9310235 12.488026 5 15 5 C 20.534534 5 25 9.4654664 25 15 C 25 20.534534 20.534534 25 15 25 C 9.4654664 25 5 20.534534 5 15 A 1.0001 1.0001 0 1 0 3 15 C 3 21.615466 8.3845336 27 15 27 C 21.615466 27 27 21.615466 27 15 C 27 8.3845336 21.615466 3 15 3 z"></path>
    </svg>,
}

export { DescriptBar, Color, Loading, Icons }



export default DescriptBar