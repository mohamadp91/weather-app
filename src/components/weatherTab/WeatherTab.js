import React, { useEffect, useState } from "react"
import {
	AppBar,
	Divider,
	Drawer,
	IconButton,
	List,
	ListItem,
	ListItemText,
	Paper,
	Toolbar,
	Typography,
} from "@material-ui/core"
import MenuIcon from "@material-ui/icons/Menu"
import CloseIcon from "@material-ui/icons/CloseRounded"
import HomeIcon from "@material-ui/icons/Home"
import Flag from "@material-ui/icons/FlagOutlined"
import styled from "styled-components"
import Countries from "all-country-data"
import axios from "axios"
import env from "@beam-australia/react-env"

import { SearchBar } from "../searchBar"
import { LoadingTab } from "../loading"
import { ConnectionErrorHandling } from "../connectionState"
import { RegionWeather } from "../regionWeather"
import HomeTab from "../home/HomeTab"

const ContainerStyled = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100%;
`

const PaperStyled = styled(Paper)`
	width: 400px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
`

const SidebarHeaderStyled = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: flex-start;
	height: 180px;
	position: fixed;
	z-index: 1100;
	background-color: #0077b6;
	color: white;
`

const ListItemStyled = styled(ListItem)`
	display: flex;
	justify-content: space-between;
	font-family: Sawasdee, Sarai, serif;
	border: 1px solid #0077b6;
	border-radius: 3px;
	margin-top: 5px;
	height: 60px;
	transition: transform 0.15s, color 0.3s, border 0.3s, width 0.1s;
	background-image: linear-gradient(to right, white, #caf0f8);
	width: 390px;
	:hover {
		transform: scale(1.09, 1.09);
		border: 1px solid #0077b6;
		border-radius: 3px;
		color: #01316e;
		text-shadow: 0 0 0 #01316e;
		width: 380px;
		cursor: pointer;
	}
`

const TypographyCountry = styled(Typography)`
	font-size: 25px;
	opacity: 80%;
`

const MainContainer = styled.main`
	display: flex;
	justify-content: center;
	align-items: center;
`

export const WeatherTab = () => {
	const [open, setOpen] = useState(false)
	const [countriesData, setCountriesData] = useState(null)
	const [searchedCapitals, setSearchedCapitals] = useState(null)
	const [countryName, setCountryName] = useState(null)
	const [capitalName, setCapitalName] = useState(null)
	const [isLoading, setIsLoading] = useState(null)
	const [isError, setIsError] = useState(false)
	const [showHome, setShowHome] = useState(true)

	useEffect(() => {
		const region = capitalName ? capitalName : countryName
		region &&
			axios
				.get(`${env("API_HOST")}?key=${env("API_TOKEN")}&q=${region}`)
				.then((r) => {
					console.log(r)
					setShowHome(false)
					setIsLoading(false)
				})
				.catch(() => {
					setIsLoading(false)
					setIsError(true)
				})
	}, [capitalName, countryName])

	useEffect(() => {
		const capitalList = Countries.countryCapitalList().filter(
			(country) => country.capital !== null
		)
		searchedCapitals
			? setCountriesData(searchedCapitals)
			: setCountriesData(capitalList)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchedCapitals])

	const searchHandler = (value) => {
		value = value ? value.toLowerCase() : String()

		if (value === "") {
			setSearchedCapitals(null)
		} else {
			const filteredCapitals = countriesData.filter((country) =>
				country.capital.toLowerCase().includes(value.toLowerCase())
			)
			setSearchedCapitals(filteredCapitals)
		}
	}

	const onRegionClick = (region) => {
		setCountryName(region.country)
		setCapitalName(region.capital)
		setShowHome(false)
		setIsLoading(true)
	}

	return (
		<ContainerStyled>
			<AppBar position="fixed" style={{ backgroundColor: "#0077b6" }}>
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						onClick={() => setOpen(true)}
						edge="start"
					>
						<MenuIcon />
					</IconButton>
					<IconButton
						style={{ marginLeft: "30px", marginRight: "30px" }}
						color="inherit"
						onClick={() => setShowHome(true)}
						edge="start"
					>
						<HomeIcon />
					</IconButton>
					<Typography variant="h6" noWrap>
						Weather application
					</Typography>
				</Toolbar>
			</AppBar>
			<Drawer id="drawer styled" variant="persistent" anchor="left" open={open}>
				<PaperStyled>
					<SidebarHeaderStyled>
						<IconButton
							color="inherit"
							aria-label="close drawer"
							onClick={() => setOpen(false)}
							edge="start"
						>
							<CloseIcon />
						</IconButton>
						<SearchBar searchHandler={searchHandler} />
					</SidebarHeaderStyled>
					<Divider />
					<List style={{ marginTop: "170px" }}>
						{countriesData && countriesData.length > 0 ? (
							countriesData.map((c) => (
								<ListItemStyled
									key={c.country}
									onClick={() => onRegionClick(c)}
								>
									<ListItemText>
										<Flag /> <TypographyCountry>{c.country}</TypographyCountry>
									</ListItemText>
									<ListItemText primary={c.capital || <CloseIcon />} />
								</ListItemStyled>
							))
						) : (
							<ListItemStyled>
								<ListItemText>no capital</ListItemText>
							</ListItemStyled>
						)}
					</List>
				</PaperStyled>
			</Drawer>
			<MainContainer>
				{showHome ? (
					<HomeTab
						setCountryName={setCountryName}
						countriesData={Countries.all()}
					/>
				) : isLoading ? (
					<LoadingTab />
				) : isError ? (
					<ConnectionErrorHandling />
				) : (
					<RegionWeather country={countryName} capital={capitalName} />
				)}
			</MainContainer>
		</ContainerStyled>
	)
}

export default WeatherTab
