// App.jsx
import './App.css'
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import Layout from "./layouts/BaseLayout.jsx";
import CreateTask from "./pages/CreateTask.jsx";
import EditTask from "./pages/EditTask.jsx";
import RunningTask from "./pages/RunningTask.jsx";
import CompletedTask from "./pages/CompletedTask.jsx";
import { TaskProvider } from './context/TaskContext.jsx';
import AllTasks from "./pages/AllTasks.jsx";

// Внутренний компонент для работы с модальными окнами
const AppRoutes = () => {
    const location = useLocation();
    // Сохраняем предыдущее местоположение для модального окна
    const background = location.state && location.state.background;
    
    return (
        <>
            <Routes location={background || location}>
                <Route path="/" element={<Layout/>}>
                    <Route index element={<HomePage/>}/>
                    <Route path="/create-task" element={<CreateTask/>}/>
                    <Route path="/edit-task/:id" element={<EditTask/>}/>
                    <Route path="/all-tasks" element={<AllTasks/>}/>
                    <Route path="/completed-tasks" element={<CompletedTask/>}/>
                    <Route path="/running-task" element={<RunningTask/>}/>
                    <Route path="*" element={<div>404</div>}/>
                </Route>
            </Routes>
            {/* Отображаем EditTask как модальное окно, если есть фоновое местоположение */}
            {background && (
                <Routes>
                    <Route path="/edit-task/:id" element={<EditTask/>}/>
                </Routes>
            )}
        </>
    );
};

function App() {
    return (
        <TaskProvider>
            <BrowserRouter>
                <AppRoutes />
            </BrowserRouter>
        </TaskProvider>
    )
}

export default App 