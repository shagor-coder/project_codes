import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import useStore from './features/store';
import Navbar from './components/Navbar';
import Properties from './pages/Properties';
import Contacts from './pages/Contacts';
import PageLoader from './components/PageLoading';

const App = () => {
	const fetchData = useStore((state) => state.fetchData);
	const isLoading = useStore((state) => state.isLoading);

	useEffect(() => {
		fetchData();
	}, [fetchData]);

	if (isLoading) return <PageLoader />;

	return (
		<Router>
			<Navbar />
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/properties' element={<Properties />} />
				<Route path='/contacts' element={<Contacts />} />
			</Routes>
		</Router>
	);
};

export default App;
