import React, { useEffect, useState } from "react"
import {
	AppBar,
	CssBaseline,
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
import Flag from "@material-ui/icons/FlagOutlined"
import styled from "styled-components"
import Countries from "all-country-data"

import { SearchBar } from "../searchBar"

const ContainerStyled = styled.div`
	display: flex;
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
	}
`

const TypographyCountry = styled(Typography)`
	font-size: 25px;
	opacity: 80%;
`

export const Sidebar = ({ setRegionName }) => {
	const [open, setOpen] = useState(false)
	const [countriesData, setCountriesData] = useState(null)
	const [searchedCapitals, setSearchedCapitals] = useState(null)

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

	useEffect(() => {
		const capitalList = Countries.countryCapitalList().filter(
			(country) => country.capital !== null
		)
		searchedCapitals
			? setCountriesData(searchedCapitals)
			: setCountriesData(capitalList)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchedCapitals])

	return (
		<ContainerStyled>
			<CssBaseline />
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
									onClick={() => {
										setRegionName(c.country)
									}}
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
			<main>
				<div />
				<Typography paragraph>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
					eiusmod tempor incididunt ut labore et dolore magna aliqua. Rhoncus
					dolor purus non enim praesent elementum facilisis leo vel. Risus at
					ultrices mi tempus imperdiet. Semper risus in hendrerit gravida rutrum
					quisque non tellus. Convallis convallis tellus id interdum velit
					laoreet id donec ultrices. Odio morbi quis commodo odio aenean sed
					adipiscing. Amet nisl suscipit adipiscing bibendum est ultricies
					integer quis. Cursus euismod quis viverra nibh cras. Metus vulputate
					eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo
					quis imperdiet massa tincidunt. Cras tincidunt lobortis feugiat
					vivamus at augue. At augue eget arcu dictum varius duis at consectetur
					lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa sapien
					faucibus et molestie ac.
				</Typography>
				<Typography paragraph>
					Consequat mauris nunc congue nisi vitae suscipit. Fringilla est
					ullamcorper eget nulla facilisi etiam dignissim diam. Pulvinar
					elementum integer enim neque volutpat ac tincidunt. Ornare suspendisse
					sed nisi lacus sed viverra tellus. Purus sit amet volutpat consequat
					mauris. Elementum eu facilisis sed odio morbi. Euismod lacinia at quis
					risus sed vulputate odio. Morbi tincidunt ornare massa eget egestas
					purus viverra accumsan in. In hendrerit gravida rutrum quisque non
					tellus orci ac. Pellentesque nec nam aliquam sem et tortor. Habitant
					morbi tristique senectus et. Adipiscing elit duis tristique
					sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis
					eleifend. Commodo viverra maecenas accumsan lacus vel facilisis. Nulla
					posuere sollicitudin aliquam ultrices sagittis orci a.
				</Typography>
			</main>
		</ContainerStyled>
	)
}

export default Sidebar
