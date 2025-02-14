import React from 'react';

export default function ButtonComponent({
    className = '', // Valor padrão para a classe
    startIcon,
    endIcon,
    fontWeight = 'semibold', // Valor padrão para fontWeight
    fontSize = 'sm', // Valor padrão para fontSize
    textAlign = 'center', // Valor padrão para textAlign
    onClick,
    isActive,
    disabled,
    title,
    subtitle
}) {
    // Tailwind classes para o botão
    const tailwindClasses = `
        ${className} 
        ${isActive ? 'border border-primary border-b-2 border-b-yellow-300' : disabled ? 'border border-[#cccccc]' : 'border border-primary'}
        font-${fontWeight}
        text-${fontSize}
        text-${textAlign}
        bg-white
        p-2
        flex
        items-center
        font-semibold
        text-xs
        rounded-md
        transition-colors
        duration-300
        focus:outline-none
        ${disabled ? 'text-[#cccccc]' : 'hover:bg-primary hover:text-white text-primary'}
    `;

    return (
        <button
            className={tailwindClasses} // Tailwind classes aplicadas ao botão
            onClick={onClick}
            disabled={disabled}
            title={subtitle}
        >
            {startIcon && <span className="mr-2">{startIcon}</span>} {/* Ícone inicial, se presente */}
            {title} {/* Texto do botão */}
            {endIcon && <span className="ml-2">{endIcon}</span>} {/* Ícone final, se presente */}
        </button>
    );
}
