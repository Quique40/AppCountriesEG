import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./components/Home/Home.jsx";
import NewActivities from "./components/NewActivities/NewActivities.jsx";
import LandingPage from "./components/LandingPage/LandingPage.jsx";
import DetailCountries from "./components/DetailCountries/DetailCountries.jsx";

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
