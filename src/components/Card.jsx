import React from 'react';

const Card = ({ children, title, className = '', style = {} }) => {
    return (
        <div style={{
            backgroundColor: 'var(--surface)',
            borderRadius: 'var(--radius-lg)',
            padding: '1.5rem',
            boxShadow: 'var(--shadow-md)',
            border: '1px solid var(--border)',
            ...style
        }} className={className}>
            {title && (
                <h3 style={{
                    marginBottom: '1rem',
                    fontSize: '1.25rem',
                    fontWeight: '600',
                    color: 'var(--text-main)'
                }}>
                    {title}
                </h3>
            )}
            {children}
        </div>
    );
};

export default Card;
