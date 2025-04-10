import React, { createContext, useState, useContext, useEffect } from 'react';

const TaskContext = createContext();

export const useTaskContext = () => useContext(TaskContext);

export const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useState([
        {
            id: 1,
            title: 'Learn JavaScript',
            startDate: '07-07-2023',
            endDate: null,
            priority: 'High',
            completed: false,
            notes: 'Focus on ES6+ features'
        },
        {
            id: 2,
            title: 'Build a React App',
            startDate: '10-07-2023',
            endDate: null,
            priority: 'Medium',
            completed: false,
            notes: 'Use modern React with hooks'
        },
        {
            id: 3,
            title: 'Learn Node.js',
            startDate: '12-07-2023',
            endDate: null,
            priority: 'High',
            completed: false,
            notes: 'Understand backend development'
        },
        {
            id: 4,
            title: 'Set up GitHub Projects',
            startDate: '15-07-2023',
            endDate: null,
            priority: 'Low',
            completed: false,
            notes: 'Create repositories for all projects'
        },
        {
            id: 5,
            title: 'Create Wireframes',
            startDate: '01-07-2023',
            endDate: '05-07-2023',
            priority: 'High',
            completed: true,
            notes: 'Use Figma for UI design'
        },
        {
            id: 6,
            title: 'Set up Development Environment',
            startDate: '02-07-2023',
            endDate: '03-07-2023',
            priority: 'High',
            completed: true,
            notes: 'Configure VSCode and extensions'
        },
        {
            id: 7,
            title: 'Research Best Practices',
            startDate: '03-07-2023',
            endDate: '08-07-2023',
            priority: 'Medium',
            completed: true,
            notes: 'Read documentation and articles'
        },
        {
            id: 8,
            title: 'Create Project Structure',
            startDate: '05-07-2023',
            endDate: '06-07-2023',
            priority: 'Medium',
            completed: true,
            notes: 'Organize files and folders'
        }
    ]);

    const addTask = (newTask) => {
        setTasks([...tasks, { ...newTask, id: Date.now() }]);
    };

    const deleteTask = (id) => {
        setTasks(tasks.filter(task => task.id !== id));
    };

    const editTask = (updatedTask) => {
        setTasks(tasks.map(task => 
            task.id === updatedTask.id ? updatedTask : task
        ));
    };

    const markAsCompleted = (id) => {
        setTasks(tasks.map(task => 
            task.id === id 
                ? { ...task, completed: true, endDate: new Date().toLocaleDateString('en-GB', { 
                    day: '2-digit', 
                    month: '2-digit', 
                    year: 'numeric' 
                  }).split('/').join('-') } 
                : task
        ));
    };

    // Save tasks to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    // Load tasks from localStorage on initial render
    useEffect(() => {
        const savedTasks = localStorage.getItem('tasks');
        if (savedTasks) {
            setTasks(JSON.parse(savedTasks));
        }
    }, []);

    return (
        <TaskContext.Provider value={{ 
            tasks,
            addTask,
            deleteTask,
            editTask,
            markAsCompleted,
            runningTasks: tasks.filter(task => !task.completed),
            completedTasks: tasks.filter(task => task.completed)
        }}>
            {children}
        </TaskContext.Provider>
    );
}; 