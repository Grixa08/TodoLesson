import React, { useState } from 'react';
import burger from '../image/burger.svg';
import bell from '../image/bell.svg';
import moon from '../image/moon.svg';
import profile from '../image/profile.svg';
import style from '../styles/Header.module.scss';

const Header = () => {
    const [value, setValue] = useState('');
    
    return (
        <header className={style.header}>
            <div className={style.burger}>
                <img src={burger} alt="logo" />
            </div>
            <input 
                className={style.input} 
                value={value} 
                onChange={(e) => setValue(e.target.value)} 
                placeholder='write you project name'
            />
            <nav className={style.nav}>
                <div><img src={bell} alt="bell" /></div>
                <div><img src={moon} alt="moon" /></div>
                <div><img src={profile} alt="profile" /></div>
            </nav>
        </header>
    );
};

export default Header;
