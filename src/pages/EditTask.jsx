import React, { useState, useEffect } from 'react';
import style from '../styles/EditTask.module.scss';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useTaskContext } from '../context/TaskContext';
import Modal from '../components/Modal';

const EditTask = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { id } = useParams();
    const { tasks, editTask } = useTaskContext();
    const [isModalOpen, setIsModalOpen] = useState(true);
    
    const [taskData, setTaskData] = useState({
        title: '',
        startDate: '',
        priority: 'High',
        notes: '',
        completed: false,
        endDate: null
    });

    // Получаем предыдущий путь из состояния location
    const { background } = location.state || {};
    
    // Загрузка данных задачи при монтировании компонента
    useEffect(() => {
        if (id) {
            const task = tasks.find(task => task.id === parseInt(id));
            if (task) {
                setTaskData(task);
            } else {
                alert('Task not found');
                handleClose();
            }
        }
    }, [id, tasks]);

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
        
        // Обновление существующей задачи через контекст
        editTask(taskData);
        
        // Закрываем модальное окно
        handleClose();
    };

    const handleClose = () => {
        setIsModalOpen(false);
        // Возвращаемся на предыдущую страницу или на главную
        if (background) {
            navigate(background.pathname);
        } else {
            navigate('/');
        }
    };

    // Содержимое формы редактирования
    const renderTaskForm = () => (
        <form onSubmit={handleSubmit} className={style.form}>
            <div className={style.header}>
                <h1>Edit Task</h1>
            </div>
            
            <div className={style.formGroup}>
                <label htmlFor="title">Task Title</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={taskData.title}
                    onChange={handleChange}
                    placeholder="Task title"
                    className={style.input}
                />
            </div>

            <div className={style.formGroup}>
                <label htmlFor="startDate">Start Date</label>
                <input
                    type="date"
                    id="startDate"
                    name="startDate"
                    value={taskData.startDate}
                    onChange={handleChange}
                    className={style.input}
                />
            </div>

            <div className={style.formGroup}>
                <label htmlFor="priority">Priority</label>
                <select 
                    id="priority" 
                    name="priority"
                    value={taskData.priority}
                    onChange={handleChange}
                    className={style.select}
                >
                    <option value="High">High Priority</option>
                    <option value="Medium">Medium Priority</option>
                    <option value="Low">Low Priority</option>
                </select>
            </div>

            <div className={style.formGroup}>
                <label htmlFor="notes">Notes</label>
                <textarea
                    id="notes"
                    name="notes"
                    value={taskData.notes || ''}
                    onChange={handleChange}
                    placeholder="Add any important notes here"
                    className={style.input}
                ></textarea>
            </div>

            <div className={style.buttonGroup}>
                <button type="submit" className={style.submitButton}>
                    Save Changes
                </button>
                <button 
                    type="button" 
                    onClick={handleClose}
                    className={style.cancelButton}
                >
                    Cancel
                </button>
            </div>
        </form>
    );

    // Для модального отображения используем компонент Modal
    if (background) {
        return (
            <Modal isOpen={isModalOpen} onClose={handleClose}>
                {renderTaskForm()}
            </Modal>
        );
    }

    // Для обычного отображения (без модального окна)
    return (
        <div className={style.container}>
            {renderTaskForm()}
        </div>
    );
};

export default EditTask;