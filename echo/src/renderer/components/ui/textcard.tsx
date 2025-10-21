import { ClipboardCopy, Trash2, Save, X } from 'lucide-react'
import { useState } from 'react'

const { App } = window

// Componente para cada card de texto
function TextCard({
  text,
  onDelete,
  onReCopy,
  onClick,
}: {
  text: string
  onDelete: () => void
  onReCopy: () => void
  onClick: () => void
}) {
  return (
    <div
      className="bg-zinc-900 border border-zinc-700 rounded-xl p-4 flex justify-between items-center gap-4 shadow-md cursor-pointer hover:bg-zinc-800 transition"
      onClick={onClick}
    >
      <span className="text-gray-300 truncate flex-1">{text}</span>
      <div
        className="flex gap-2"
        onClick={(e) => e.stopPropagation()} // evitar que el click en los botones abra el modal
      >
        <button
          onClick={onReCopy}
          className="p-2 rounded-lg bg-zinc-700 hover:bg-zinc-600 transition"
          title="Copiar de nuevo"
        >
          <ClipboardCopy className="w-4 h-4 text-teal-400" />
        </button>
        <button
          onClick={onDelete}
          className="p-2 rounded-lg bg-zinc-700 hover:bg-red-600 transition"
          title="Eliminar"
        >
          <Trash2 className="w-4 h-4 text-red-400" />
        </button>
      </div>
    </div>
  )
}

export {TextCard}