import React, { useState } from 'react';
import style from '../styles/CreateTask.module.scss';
import { useNavigate } from 'react-router-dom';
import { useTaskContext } from '../context/TaskContext';

const CreateTask = () => {
    const navigate = useNavigate();
    const { addTask } = useTaskContext();
    const [taskData, setTaskData] = useState({
        title: '',
        startDate: new Date().toISOString().split('T')[0],
        priority: 'High',
        notes: '',
        completed: false,
        endDate: null
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTaskData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Проверка на заполнение обязательных полей
        if (!taskData.title.trim()) {
            alert('Please enter task title');
            return;
        }
        
        // Добавление новой задачи через контекст
        addTask(taskData);
        
        // Перенаправление на главную страницу
        navigate('/');
    };

    return (
        <div className={style.container}>
            <div className={style.header}>
                <h1>Create Task</h1>
            </div>
            <form onSubmit={handleSubmit} className={style.form}>
                <div className={style.formGroup}>
                    <input 
                        className={style.input} 
                        type="text" 
                        name="title"
                        value={taskData.title}
                        onChange={handleChange}
                        placeholder="Task title" 
                    />
                    <input 
                        className={style.input} 
                        type="date" 
                        name="startDate"
                        value={taskData.startDate}
                        onChange={handleChange}
                        placeholder="Start date" 
                    />
                </div>
                <div className={style.formGroup}>
                    <select 
                        className={style.select}
                        name="priority"
                        value={taskData.priority}
                        onChange={handleChange}
                    >
                        <option value="High">High Priority</option>
                        <option value="Medium">Medium Priority</option>
                        <option value="Low">Low Priority</option>
                    </select>
                </div>
                <textarea 
                    className={style.input} 
                    name="notes"
                    value={taskData.notes}
                    onChange={handleChange}
                    placeholder="Write important notes"
                ></textarea>
                <button type="submit" className={style.submitButton}>Add to list</button>
            </form>
        </div>
    );
};

export default CreateTask;