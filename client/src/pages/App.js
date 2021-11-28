import "../styles/App/App.css";
import Home from '../components/Home';
import AddNewPosition from '../components/AddNewPosition';
import EditPosition from '../components/EditPosition';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { GlobalProvider } from "../components/context/GlobalState";

function App() {
    return (
        <div className="wrapper">
            <GlobalProvider>
                <Router>
                    <Switch>
                        <Route exact path="/" component={Home}  />
                        <Route path="/add" component={AddNewPosition}  />
                        <Route path="/edit/:id" component={EditPosition}  />
                    </Switch>
                </Router>
            </GlobalProvider>
        </div>
    );
}

export default App;
