import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';

import { Container } from 'semantic-ui-react';

//context
import { AuthProvider } from './context/auth';

//Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import MenuBar from './components/MenuBar';
import AuthRoute from './util/AuthRoute';

function App() {
	return (
		<AuthProvider>
			<Router>
				<Container>
					<MenuBar />
					<Route exact path="/" component={Home} />
					<AuthRoute exact path="/login" component={Login} />
					<AuthRoute exact path="/register" component={Register} />
				</Container>
			</Router>
		</AuthProvider>
	);
}

export default App;
