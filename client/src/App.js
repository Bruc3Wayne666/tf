import {BrowserRouter, Route, Routes} from "react-router-dom";
import PageRender from "./PageRender";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <div className="main">
                    <Routes>
                        <Route exact path={'/'} element={<Login/>}/>
                        <Route exact path={'/:page'} element={<PageRender/>}/>
                        <Route exact path={'/:page/:id'} element={<PageRender/>}/>
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
