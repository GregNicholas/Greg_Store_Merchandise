import { HashRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import { Home } from './components/Home/Home';
import { AddMore } from './components/AddMore/AddMore';
import { DeleteMore } from './components/DeleteMore/DeleteMore';
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
						<Route path='/addMore' element={<AddMore />} />
						<Route path='/deleteMore' element={<DeleteMore />} />
						<Route path='*' element={<Navigate replace to='home' />} />
					</Routes>
				</Router>
			</ContextProvider>
		</div>
	);
}

export default App;
