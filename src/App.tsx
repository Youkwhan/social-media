import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Navbar } from "./components/Navbar";
import { CreatePost } from "./pages/create-post/CreatePost";

function App() {
	return (
		<div className="App">
			<Router>
				{/* Navbar needs to be inside Router such that it has access to react-router-dom functonality  */}
				<Navbar />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/login" element={<Login />} />
					<Route path="/createpost" element={<CreatePost />} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;
