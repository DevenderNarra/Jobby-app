import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom'
import Home from './components/Home'
import Jobs from './components/Jobs'
import LoginForm from './components/LoginForm'
import NotFound from './components/NotFound'
import ProtectedRoutes from './components/ProtectedRoutes'
import SpecificJobDetails from './components/SpecificJobDetails'
import './App.css'

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/login" component={LoginForm} />
      <ProtectedRoutes exact path="/" component={Home} />
      <ProtectedRoutes exact path="/jobs" component={Jobs} />
      <ProtectedRoutes exact path="/jobs/:id" component={SpecificJobDetails} />
      <Route path="/not-found" component={NotFound} />
      <Redirect to="not-found" />
    </Switch>
  </BrowserRouter>
)

export default App
