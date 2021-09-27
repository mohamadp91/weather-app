import React, { useEffect, useState } from "react"
import WorldMap, { CountryContext } from "react-svg-worldmap"
import styled from "styled-components"

const WorldMapContainer = styled.div`
	margin-top: 100px;
	width: 1000px;
	height: 700px;

	.worldmap__figure-caption {
		color: #01316e;
		font-size: 30px;
		font-family: Sarai, serif;
	}
	svg {
		margin-top: 60px;
	}
	path:hover {
		background: white;
		color: cornflowerblue;
	}
`
export const HomeTab = ({ countriesData, setCountryName }) => {
	const [data, setData] = useState([
		{
			country: countriesData[0].country_code,
			value: 0,
		},
	])

	useEffect(() => {
		countriesData.forEach((c, index) => {
			setData((d) => {
				return [
					...d,
					{
						country: c.country_code,
						value: index / 10,
					},
				]
			})
		})
	}, [])

	const stylingFunction = ({
		countryValue,
		countryCode,
		minValue,
		maxValue,
		color,
	}: CountryContext) => {
		const opacityLevel = countryValue
			? 0.1 + (1.5 * (countryValue - minValue)) / (maxValue - minValue)
			: 0
		return {
			fill: `#68c09b`,
			fillOpacity: opacityLevel,
			stroke: "black",
			strokeWidth: 1,
			strokeOpacity: 0.5,
			cursor: "pointer",
		}
	}

	const onCountryClick = (event) => {
		setData((d) => {
			return [...d, { country: event.countryCode, value: 1000 }]
		})
		setCountryName(event.countryName)
	}
	return (
		<WorldMapContainer>
			<WorldMap
				title="Select a country , double click on white area to zoom 😍"
				value-suffix="people"
				data={data}
				onClickFunction={(e) => onCountryClick(e)}
				styleFunction={stylingFunction}
				richInteraction
			/>
		</WorldMapContainer>
	)
}

export default HomeTab
