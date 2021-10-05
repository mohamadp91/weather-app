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
import {
	styled as matrialStyled,
	ThemeProvider,
	createTheme,
} from "@mui/material/styles"

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
	color: ${(props) => (props.showDarkTheme ? "black" : "#e8e8e8")};
	text-shadow: 0 3px 2px
		${(props) => (props.showDarkTheme ? "#b8c5d3" : "black")};

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

const TableCellStyled = matrialStyled(TableCell)(({ theme }) => ({
	fontsize: "20px",
	fontFamily: "Serif, serif",
	fontWeight: "bold",
	fontStyle: "italic",
	color: theme.color,
	textShadow: theme.textShadow,
}))

const darkTheme = createTheme({
	color: "black",
	textShadow: `0 0 0`,
})

const lightTheme = createTheme({
	color: "#e8e8e8",
	textShadow: `0 3px 2px black`,
})

export const RegionWeather = ({
	countryName,
	capital,
	weatherData,
	setCapitalName,
	setCountryName,
}) => {
	const [imageUrl, setImageUrl] = useState(null)
	const [showDarkTheme, setShowDarkTheme] = useState(false)

	useEffect(() => {
		setCountryName(null)
		setCapitalName(null)

		const weatherState = weatherData.current.condition.text
		let url = `${env("BASE_URL")}/assets/`
		weatherData.current.is_day === 1
			? (url += "day/") && setShowDarkTheme(true)
			: (url += "night/") && setShowDarkTheme(false)

		if (weatherState.includes("thunder")) {
			url += "Thunder.jpg"
			setShowDarkTheme(false)
		} else if (weatherState.includes("rain")) {
			url += "Lightrain.jpg"
			setShowDarkTheme(false)
		} else {
			url += weatherState.replace(" ", "") + ".jpg"
		}

		console.log(weatherData)
		setImageUrl(url)
	}, [weatherData])

	return (
		<WeatherRegionContainer url={imageUrl} data-test-id="weather-region">
			<CountryInformation showDarkTheme={showDarkTheme}>
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
				<TableContainer>
					<Table aria-label="caption table">
						<ThemeProvider theme={showDarkTheme ? darkTheme : lightTheme}>
							<TableHead>
								<TableRow>
									<TableCellStyled>Cloud</TableCellStyled>
									<TableCellStyled>Humidity</TableCellStyled>
									<TableCellStyled>Precip&nbsp;(mm)</TableCellStyled>
									<TableCellStyled>Pressure&nbsp;(mb)</TableCellStyled>
									<TableCellStyled>Temp&nbsp;(c)</TableCellStyled>
									<TableCellStyled>UV</TableCellStyled>
									<TableCellStyled>Wind&nbsp;(kph)</TableCellStyled>
								</TableRow>
							</TableHead>
							<TableBody>
								<TableRow>
									<TableCellStyled>{weatherData.current.cloud}</TableCellStyled>
									<TableCellStyled>
										{weatherData.current.humidity}
									</TableCellStyled>
									<TableCellStyled>
										{weatherData.current.precip_mm}
									</TableCellStyled>
									<TableCellStyled>
										{weatherData.current.pressure_mb}
									</TableCellStyled>
									<TableCellStyled>
										{weatherData.current.temp_c}
									</TableCellStyled>
									<TableCellStyled>{weatherData.current.uv}</TableCellStyled>
									<TableCellStyled>
										{weatherData.current.wind_kph}
									</TableCellStyled>
								</TableRow>
							</TableBody>
						</ThemeProvider>
					</Table>
				</TableContainer>
			</TableContainerStyled>
		</WeatherRegionContainer>
	)
}

export default RegionWeather
