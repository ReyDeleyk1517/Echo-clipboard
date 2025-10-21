import { Trash2 } from 'lucide-react'

interface FileListProps {
  files: File[]
  onRemoveFile: (index: number) => void
  emptyMessage?: string
}

export function FileList({ files, onRemoveFile, emptyMessage }: FileListProps) {
  if (files.length === 0 && emptyMessage) {
    return <p className="text-zinc-400 text-sm text-center p-4">{emptyMessage}</p>
  }

  return (
    <div className="h-32 overflow-y-auto bg-zinc-800/70 p-4 rounded-xl border border-zinc-700">
      <ul className="space-y-2">
        {files.map((file, idx) => (
          <li
            key={idx}
            className="text-white text-sm truncate flex items-center justify-between gap-4"
          >
            <span className="truncate">📄 {file.name}</span>
            <button
              onClick={() => onRemoveFile(idx)}
              className="text-red-400 hover:text-red-500 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}