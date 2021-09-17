import React, { useState } from "react"
import { FormControl, IconButton, TextField } from "@material-ui/core"
import styled from "styled-components"
import SearchIcon from "@material-ui/icons/Search"

const TextFieldContainer = styled.div`
	display: flex;
	justify-content: space-around;
	align-items: center;
	width: 380px;
	height: 80px;
	color: white;
	margin-left: 20px;
`

const FormControlStyled = styled(FormControl)`
	display: flex;
	flex-direction: column;
`

const SearchLabelStyled = styled.p`
	margin-left: 50px;
	color: inherit;
	font-family: Sarai, serif;
	font-size: 30px;
	text-shadow: 0 2px 0 black;
`

const TextFieldStyled = styled(TextField)`
	width: 290px;
	background-color: white;
	border-radius: 5px;
`

const nullToEmpty = (value) => value || String()

export const SearchBar = ({ searchHandler }) => {
	const [searchValue, setSearchValue] = useState(null)

	const changeHandler = (value) => {
		setSearchValue(value)
		searchHandler(value)
	}

	return (
		<TextFieldContainer>
			<FormControlStyled>
				<SearchLabelStyled>Search a region</SearchLabelStyled>
				<TextFieldStyled
					variant="outlined"
					value={nullToEmpty(searchValue)}
					onChange={({ target: { value } }) => changeHandler(value)}
				/>
			</FormControlStyled>
			<IconButton>
				<SearchIcon />
			</IconButton>
		</TextFieldContainer>
	)
}

export default SearchBar
