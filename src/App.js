import { HashRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import { Home } from './components/Home/Home';

function App() {
	return (
		<div className='App'>
			<Router>
				<Routes>
					<Route path='home' element={<Home />} />
					<Route path='*' element={<Navigate replace to='home' />} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;
