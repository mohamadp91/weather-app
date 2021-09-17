import React from "react"
import ReactDOM from "react-dom"

import { GlobalStyle } from "./styles"
import { Home } from "./components"

const App = () => {
	return (
		<>
			<GlobalStyle />
			<Home />
		</>
	)
}
ReactDOM.render(<App />, document.getElementById("root"))
