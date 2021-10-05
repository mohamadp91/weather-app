import React, { useEffect, useState } from "react"
import styled from "styled-components"
import env from "@beam-australia/react-env"
import { Box } from "@material-ui/core"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import { styled as Styled } from "@mui/material/styles"

const WeatherRegionContainer = styled.div`
	width: 1000px;
	height: 700px;
	margin-top: 100px;
	border-radius: 10px;
	background-size: cover;
	background-repeat: no-repeat;
	background-image: url("${(props) => props.url}");
`
const CountryInformation = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	margin-left: 60px;
	margin-top: 30px;
	font-size: 50px;
	font-family: Serif, serif;
	font-style: italic;
	font-weight: bold;
	letter-spacing: 3px;
	word-spacing: 10px;
	color: ${(props) => (props.darkTheme ? "black" : "#e8e8e8")};
	text-shadow: 0 3px 2px ${(props) => (props.darkTheme ? "#b8c5d3" : "black")};

	.capital {
		font-size: 35px;
		margin-top: 40px;
	}

	.localtime {
		font-size: 20px;
		word-spacing: 30px;
		margin-top: 40px;
	}
`

const WeatherInformation = styled.div`
	position: absolute;
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	letter-spacing: 1px;
	right: 450px;
	top: 120px;
	margin-right: 60px;

	.weather-state {
		margin-top: 31px;
		font-size: 35px;
	}
	.temp {
		margin-top: 30px;
		font-size: 20px;
	}
`
const IconContainer = styled.img`
	width: 80px;
	height: 80px;
`

const TableContainerStyled = styled.div`
	position: absolute;
	top: 600px;
	width: 999px;
`
const StyledTableCell = Styled(TableCell)`
	color: ${(props) => (props.darkTheme ? "black" : "#e8e8e8")};
	text-shadow: 0 3px 2px ${(props) => (props.darkTheme ? "#b8c5d3" : "black")};
	font-size: 20px;
	font-family: Serif, serif;
	font-weight: bold;
	font-style: italic;
`

export const RegionWeather = ({
	countryName,
	capital,
	weatherData,
	setCapitalName,
	setCountryName,
}) => {
	const [imageUrl, setImageUrl] = useState(null)
	const [darkTheme, setDarkTheme] = useState(false)

	useEffect(() => {
		setCountryName(null)
		setCapitalName(null)

		const weatherState = weatherData.current.condition.text
		let url = `${env("BASE_URL")}/assets/`
		weatherData.current.is_day === 1
			? (url += "day/") && setDarkTheme(true)
			: (url += "night/") && setDarkTheme(false)

		weatherState.includes("thunder")
			? (url += "Thunder.jpg") && setDarkTheme(false)
			: weatherState.includes("rain") && setDarkTheme(false)
			? (url += "Lightrain.jpg")
			: (url += weatherState.replace(" ", "") + ".jpg")

		setImageUrl(url)
	}, [weatherData])

	return (
		<WeatherRegionContainer url={imageUrl} data-test-id="weather-region">
			<CountryInformation darkTheme={darkTheme}>
				<Box data-test-id="country">{countryName}</Box>
				<Box data-test-id="capital" className="capital">
					{capital}
				</Box>
				<Box className="localtime">{weatherData.location.localtime}</Box>
				<WeatherInformation>
					<IconContainer
						src={weatherData.current.condition.icon}
						alt={weatherData.current.condition.text}
					/>
					<Box className="weather-state">
						{weatherData.current.condition.text}
					</Box>
					<Box className="temp">
						{weatherData.current.feelslike_c}
						<sup>℃</sup>
					</Box>
				</WeatherInformation>
			</CountryInformation>
			<TableContainerStyled>
				<TableContainer darkTheme={darkTheme}>
					<Table aria-label="caption table">
						<TableHead>
							<TableRow>
								<StyledTableCell darkTheme={darkTheme}>Cloud</StyledTableCell>
								<StyledTableCell darkTheme={darkTheme}>
									Humidity
								</StyledTableCell>
								<StyledTableCell darkTheme={darkTheme}>
									Precip&nbsp;(mm)
								</StyledTableCell>
								<StyledTableCell darkTheme={darkTheme}>
									Pressure&nbsp;(mb)
								</StyledTableCell>
								<StyledTableCell darkTheme={darkTheme}>
									Temp&nbsp;(c)
								</StyledTableCell>
								<StyledTableCell darkTheme={darkTheme}>UV</StyledTableCell>
								<StyledTableCell darkTheme={darkTheme}>
									Wind&nbsp;(kph)
								</StyledTableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							<TableRow>
								<StyledTableCell darkTheme={darkTheme}>
									{weatherData.current.cloud}
								</StyledTableCell>
								<StyledTableCell darkTheme={darkTheme}>
									{weatherData.current.humidity}
								</StyledTableCell>
								<StyledTableCell darkTheme={darkTheme}>
									{weatherData.current.precip_mm}
								</StyledTableCell>
								<StyledTableCell darkTheme={darkTheme}>
									{weatherData.current.pressure_mb}
								</StyledTableCell>
								<StyledTableCell darkTheme={darkTheme}>
									{weatherData.current.temp_c}
								</StyledTableCell>
								<StyledTableCell darkTheme={darkTheme}>
									{weatherData.current.uv}
								</StyledTableCell>
								<StyledTableCell darkTheme={darkTheme}>
									{weatherData.current.wind_kph}
								</StyledTableCell>
							</TableRow>
						</TableBody>
					</Table>
				</TableContainer>
			</TableContainerStyled>
		</WeatherRegionContainer>
	)
}

export default RegionWeather
