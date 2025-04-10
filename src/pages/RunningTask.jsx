import React, { useState } from 'react';
import style from '../styles/RunningTask.module.scss';
import infoButton from '../image/infoButton.svg';
import edit from '../image/edit.svg';
import deleteIcon from '../image/delete.svg';
import check from '../image/check.svg';
import { useNavigate } from 'react-router-dom';

const TaskCard = ({ title, startDate, onEdit, onDelete, onMarkCompleted }) => {
    return (
        <div className={style.taskCard}>
            <div className={style.taskContent}>
                <h2>{title}</h2>
                <p>Start date: {startDate}</p>
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
    const [tasks, setTasks] = useState([
        {
            id: 1,
            title: 'Learn JavaScript',
            startDate: '07-07-2023',
            priority: 'High'
        },
        {
            id: 2,
            title: 'Build a React App',
            startDate: '10-07-2023',
            priority: 'Medium'
        },
        {
            id: 3,
            title: 'Learn Node.js',
            startDate: '12-07-2023',
            priority: 'High'
        },
        {
            id: 4,
            title: 'Set up GitHub Projects',
            startDate: '15-07-2023',
            priority: 'Low'
        },
        {
            id: 5,
            title: 'Prepare portfolio',
            startDate: '18-07-2023',
            priority: 'High'
        },
        {
            id: 6,
            title: 'Learn UI/UX basics',
            startDate: '20-07-2023',
            priority: 'Medium'
        },
        {
            id: 7,
            title: 'Write documentation',
            startDate: '22-07-2023',
            priority: 'Medium'
        },
        {
            id: 8,
            title: 'Research testing frameworks',
            startDate: '25-07-2023',
            priority: 'Low'
        }
    ]);

    const handleEdit = (id) => {
        navigate(`/edit-task/${id}`);
    };

    const handleDelete = (id) => {
        setTasks(tasks.filter(task => task.id !== id));
    };

    const handleMarkCompleted = (id) => {
        // Логика отметки задачи как выполненной
        console.log(`Task ${id} marked as completed`);
    };

    return (
        <div className={style.container}>
            <div className={style.header}>
                <h1>Running Tasks</h1>
            </div>
            <div className={style.inputWrapper}>
                <select id="priority">
                    <option>All Tasks</option>
                    <option>High Priority</option>
                    <option>Medium Priority</option>
                    <option>Low Priority</option>
                </select>
            </div>
            <div className={style.taskGrid}>
                {tasks.map(task => (
                    <TaskCard
                        key={task.id}
                        title={task.title}
                        startDate={task.startDate}
                        onEdit={() => handleEdit(task.id)}
                        onDelete={() => handleDelete(task.id)}
                        onMarkCompleted={() => handleMarkCompleted(task.id)}
                    />
                ))}
            </div>
            <button className={style.loadMoreButton}>Load more</button>
        </div>
    );
};

export default RunningTask;