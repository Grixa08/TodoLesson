import React, { useEffect } from 'react';
import style from '../styles/Modal.module.scss';

const Modal = ({ children, isOpen, onClose }) => {
    useEffect(() => {
        // Блокировка прокрутки body при открытии модального окна
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        // Очистка при размонтировании
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    // Обработка нажатия клавиши Escape для закрытия
    useEffect(() => {
        const handleEscKey = (event) => {
            if (event.key === 'Escape' && isOpen) {
                onClose();
            }
        };

        document.addEventListener('keydown', handleEscKey);
        return () => {
            document.removeEventListener('keydown', handleEscKey);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    // Закрытие модального окна при клике на затемненный фон
    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div className={style.modalOverlay} onClick={handleBackdropClick}>
            <div className={style.modalContent}>
                <button className={style.closeButton} onClick={onClose}>×</button>
                {children}
            </div>
        </div>
    );
};

export default Modal; 