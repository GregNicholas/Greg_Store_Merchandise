import { HashRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import { Home } from './components/Home/Home';
import { AddMore } from './components/AddMore/AddMore';
import { ContextProvider } from "./contexts/Context";
import GlobalStyle from './globalStyles'; 

function App() {
	return (
		<div className='App'>
			<GlobalStyle />
			<ContextProvider>
				<Router>
					<Routes>
						<Route path='home' element={<Home />} />
						<Route path='/addmore' element={<AddMore />} />
						<Route path='*' element={<Navigate replace to='home' />} />
					</Routes>
				</Router>
			</ContextProvider>
		</div>
	);
}

export default App;
