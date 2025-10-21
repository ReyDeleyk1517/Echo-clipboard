import { X } from 'lucide-react'

function TextModal({
  text,
  onClose,
}: {
  text: string
  onClose: () => void
}) {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/70 z-50"
      onClick={onClose} // cerrar al hacer clic en el overlay
    >
      <div
        className="bg-zinc-900 border border-zinc-700 rounded-2xl p-8 w-[80%] h-[80%] shadow-2xl relative overflow-y-auto"
        onClick={(e) => e.stopPropagation()} // evita que clic dentro cierre el modal
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg bg-zinc-700 hover:bg-red-600 transition"
          title="Cerrar"
        >
          <X className="w-6 h-6 text-gray-200" />
        </button>
        <h3 className="text-2xl font-bold text-teal-300 mb-6">
          Texto completo
        </h3>
        <p className="text-gray-200 whitespace-pre-wrap break-words leading-relaxed">
          {text}
        </p>
      </div>
    </div>
  )
}

export { TextModal }
