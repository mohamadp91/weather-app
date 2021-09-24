import React from "react"
import { Card, CircularProgress } from "@material-ui/core"
import styled from "styled-components"

const CardStyled = styled(Card)`
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	align-items: center;
	width: 300px;
	height: 400px;
	border-radius: 5px;
	border: 1px solid red;
	margin-top: 100px;
`
const SpanStyled = styled.div`
	text-align: center;
	font-family: comic sans ms, serif;
	color: red;
	font-size: 25px;
	letter-spacing: 1px;
`

export const ConnectionErrorHandling = () => {
	return (
		<CardStyled>
			<CircularProgress color="secondary"></CircularProgress>
			<SpanStyled>
				please make sure, you are connected to the Internet and try again later.
			</SpanStyled>
		</CardStyled>
	)
}

export default ConnectionErrorHandling
