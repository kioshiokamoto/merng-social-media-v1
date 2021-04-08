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
import SinglePost from './pages/SinglePost';

function App() {
	return (
		<AuthProvider>
			<Router>
				<Container>
					<MenuBar />
					<Route exact path="/" component={Home} />
					<AuthRoute exact path="/login" component={Login} />
					<AuthRoute exact path="/register" component={Register} />
					<Route exact path="/posts/:postId" component={SinglePost} />
				</Container>
			</Router>
		</AuthProvider>
	);
}

export default App;
