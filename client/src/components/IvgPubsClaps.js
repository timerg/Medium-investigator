import React from 'react'
import styled from 'styled-components'
import Chart from 'chart.js';

import { Color, DescriptBar } from 'components/Styled'

const Container = styled.div`
	display: flex;
	flex-direction: column;
	flex: 1 1 auto;
`
const CanvasContainer = styled.div`
	position: relative;
	padding-left: 24px;
	padding-right: 24px;
	flex: 0 1 auto;
`
const Button = styled.div`
	background-color: ${Color.color2};
	color: ${Color.color3};
	flex: 0 1 auto;
	position: relative;
	width: 100%;
	text-align: center;
`


function getPubClaps(obj) {
	let starPoint = obj.payload.references.Post
	let dataObj = {}
	dataObj.title = []
	dataObj.pid = []
	dataObj.data = Object.keys(starPoint).map((p) => {
		dataObj.pid.push(p)
		dataObj.title.push(starPoint[p].title)
		return {
			t: new Date(starPoint[p].createdAt),
			y: starPoint[p].virtuals.totalClapCount
		}
	})
	console.log(dataObj)
	return dataObj
}


class IvgPubsClaps extends React.Component {
	constructor(props) {
		super(props)
		this.canvas = React.createRef()
		this.handlePointClick = this.handlePointClick.bind(this)
		this.handleScaling = this.handleScaling.bind(this)
		this.state = {
			scaled: true
		}
	}

	componentDidMount() {
		this.dataObj = getPubClaps(this.props.userObj)
		let thisComp = this
		this.chart = new Chart(this.canvas.current.getContext('2d'), {
			type: 'line',
			data: {
				datasets: [{
					borderColor: Color.color2,
					borderWidth: 2,
					backgroundColor: 'rgba(0, 0, 0, 0)',
					data: this.dataObj.data
				}]
			},
			options: {
				
				maintainAspectRatio: true,
				legend: {
					display: false
				},
				elements: {
					point: {
						radius: 6
					},
          line: {
              tension: 0,
          }
        },
				tooltips: {
					mode: 'nearest',
					callbacks: {
						title: function(tooltipItems, chartData) {
							let label = "Title: " + thisComp.dataObj.title[tooltipItems[0].index]
							return label
						},
						label: function(tooltipItem, chartData){
							return "Claps: " + tooltipItem.yLabel
						}
					}
				},
				scales: {
					yAxes: [{
						display: true,
						scaleLabel: {
							display: true,
							labelString: 'Claps'
						},
						ticks: {
							beginAtZero:false
						}
					}],
					xAxes: [{
						type: 'time',
						distribution: 'series',
						fontSize: 10,
						time: {
							displayFormats: {
									quarter: 'MMM YYYY'
							}
						}
					}]
				},
			}
		});
	}
	handlePointClick(event) {
		let chartElement = this.chart.getElementAtEvent(event)[0]
		if(chartElement) {
			window.open("https://medium.com/p/" + this.dataObj.pid[chartElement._index])
		}
	}
	
	handleScaling() {
		if(this.state.scaled === true) {
			this.chart.options.scales.xAxes[0].distribution = 'linear'
			this.setState({scaled: false})
		} else {
			this.chart.options.scales.xAxes[0].distribution = 'series'
			this.setState({scaled: true})
		}
		this.chart.update()
	}

	render() {
		return (
			<Container>
				<DescriptBar>
					This chart shows how many claps each article recieved.
				</DescriptBar>
				<CanvasContainer>
					<canvas height="100%" width="100%" ref={this.canvas} onClick={this.handlePointClick}/>
				</CanvasContainer>
				<Button onClick={this.handleScaling}>
					{this.state.scaled ? "distribute data points" : "Scale with Time"}
				</Button>
			</Container>
		)
	}
}


export default IvgPubsClaps


// How can one get tooltip but not open new page when he is using a cellphone