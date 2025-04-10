import React from 'react';
import style from '../styles/CreateTask.module.scss';
import { useNavigate } from 'react-router-dom';

const CreateTask = () => {
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Логика добавления задачи
        navigate('/');
    };

    return (
        <div className={style.container}>
            <div className={style.header}>
                <h1>Create Task</h1>
            </div>
            <form onSubmit={handleSubmit} className={style.form}>
                <div className={style.formGroup}>
                    <input className={style.input} type="text" placeholder="Task title" />
                    <input className={style.input} type="date" placeholder="End date" />
                </div>
                <div className={style.formGroup}>
                    <select className={style.select}>
                        <option>Important</option>
                    </select>
                </div>
                <textarea className={style.input} placeholder="Write important notes"></textarea>
                <button className={style.submitButton}>Add to list</button>
            </form>
        </div>
    );
};

export default CreateTask;