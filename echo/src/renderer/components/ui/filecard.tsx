import { Download, Trash2, FileText } from "lucide-react"

type FileCardProps = {
  file: File
  onDelete: () => void
}

export function FileCard({ file, onDelete }: FileCardProps) {
  const handleDownload = async () => {
    try {
      // Crear un blob con el contenido del archivo
      const blob = new Blob([await file.arrayBuffer()], {
        type: file.type || "application/octet-stream",
      })

      // Crear un enlace temporal de descarga
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = file.name
      a.style.display = "none"

      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)

      // Liberar la URL para no consumir memoria
      URL.revokeObjectURL(url)

      console.log(`Archivo ${file.name} descargado ✅`)
    } catch (err) {
      console.error("No se pudo descargar el archivo:", err)
    }
  }

  return (
    <div className="bg-zinc-900 border border-zinc-700 rounded-xl p-4 flex justify-between items-center gap-4 shadow-md">
      <div className="flex items-center gap-3 flex-1 truncate">
        <FileText className="w-5 h-5 text-teal-400 flex-shrink-0" />
        <span className="text-gray-300 truncate">{file.name}</span>
      </div>
      <div className="flex gap-2">
        {/* Descargar archivo */}
        <button
          onClick={handleDownload}
          className="p-2 rounded-lg bg-zinc-700 hover:bg-teal-600 transition"
          title="Descargar archivo"
        >
          <Download className="w-4 h-4 text-teal-400" />
        </button>
        {/* Eliminar archivo */}
        <button
          onClick={onDelete}
          className="p-2 rounded-lg bg-zinc-700 hover:bg-red-600 transition"
          title="Eliminar archivo"
        >
          <Trash2 className="w-4 h-4 text-red-400" />
        </button>
      </div>
    </div>
  )
}
