import React, { useState } from 'react';
import style from '../styles/CompletedTask.module.scss';
import infoButton from '../image/infoButton.svg';
import edit from '../image/edit.svg';
import deleteIcon from '../image/delete.svg';
import completed from '../image/completed.svg';
import { useNavigate } from 'react-router-dom';

const TaskCard = ({ title, startDate, endDate, onEdit, onDelete }) => {
    return (
        <div className={style.taskCard}>
            <div className={style.taskContent}>
                <h2>{title}</h2>
                <p>Start date: {startDate}</p>
                <p>End date: {endDate}</p>
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
    const [tasks, setTasks] = useState([
        {
            id: 1,
            title: 'Create Wireframes',
            startDate: '01-07-2023',
            endDate: '05-07-2023',
            priority: 'High'
        },
        {
            id: 2,
            title: 'Set up Development Environment',
            startDate: '02-07-2023',
            endDate: '03-07-2023',
            priority: 'High'
        },
        {
            id: 3,
            title: 'Research Best Practices',
            startDate: '03-07-2023',
            endDate: '08-07-2023',
            priority: 'Medium'
        },
        {
            id: 4,
            title: 'Create Project Structure',
            startDate: '05-07-2023',
            endDate: '06-07-2023',
            priority: 'Medium'
        },
        {
            id: 5,
            title: 'Setup Git Repository',
            startDate: '01-07-2023',
            endDate: '01-07-2023',
            priority: 'Low'
        },
        {
            id: 6,
            title: 'Create Color Palette',
            startDate: '02-07-2023',
            endDate: '04-07-2023',
            priority: 'Low'
        },
        {
            id: 7,
            title: 'Team Meeting',
            startDate: '06-07-2023',
            endDate: '06-07-2023',
            priority: 'High'
        },
        {
            id: 8,
            title: 'Client Presentation',
            startDate: '07-07-2023',
            endDate: '07-07-2023',
            priority: 'High'
        }
    ]);

    const handleEdit = (id) => {
        navigate(`/edit-task/${id}`);
    };

    const handleDelete = (id) => {
        setTasks(tasks.filter(task => task.id !== id));
    };

    return (
        <div className={style.container}>
            <div className={style.header}>
                <h1>Completed Tasks</h1>
            </div>
            <div className={style.taskGrid}>
                {tasks.map(task => (
                    <TaskCard
                        key={task.id}
                        title={task.title}
                        startDate={task.startDate}
                        endDate={task.endDate}
                        onEdit={() => handleEdit(task.id)}
                        onDelete={() => handleDelete(task.id)}
                    />
                ))}
            </div>
            <button className={style.loadMoreButton}>Load more</button>
        </div>
    );
};

export default CompletedTask;