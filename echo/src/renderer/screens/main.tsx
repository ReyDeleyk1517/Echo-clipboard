import { ClipboardCopy, Trash2, Save } from 'lucide-react'
import { useState, useRef } from 'react'
import { TextCard } from 'renderer/components/ui/textcard'
import { TextModal } from 'renderer/components/ui/textmodal'
import { UploadDropzone } from 'renderer/components/ui/upload-dropzone'
import { FileCard } from 'renderer/components/ui/filecard'

const { App } = window

// Pantalla principal
export function MainScreen() {
  // --- Textos ---
  const [copiedTexts, setCopiedTexts] = useState<string[]>([])
  const [selectedText, setSelectedText] = useState<string | null>(null)

  // --- Archivos ---
  const [files, setFiles] = useState<File[]>([])
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  // --- Funciones texto ---
  const handleSaveClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText()
      if (text && text.trim() !== "" && !copiedTexts.includes(text)) {
        setCopiedTexts((prev) => [text, ...prev])
      }
    } catch (err) {
      console.error("No se pudo leer el portapapeles:", err)
    }
  }

  const handleDeleteText = (index: number) => {
    setCopiedTexts((prev) => prev.filter((_, i) => i !== index))
  }

  const handleDeleteAllTexts = () => {
    setCopiedTexts([])
  }

  const handleReCopy = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  // --- Funciones archivos ---
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const droppedFiles = Array.from(e.dataTransfer.files)
    setFiles((prev) => [...prev, ...droppedFiles])
  }

  const handleClickDropzone = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files)
      setFiles((prev) => [...prev, ...selectedFiles])
    }
  }

  const handleCopyFile = async (file: File) => {
    try {
      const text = await file.text()
      await navigator.clipboard.writeText(text)
      console.log(`Contenido de ${file.name} copiado al portapapeles`)
    } catch {
      await navigator.clipboard.writeText(file.name)
      console.log(`Nombre de archivo ${file.name} copiado`)
    }
  }

  const handleDeleteFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }

  return (
    <main className="flex flex-col min-h-screen w-full bg-gradient-to-b from-zinc-900 via-zinc-800 to-zinc-900 text-gray-200">
      {/* Header */}
      <header className="flex flex-col items-center justify-center py-12 text-center">
        <h1 className="text-5xl font-extrabold tracking-tight text-teal-400 drop-shadow-lg">
          Echo
        </h1>
        <p className="mt-3 text-xl text-gray-300 max-w-2xl">
          <span className="text-blue-500 font-semibold">
            manager de copiado y pegado
          </span>
        </p>
      </header>

      {/* Contenido */}
      <section className="flex flex-1 w-full max-w-7xl mx-auto px-6 pb-12">
        {/* Columna izquierda */}
        <div className="w-1/2 flex flex-col pr-4">
          <div className="flex items-center justify-center mb-4">
            <h2 className="text-2xl font-bold text-teal-300">Texto</h2>
          </div>
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={handleSaveClipboard}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-medium shadow-md transition"
            >
              <Save className="w-5 h-5" />
              Pegar
            </button>
            <button
              onClick={handleDeleteAllTexts}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-800 hover:bg-red-500 text-white font-medium shadow-md transition"
            >
              <Trash2 className="w-5 h-5" />
              Limpiar
            </button>
          </div>

          <div className="bg-zinc-800/80 border border-zinc-700 rounded-2xl p-5 shadow-xl w-full min-h-[350px] overflow-y-auto space-y-4">
            {copiedTexts.length === 0 ? (
              <p className="text-gray-500">
                Copia algún texto y guárdalo para verlo aquí...
              </p>
            ) : (
              copiedTexts.map((text, index) => (
                <TextCard
                  key={index}
                  text={text}
                  onReCopy={() => handleReCopy(text)}
                  onDelete={() => handleDeleteText(index)}
                  onClick={() => setSelectedText(text)}
                />
              ))
            )}
          </div>
        </div>

        {/* Separador */}
        <div className="w-px bg-zinc-700/80 mx-4 flex-shrink-0 rounded-full" />

        {/* Columna derecha */}
        <div className="w-1/2 flex flex-col pl-4">
          <h2 className="text-2xl font-bold mb-4 text-teal-300">Archivos</h2>

          {/* Dropzone */}
          <UploadDropzone
            onDrop={handleDrop}
            onClick={handleClickDropzone}
            onFileChange={handleFileChange}
            fileInputRef={fileInputRef}
            accept={['.txt', '.md', '.jpg']}
            label="Arrastra archivos o haz clic para subir"
          />

          {/* Lista de archivos */}
          <div className="mt-4 bg-zinc-800/80 border border-zinc-700 rounded-2xl p-5 shadow-xl w-full min-h-[300px] overflow-y-auto space-y-3">
            {files.length === 0 ? (
              <p className="text-gray-500">
                Sube archivos y se mostrarán aquí...
              </p>
            ) : (
              files.map((file, index) => (
                <FileCard
                  key={index}
                  file={file}
                  
                  onDelete={() => handleDeleteFile(index)}
                />
              ))
            )}
          </div>
        </div>
      </section>

      {/* Modal flotante */}
      {selectedText && (
        <TextModal text={selectedText} onClose={() => setSelectedText(null)} />
      )}
    </main>
  )
}
