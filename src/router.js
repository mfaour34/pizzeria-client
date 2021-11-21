import {
    BrowserRouter as Router,
    Route,
    Routes as Switch
} from "react-router-dom";
import Create from "./pages/create";

import Home from './pages/home'

function RouterClass() {
    return (
        <Router>
            <Switch>
                <Route exact path='/' element={<Home />}></Route>
                <Route exact path='/create' element={<Create />}></Route>
            </Switch>
        </Router>
    );
}

export default RouterClass;