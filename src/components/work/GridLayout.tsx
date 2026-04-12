import React from 'react';
import styles from './Work.module.css';

interface GridLayoutProps {
  children: React.ReactNode;
}

const GridLayout: React.FC<GridLayoutProps> = ({ children }) => {
  return (
    <div className={styles.gridContainer}>
      {children}
    </div>
  );
};

export default GridLayout;
