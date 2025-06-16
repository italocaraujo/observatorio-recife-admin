// components/Loading.tsx
'use client';

import React from 'react';
import styles from '@/app/styles/layout/Loading.module.css';
import { LoadingProps } from '@/@types/admin/Loading';

const Loading: React.FC<LoadingProps> = ({
  message = 'Aguarde um momento...',
  size = 50,
  color = 'var(--blue)',
}) => {
  const svgSize = size;
  const circleRadius = size / 2 - 5;
  const strokeWidth = 4;

  return (
    <div className={styles.loadingContainer}>
      <svg 
        className={styles.loadingSvg} 
        viewBox={`0 0 ${svgSize} ${svgSize}`}
        width={svgSize}
        height={svgSize}
      >
        <circle
          className={styles.loadingCircle}
          cx={svgSize / 2}
          cy={svgSize / 2}
          r={circleRadius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
        />
      </svg>
      <p className={styles.loadingText}>{message}</p>
    </div>
  );
};

export default Loading;