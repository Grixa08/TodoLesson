import React, { useState } from 'react';
import style from '../styles/RunningTask.module.scss';
import infoButton from '../image/infoButton.svg';
import edit from '../image/edit.svg';
import deleteIcon from '../image/delete.svg';
import check from '../image/check.svg';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTaskContext } from '../context/TaskContext';

const TaskCard = ({ title, startDate, priority, id, onEdit, onDelete, onMarkCompleted }) => {
    return (
        <div className={style.taskCard}>
            <div className={style.taskContent}>
                <h2>{title}</h2>
                <p>Start date: {startDate}</p>
                <p>Priority: {priority}</p>
                <p className={style.completeTask} onClick={onMarkCompleted}>
                    <img src={check} alt="check" />Mark as completed
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

const RunningTask = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { runningTasks, deleteTask, markAsCompleted } = useTaskContext();
    const [filter, setFilter] = useState('All Tasks');
    
    const filteredTasks = filter === 'All Tasks' 
        ? runningTasks 
        : runningTasks.filter(task => task.priority === filter.split(' ')[0]);

    const handleOpenEditModal = (id) => {
        navigate(`/edit-task/${id}`, { state: { background: location } });
    };

    return (
        <div className={style.container}>
            <div className={style.header}>
                <h1>Running Tasks</h1>
            </div>
            <div className={style.inputWrapper}>
                <select id="priority" value={filter} onChange={(e) => setFilter(e.target.value)}>
                    <option>All Tasks</option>
                    <option>High Category</option>
                    <option>Medium Category</option>
                    <option>Low Category</option>
                </select>
            </div>
            <div className={style.taskGrid}>
                {filteredTasks.map(task => (
                    <TaskCard
                        key={task.id}
                        id={task.id}
                        title={task.title}
                        startDate={task.startDate}
                        priority={task.priority}
                        onEdit={() => handleOpenEditModal(task.id)}
                        onDelete={() => deleteTask(task.id)}
                        onMarkCompleted={() => markAsCompleted(task.id)}
                    />
                ))}
            </div>
            {filteredTasks.length === 0 && (
                <div className={style.noTasks}>
                    <p>No tasks found</p>
                </div>
            )}
        </div>
    );
};

export default RunningTask;