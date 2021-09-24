import React from "react"
import ReactDOM from "react-dom"

import { GlobalStyle } from "./styles"
import { WeatherTab } from "./components/weatherTab"

const App = () => {
	return (
		<div className="App">
			<GlobalStyle />
			<WeatherTab />
		</div>
	)
}
ReactDOM.render(<App />, document.getElementById("root"))
