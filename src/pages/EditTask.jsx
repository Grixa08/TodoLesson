import React from 'react';
import style from '../styles/EditTask.module.scss';
import { useNavigate } from 'react-router-dom';

const EditTask = () => {
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Логика обновления задачи
        navigate('/');
    };

    return (
        <div className={style.container}>
            <h1>Edit Task</h1>
            <form onSubmit={handleSubmit} className={style.form}>
                <div className={style.formGroup}>
                    <label htmlFor="title">Task Title</label>
                    <input
                        type="text"
                        id="title"
                        placeholder="Task title"
                        className={style.input}
                    />
                </div>

                <div className={style.formGroup}>
                    <label htmlFor="startDate">Start Date</label>
                    <input
                        type="date"
                        id="startDate"
                        className={style.input}
                    />
                </div>

                <div className={style.formGroup}>
                    <label htmlFor="priority">Priority</label>
                    <select id="priority" className={style.select}>
                        <option>Important</option>
                        <option>Normal</option>
                        <option>Low</option>
                    </select>
                </div>

                <div className={style.buttonGroup}>
                    <button type="submit" className={style.submitButton}>
                        Save Changes
                    </button>
                    <button 
                        type="button" 
                        onClick={() => navigate('/')}
                        className={style.cancelButton}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditTask;