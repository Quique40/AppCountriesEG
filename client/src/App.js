import "./App.css";
// import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Route } from "react-router-dom";
import Home from "./components/Home/Home.jsx";
import NewActivities from "./components/NewActivities/NewActivities.jsx";
// import LandingPage from "./components/LandingPage/LandingPage.jsx";
import DetailCountries from "./components/DetailCountries/DetailCountries.jsx";
// import Nav from "../Nav/Nav";
// import Nav from "../src/components/Nav/Nav";
import Nav from "./components/Nav/Nav.jsx";
import Footer from "./components/Footer/Footer";
import Searching from "./components/Searching/Searching";

function App() {
  return (
    // <BrowserRouter>
    <div className="App">
      {/* <Switch> */}
      {/* <Route exact path="/" component={LandingPage} /> */}

      <Nav />

      <Route exact path="/searching" component={Searching} />
      <Route exact path="/" component={Home} />
      <Route exact path="/activities" component={NewActivities} />
      <Route exact path="/detail/:id" component={DetailCountries} />
      <Footer />
      {/* </Switch> */}
    </div>
    // {/* </BrowserRouter> */}
  );
}

export default App;
