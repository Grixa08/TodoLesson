import React, { useState } from 'react';
import style from '../styles/CompletedTask.module.scss';
import infoButton from '../image/infoButton.svg';
import edit from '../image/edit.svg';
import deleteIcon from '../image/delete.svg';
import completed from '../image/completed.svg';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTaskContext } from '../context/TaskContext';

const TaskCard = ({ title, startDate, endDate, priority, id, onEdit, onDelete }) => {
    return (
        <div className={style.taskCard}>
            <div className={style.taskContent}>
                <h2>{title}</h2>
                <p>Start date: {startDate}</p>
                <p>End date: {endDate}</p>
                <p>Priority: {priority}</p>
                <p className={style.completedStatus}>
                    <img src={completed} alt="check" />Completed
                </p>
            </div>
            <div className={style.icons}>
                <button className={style.infoIcon}>
                    <img src={infoButton} alt="info" />
                </button>
                <button className={style.editIcon} onClick={onEdit}>
                    <img src={edit} alt="edit" />
                </button>
                <button className={style.deleteIcon} onClick={onDelete}>
                    <img src={deleteIcon} alt="delete" />
                </button>
            </div>
        </div>
    );
};

const CompletedTask = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { completedTasks, deleteTask } = useTaskContext();
    const [timeFilter, setTimeFilter] = useState('All Tasks');
    
    // Функция для фильтрации задач по времени
    const getFilteredTasks = () => {
        if (timeFilter === 'All Tasks') return completedTasks;
        
        const today = new Date();
        const oneDay = 24 * 60 * 60 * 1000; // миллисекунды в дне
        
        return completedTasks.filter(task => {
            const taskDate = new Date(task.endDate.split('-').reverse().join('-'));
            
            switch(timeFilter) {
                case 'Today':
                    return taskDate.toDateString() === today.toDateString();
                case 'This Week':
                    const diffDays = Math.round(Math.abs((today - taskDate) / oneDay));
                    return diffDays <= 7;
                case 'This Month':
                    return taskDate.getMonth() === today.getMonth() && 
                           taskDate.getFullYear() === today.getFullYear();
                default:
                    return true;
            }
        });
    };

    const filteredTasks = getFilteredTasks();

    // Функция для открытия модального окна редактирования
    const handleOpenEditModal = (id) => {
        navigate(`/edit-task/${id}`, { state: { background: location } });
    };

    return (
        <div className={style.container}>
            <div className={style.header}>
                <h1>Completed Tasks</h1>
            </div>
            <div className={style.inputWrapper}>
            </div>
            <div className={style.taskGrid}>
                {filteredTasks.map(task => (
                    <TaskCard
                        key={task.id}
                        id={task.id}
                        title={task.title}
                        startDate={task.startDate}
                        endDate={task.endDate}
                        priority={task.priority}
                        onEdit={() => handleOpenEditModal(task.id)}
                        onDelete={() => deleteTask(task.id)}
                    />
                ))}
            </div>
            {filteredTasks.length === 0 && (
                <div className={style.noTasks}>
                    <p>No completed tasks found for the selected period</p>
                </div>
            )}
        </div>
    );
};

export default CompletedTask;