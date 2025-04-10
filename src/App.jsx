// App.jsx
import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import Layout from "./layouts/BaseLayout.jsx";
import CreateTask from "./pages/CreateTask.jsx";
import EditTask from "./pages/EditTask.jsx";
import RunningTask from "./pages/RunningTask.jsx";
import CompletedTask from "./pages/CompletedTask.jsx";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route index element={<HomePage/>}/>
                    <Route path={"/create-task"} element={<CreateTask/>}/>
                    <Route path={"/edit-task"} element={<EditTask/>}/>
                    <Route path={"/completed-tasks"} element={<CompletedTask/>}/>
                    <Route path={"/running-task"} element={<RunningTask/>}/>
                    <Route path="*" element={<div>404</div>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App 