import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import NewActivities from "./components/NewActivities";
import LandingPage from "./components/LandingPage";
import DetailCountries from "./components/DetailCountries";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/home" component={Home} />
          <Route path="/activities" component={NewActivities} />
          <Route path="/home/:id" component={DetailCountries} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;