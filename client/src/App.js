import {BrowserRouter, Route, Routes} from "react-router-dom";
import PageRender from "./PageRender";
import Login from "./pages/Login/Login";

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <div className="main">
                    <Routes>
                        <Route exact path={'/:page'} element={<PageRender/>}/>
                        <Route exact path={'/:page/:id'} element={<PageRender/>}/>
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
