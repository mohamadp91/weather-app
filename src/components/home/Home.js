import React, { useEffect, useState } from "react"
import env from "@beam-australia/react-env"
import axios from "axios"

import { Sidebar } from "../sidebar"

export const Home = () => {
	const [regionName, setRegionName] = useState(null)

	useEffect(() => {
		regionName &&
			axios
				.get(`${env("API_HOST")}?key=${env("API_TOKEN")}&q=${regionName}`)
				.then((r) => {
					console.log(r)
				})
	}, [regionName])
	return (
		<>
			<Sidebar setRegionName={setRegionName} />
		</>
	)
}

export default Home
