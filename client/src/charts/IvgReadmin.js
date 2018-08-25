import React from 'react'


import styled from 'styled-components'
import { Color } from 'components/Styled'
import Chart from 'chart.js';


const Button = styled.div`
	flex: 0 1 auto;
	position: relative;
	padding: 20px;
	width: 80%;
	text-align: center;
	cursor: pointer;
	border: 2px solid ${Color.color2};
	border-radius: 10px;
	color: ${Color.color2};
	background-color: ${Color.color1};
	margin: 0 auto;

	&:hover {
		border: 2px solid ${Color.color1};
		color: ${Color.color1};
		background-color: ${Color.color2};
	}
`

function getPubInfo(obj) {
	let starPoint = obj.payload.references.Post
	let dataObj = {}
	dataObj.data = Object.keys(starPoint).map((p) => {
		return {
			title: starPoint[p].title,
			pid: p,
			t: new Date(starPoint[p].createdAt),
			y: Math.round(starPoint[p].virtuals.wordCount / 265)
		}
	})

	dataObj.data.sort(function(a, b) {
		if(a.t > b.t) {
			return 1
		} else if(a.t < b.t) {
			return -1
		} else {
			return 0
		}
	})
	
	return dataObj
}



class IvgReadminPost extends React.Component {
	constructor(props) {
		super(props)
		this.canvas = React.createRef()
		this.handlePointClick = this.handlePointClick.bind(this)
		this.handleScaling = this.handleScaling.bind(this)
		this.state = {
			scaled: false,
		}
	}

	componentDidMount() {
		this.dataObj = getPubInfo(this.props.userObj)
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
				responsive: true,
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
							let label = "Title: " + thisComp.dataObj.data[tooltipItems[0].index].title
							return label
						},
						label: function(tooltipItem, chartData){
							return "Read time: " + tooltipItem.yLabel + "min"
						},
						afterLabel: function(tooltipItem, chartData){
							return "Posted at: " + thisComp.dataObj.data[tooltipItem.index].t.toDateString()
						},
					}
				},
				scales: {
					yAxes: [{
						display: true,
						scaleLabel: {
							display: true,
							labelString: 'Read time (min)'
						},
						ticks: {
							beginAtZero:false
						}
					}],
					xAxes: [{
						type: 'time',
						distribution: 'series',
						fontSize: 12,
						time: {
							displayFormats: {
									quarter: 'MMM YYYY'
							}
						},
						ticks: {
					      	autoSkip: true,
							minRotation: 30,
					  	},
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
		if(this.state.scaled === false) {
			this.chart.options.scales.xAxes[0].distribution = 'linear'
			this.setState({scaled: true})
		} else {
			this.chart.options.scales.xAxes[0].distribution = 'series'
			this.setState({scaled: false})
		}
		this.chart.update()
	}

	render() {
		return ([
			<div key='canvas'>
				<canvas height="60%" width="100%" ref={this.canvas} onClick={this.handlePointClick}/>
			</div>,
			<Button key='button' onClick={this.handleScaling}>
				{this.state.scaled ? "distribute data points" : "Scale with Time"}
			</Button>
		])
	}
}


export default IvgReadminPost