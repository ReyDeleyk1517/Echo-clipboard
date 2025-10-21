import { UploadCloud } from 'lucide-react'
import { useRef, useState } from 'react'

interface UploadDropzoneProps {
  onDrop: (e: React.DragEvent<HTMLDivElement>) => void
  onClick: () => void
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  fileInputRef: React.RefObject<HTMLInputElement | null>
  accept?: string[]
  label?: string
}

export function UploadDropzone({
  onDrop,
  onClick,
  onFileChange,
  fileInputRef,
  accept,
  label = 'Arrastra archivos aquí o haz clic para seleccionar',
}: UploadDropzoneProps) {
  const acceptString = accept?.join(',') || '*'
  const [errorMessage, setErrorMessage] = useState('')

  // Validación de archivos arrastrados
  const handleValidatedDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()

    const droppedFiles = Array.from(e.dataTransfer.files)
    if (!accept || accept.length === 0) {
      onDrop(e) // sin filtro si no se especifica
      return
    }

    const invalidFiles = droppedFiles.filter(file => {
      const fileExt = '.' + file.name.split('.').pop()?.toLowerCase()
      return !accept.includes(fileExt)
    })

    if (invalidFiles.length > 0) {
      setErrorMessage(
        `Se ignoraron ${invalidFiles.length} archivo(s) con extensiones inválidas:\n` +
        invalidFiles.map(f => `• ${f.name}`).join('\n')
      )
      return
    }

    setErrorMessage('')
    onDrop(e)
  }

  return (
    <div>
      <div
        className="border-2 border-dashed border-teal-400 bg-zinc-800/40 text-center p-10 rounded-xl text-white text-xl cursor-pointer"
        onClick={onClick}
        onDrop={handleValidatedDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        <UploadCloud className="mx-auto mb-2 text-teal-400 w-10 h-10" />
        {label}
        <input
          type="file"
          multiple
          accept={acceptString}
          ref={fileInputRef}
          onChange={(e) => {
            const selectedFiles = Array.from(e.target.files || [])
            if (accept && accept.length > 0) {
              const invalidFiles = selectedFiles.filter(file => {
                const ext = '.' + file.name.split('.').pop()?.toLowerCase()
                return !accept.includes(ext)
              })

              if (invalidFiles.length > 0) {
                setErrorMessage(
                  `Archivo(s) inválido(s):\n` +
                  invalidFiles.map(f => `• ${f.name}`).join('\n')
                )
                return
              }
            }

            setErrorMessage('')
            onFileChange(e)
          }}
          className="hidden"
        />
      </div>

      {/* Mensaje de error */}
      {errorMessage && (
        <div className="text-red-500 mt-2 whitespace-pre-line text-sm bg-red-950/40 p-2 rounded-lg border border-red-600">
          {errorMessage}
        </div>
      )}
    </div>
  )
}
