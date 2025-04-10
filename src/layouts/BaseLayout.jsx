import React, { useState } from 'react';
import Header from "../components/Header.jsx";
import {Link, Outlet} from "react-router-dom";
import style from "../styles/Layout.module.scss";
import dashboard from "../image/dashboard.svg";
import allTasks from "../image/allTasks.svg";
import completedTasks from "../image/completedTasks.svg";
import addATask from "../image/addATask.svg";
import runningTask from "../image/check.svg";

const Layout = () => {
    return (
        <div>
            <Header/>
            <main className={style.main}>
                <aside className={style.sidebar}>
                    <Link to={"/"}><img src={dashboard} alt="dashboard" />Dashboard</Link>
                    <Link to={"/all-tasks"}><img src={allTasks} alt="all tasks" />All Tasks</Link>
                    <Link to={"/completed-tasks"}><img src={completedTasks} alt="completed tasks" />Completed Tasks</Link>
                    <Link to={"/running-task"}><img src={runningTask} alt="running task" />Running Task</Link>
                    <Link to={"/create-task"}><img src={addATask} alt="add task" />Add a Task</Link>
                </aside>
                <Outlet/>
            </main>
        </div>
    );
};

export default Layout;