import './App.css'
import { BrowserRouter, Switch } from 'react-router-dom'
import Navigation from './UI/organisms/Navigation'
import { PrivateRoute, PublicRoute } from './HOC/RouteChoices'
import AuthContextProvider from './context/AuthContext'
import LoginPage from './pages/LogInPage'
import Dashboard from './pages/DashBoard'



function About({ cookies }) {
  return (
    <div>
      <h2>About our awesome product</h2>
      <p>We have you covered with whatever you may need!</p>
    </div>
  );
}

function App() {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <div className="App">
          <Navigation />
          <Switch>
            <PrivateRoute path='/dashboard' exact component={Dashboard} />
            <PrivateRoute path="/about-us" component={About} />
            <PublicRoute path="/login" component={LoginPage} />
            <PublicRoute path="/" component={LoginPage} />
          </Switch>
        </div>
      </BrowserRouter>
    </AuthContextProvider>
  );
}

export default App;
