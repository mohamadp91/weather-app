import React, { useEffect, useState } from "react"

import { Sidebar } from "../sidebar"

export const Home = () => {
	const [regionName, setRegionName] = useState(null)

	return (
		<>
			<Sidebar setRegionName={setRegionName} />
		</>
	)
}

export default Home
