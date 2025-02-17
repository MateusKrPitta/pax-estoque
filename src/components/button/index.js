import React from 'react';

export default function ButtonComponent({
    className = '',
    startIcon,
    endIcon,
    fontWeight = 'semibold',
    fontSize = 'sm',
    textAlign = 'center',
    onClick,
    isActive,
    disabled,
    title,
    subtitle
}) {
    // Tailwind classes para o botão
    const tailwindClasses = `
        ${className} 
        ${isActive ? 'bg-[#006b33] text-white' : 'bg-white text-primary'} // Estilos para o botão ativo
        border border-primary
        font-${fontWeight}
        text-${fontSize}
        text-${textAlign}
        p-2
        flex
        items-center
        font-semibold
        text-xs
        rounded-md
        transition-colors
        duration-300
        focus:outline-none
        ${disabled ? 'text-[#cccccc ]' : 'hover:bg-primary hover:text-white'}
    `;

    return (
        <button
            className={tailwindClasses}
            onClick={onClick}
            disabled={disabled}
            title={subtitle}
        >
            {startIcon && <span className="mr-2">{startIcon}</span>}
            {title}
            {endIcon && <span className="ml-2">{endIcon}</span>}
        </button>
    );
}