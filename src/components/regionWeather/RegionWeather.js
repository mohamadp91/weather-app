import React from "react"

export const RegionWeather = ({ country, capital }) => {
	return (
		<div style={{ marginTop: "200px" }}>
			{country}
			<br />
			{capital}
		</div>
	)
}

export default RegionWeather
