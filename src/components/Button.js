import React from 'react'

function Botton( { title, onClick, variant='primary-contained', disabled }) {
  return (
    <button onClick={onClick} disabled={disabled}
        className={
            `px-5 h-10
            ${variant==='primary-contained' && 'bg-primary text-white'}
            ${variant==='primary-outlined' && 'border-primary text-white bg-white'}
            ${disabled && 'opacity-50 cursor-not-allowed'}
            `
        }
    >
        { title }
    </button>
  )
}

export default Botton