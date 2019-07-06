import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Movies from "../src/components/Movies";
import NavBar from "../src/common/NavBar";
import Customers from "../src/components/Customers";
import Rentals from "../src/components/Rentals";
import MovieForm from "../src/components/MovieForm";
import NotFound from "../src/components/NotFound";
import LoginForm from "../src/components/LoginForm";

function App() {
  return (
    <React.Fragment>
      <NavBar />
      <main className="container">
        <Switch>
        <Route path="/loginForm" component={LoginForm} />
          <Route path="/movies" component={Movies} />
          <Route path="/customers" component={Customers} />
          <Route path="/rentals" component={Rentals} />
          <Route path="/movie/:id" component={MovieForm} />
          <Route path="/notfound" component={NotFound} />
          <Redirect from="/" exact to="/movies" />
          <Redirect to="/notfound" />
        </Switch>
      </main>
    </React.Fragment>
  );
}

export default App;
