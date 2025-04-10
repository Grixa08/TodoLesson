import React from 'react';
import style from '../styles/HomePage.module.scss';
import { useNavigate, useLocation } from 'react-router-dom';
import edit from '../image/edit.svg';
import check from '../image/check.svg';
import deleteIcon from '../image/delete.svg';
import infoButton from '../image/infoButton.svg';
import add from '../image/add.svg';
import completed from '../image/completed.svg';
import { useTaskContext } from '../context/TaskContext';

const TaskCard = ({ title, startDate, endDate, isCompleted, id, onEditClick, onMarkCompleted, onDelete }) => {
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
                            <button className={style.actionButton} onClick={onMarkCompleted}><img src={check} alt="check" /></button>
                            <p className={style.markAsCompleted}>Mark as completed</p>
                            <button className={style.actionButton} onClick={onDelete}><img src={deleteIcon} alt="delete" /></button>
                        </div>
                    )}
                    {isCompleted && (
                        <>
                            <p>End date: {endDate}</p>
                            <div className={style.dateRow}>
                                <p className={style.completed}><img src={completed} alt="completed" /> completed</p>
                                <button className={style.actionButton} onClick={onDelete}><img src={deleteIcon} alt="delete" /></button>
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
    const location = useLocation();
    const { runningTasks, completedTasks, markAsCompleted, deleteTask } = useTaskContext();

    // Функция для открытия EditTask в модальном окне
    const handleOpenEditModal = (id) => {
        navigate(`/edit-task/${id}`, { state: { background: location } });
    };

    return (
        <div className={style.container}>
            <div className={style.tasksSection}>
                <div className={style.sectionHeader}>
                    <h2>Running Tasks</h2>
                    <div className={style.underline}></div>
                </div>
                <div className={style.tasksList}>
                    {runningTasks.slice(0, 3).map(task => (
                        <TaskCard
                            key={task.id}
                            id={task.id}
                            title={task.title}
                            startDate={task.startDate}
                            isCompleted={false}
                            onEditClick={() => handleOpenEditModal(task.id)}
                            onMarkCompleted={() => markAsCompleted(task.id)}
                            onDelete={() => deleteTask(task.id)}
                        />
                    ))}
                </div>
                <button className={style.viewAllButton} onClick={() => navigate('/running-task')}>All running Tasks →</button>
            </div>

            <div className={style.divider}></div>

            <div className={style.tasksSection}>
                <div className={style.sectionHeader}>
                    <h2>Completed Tasks</h2>
                    <div className={style.underline}></div>
                </div>
                <div className={style.tasksList}>
                    {completedTasks.slice(0, 3).map(task => (
                        <TaskCard
                            key={task.id}
                            id={task.id}
                            title={task.title}
                            startDate={task.startDate}
                            endDate={task.endDate}
                            isCompleted={true}
                            onEditClick={() => handleOpenEditModal(task.id)}
                            onDelete={() => deleteTask(task.id)}
                        />
                    ))}
                </div>
                <button className={style.viewAllButton} onClick={() => navigate('/completed-tasks')}>All Completed Tasks →</button>
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