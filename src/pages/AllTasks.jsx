import React, { useState } from 'react';
import style from '../styles/AllTasks.module.scss';
import infoButton from '../image/infoButton.svg';
import edit from '../image/edit.svg';
import deleteIcon from '../image/delete.svg';
import check from '../image/check.svg';
import completed from '../image/completed.svg';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTaskContext } from '../context/TaskContext';

const TaskCard = ({ title, startDate, endDate, priority, isCompleted, id, onEdit, onDelete, onMarkCompleted }) => {
    return (
        <div className={style.taskCard}>
            <div className={style.taskContent}>
                <h2>{title}</h2>
                <p>Start date: {startDate}</p>
                {isCompleted && <p>End date: {endDate}</p>}
                <p>Priority: {priority}</p>
                {isCompleted ? (
                    <p className={style.completedStatus}>
                        <img src={completed} alt="check" />Completed
                    </p>
                ) : (
                    <p className={style.completeTask} onClick={onMarkCompleted}>
                        <img src={check} alt="check" />Mark as completed
                    </p>
                )}
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

const AllTasks = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { tasks, deleteTask, markAsCompleted } = useTaskContext();
    const [filter, setFilter] = useState('All Tasks');
    const [statusFilter, setStatusFilter] = useState('All');

    // Функция для фильтрации задач по приоритету и статусу
    const getFilteredTasks = () => {
        let filteredByPriority = filter === 'All Tasks' 
            ? tasks 
            : tasks.filter(task => task.priority === filter.split(' ')[0]);
            
        // Фильтрация по статусу
        if (statusFilter === 'Running') {
            return filteredByPriority.filter(task => !task.completed);
        } else if (statusFilter === 'Completed') {
            return filteredByPriority.filter(task => task.completed);
        }
        
        return filteredByPriority;
    };

    const filteredTasks = getFilteredTasks();

    // Функция для открытия модального окна редактирования
    const handleOpenEditModal = (id) => {
        navigate(`/edit-task/${id}`, { state: { background: location } });
    };

    return (
        <div className={style.container}>
            <div className={style.header}>
                <h1>All Tasks</h1>
            </div>
            <div className={style.filtersWrapper}>
                <div className={style.filterGroup}>
                    <label>Category:</label>
                    <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                        <option>All Tasks</option>
                        <option>High Category</option>
                        <option>Medium Category</option>
                        <option>Low Category</option>
                    </select>
                </div>
                <div className={style.filterGroup}>
                    <label>Status:</label>
                    <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                        <option>All</option>
                        <option>Running</option>
                        <option>Completed</option>
                    </select>
                </div>
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
                        isCompleted={task.completed}
                        onEdit={() => handleOpenEditModal(task.id)}
                        onDelete={() => deleteTask(task.id)}
                        onMarkCompleted={() => markAsCompleted(task.id)}
                    />
                ))}
            </div>
            {filteredTasks.length === 0 && (
                <div className={style.noTasks}>
                    <p>No tasks found matching your filters</p>
                </div>
            )}
        </div>
    );
};

export default AllTasks;
