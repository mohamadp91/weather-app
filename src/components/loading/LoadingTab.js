import React from "react"
import { CircularProgress, Typography } from "@material-ui/core"
import styled from "styled-components"

const LoadingContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 200px;
	height: 300px;
	margin-top: 200px;
`

export const LoadingTab = () => {
	return (
		<LoadingContainer>
			<CircularProgress style={{ color: "#0077b6" }} />
		</LoadingContainer>
	)
}

export default LoadingTab
