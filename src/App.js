import "./App.css";
import ListPage from "./pages/ListPage";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import CharacterPage from "./pages/CharacterPage";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <ListPage />
          </Route>
          <Route path="/page/:id" component={ListPage} />
          <Route path="/character/:id" component={CharacterPage} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
