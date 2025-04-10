import React, { useState } from 'react';
import style from '../styles/HomePage.module.scss';
import { useNavigate } from 'react-router-dom';
import edit from '../image/edit.svg';
import check from '../image/check.svg';
import deleteIcon from '../image/delete.svg';
import infoButton from '../image/infoButton.svg';
import add from '../image/add.svg';
import completed from '../image/completed.svg';

const TaskCard = ({ title, startDate, endDate, isCompleted, onEditClick }) => {
    return (
        <div className={style.taskCard}>
            <div className={style.taskHeader}>
                <h3>{title}</h3>
                <button className={style.infoButton}><img src={infoButton} alt="info" /></button>
            </div>
            <div className={style.taskInfo}>
                <div className={style.taskDetails}>
                    <div className={style.dateRow}>
                        <p>Start date: {startDate}</p>
                        <button className={style.actionButton} onClick={onEditClick}><img src={edit} alt="edit" /></button>
                    </div>
                    {!isCompleted && (
                        <div className={style.dateRow}>
                            <button className={style.actionButton}><img src={check} alt="check" /></button>
                            <p className={style.markAsCompleted}>Mark as completed</p>
                            <button className={style.actionButton}><img src={deleteIcon} alt="delete" /></button>
                        </div>
                    )}
                    {isCompleted && (
                        <>
                            <p>End date: {endDate}</p>
                            <div className={style.dateRow}>
                                <p className={style.completed}><img src={completed} alt="completed" /> completed</p>
                                <button className={style.actionButton}><img src={deleteIcon} alt="delete" /></button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

const HomePage = () => {
    const navigate = useNavigate();
    const [tasks] = useState([
        {
            id: 1,
            title: 'Learn JavaScript',
            startDate: '07-07-2023',
            endDate: '07-07-2023',
            completed: false
        },
        {
            id: 2,
            title: 'Learn JavaScript',
            startDate: '07-07-2023',
            endDate: '07-07-2023',
            completed: true
        }
    ]);

    const runningTasks = tasks.filter(task => !task.completed);
    const completedTasks = tasks.filter(task => task.completed);

    return (
        <div className={style.container}>
            <div className={style.tasksSection}>
                <div className={style.sectionHeader}>
                    <h2>Running Tasks</h2>
                    <div className={style.underline}></div>
                </div>
                <div className={style.tasksList}>
                    {runningTasks.map(task => (
                        <TaskCard
                            key={task.id}
                            title={task.title}
                            startDate={task.startDate}
                            isCompleted={false}
                            onEditClick={() => navigate(`/edit/${task.id}`)}
                        />
                    ))}
                </div>
                <button className={style.viewAllButton}>All running Tasks →</button>
            </div>

            <div className={style.divider}></div>

            <div className={style.tasksSection}>
                <div className={style.sectionHeader}>
                    <h2>Completed Tasks</h2>
                    <div className={style.underline}></div>
                </div>
                <div className={style.tasksList}>
                    {completedTasks.map(task => (
                        <TaskCard
                            key={task.id}
                            title={task.title}
                            startDate={task.startDate}
                            endDate={task.endDate}
                            isCompleted={true}
                            onEditClick={() => navigate(`/edit/${task.id}`)}
                        />
                    ))}
                </div>
                <button className={style.viewAllButton}>All Completed Tasks →</button>
            </div>

            <button 
                className={style.addTaskButton}
                onClick={() => navigate('/create-task')}
            >
                <img src={add} alt="add task" />
            </button>
        </div>
    );
};

export default HomePage;