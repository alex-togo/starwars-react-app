import "./App.css";
import ListPage from "./pages/ListPage";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import CharacterPage from "./pages/CharacterPage";
import Error from "./pages/Error";

function App() {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <ListPage />
          </Route>
          <Route path="/page/:id" component={ListPage} />
          <Route path="/character/:id" component={CharacterPage} />
          <Route component={Error} />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
