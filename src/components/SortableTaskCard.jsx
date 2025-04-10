import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import style from '../styles/TaskCard.module.scss';

// Импорт иконок
import infoButton from '../image/infoButton.svg';
import edit from '../image/edit.svg';
import deleteIcon from '../image/delete.svg';
import check from '../image/check.svg';
import completed from '../image/completed.svg';

// Универсальный компонент для сортируемой карточки задачи
const SortableTaskCard = ({ task, onEdit, onDelete, onMarkCompleted, className }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: task.id.toString() });

  const cardStyle = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  return (
    <div 
      ref={setNodeRef} 
      style={cardStyle} 
      className={`${style.cardContainer} ${isDragging ? style.isDragging : ''} ${className || ''}`}
      {...attributes} 
      {...listeners}
    >
      <div className={`${style.taskCard} ${isDragging ? style.isDragging : ''}`}>
        <div className={style.taskContent}>
          <h2>{task.title}</h2>
          <p>Start date: {task.startDate}</p>
          {task.completed && <p>End date: {task.endDate}</p>}
          <p>Priority: {task.priority}</p>
          {task.completed ? (
            <p className={style.completedStatus}>
              <img src={completed} alt="check" />Completed
            </p>
          ) : (
            <p className={style.completeTask} onClick={(e) => {
              e.stopPropagation();
              onMarkCompleted && onMarkCompleted();
            }}>
              <img src={check} alt="check" />Mark as completed
            </p>
          )}
        </div>
        <div className={style.icons}>
          <button className={style.infoIcon}>
            <img src={infoButton} alt="info" />
          </button>
          <button className={style.editIcon} onClick={(e) => {
            e.stopPropagation();
            onEdit && onEdit();
          }}>
            <img src={edit} alt="edit" />
          </button>
          <button className={style.deleteIcon} onClick={(e) => {
            e.stopPropagation();
            onDelete && onDelete();
          }}>
            <img src={deleteIcon} alt="delete" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SortableTaskCard; 