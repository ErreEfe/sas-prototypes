import React, { useState, useRef } from 'react';
import { UploadCloudIcon, XIcon, FileIcon, EyeIcon } from 'lucide-react';
import { Button } from '@/core/components/ui/button';

interface FileUploadProps {
    id: string;
    label: string;
    required?: boolean;
    disabled?: boolean;
    files: (File | string)[];
    onChange: (files: (File | string)[]) => void;
    maxSize?: number; // en MB
    acceptedFormats?: string[];
}

const FileUpload: React.FC<FileUploadProps> = ({
    id,
    label,
    required = false,
    disabled = false,
    files,
    onChange,
    maxSize = 50,
    acceptedFormats = ['PDF', 'PNG', 'JPG', 'JPEG', 'DOC', 'DOCX'],
}) => {
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleDragEnter = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (!disabled) {
            setIsDragging(true);
        }
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        if (disabled) return;

        const droppedFiles = Array.from(e.dataTransfer.files);
        addFiles(droppedFiles);
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = Array.from(e.target.files || []);
        addFiles(selectedFiles);
    };

    const addFiles = (newFiles: File[]) => {
        // Validar y agregar archivos
        const validFiles = newFiles.filter((file) => {
            const extension = file.name.split('.').pop()?.toUpperCase();
            const sizeInMB = file.size / (1024 * 1024);

            if (sizeInMB > maxSize) {
                alert(`El archivo ${file.name} excede el tamaño máximo de ${maxSize}MB`);
                return false;
            }

            if (extension && !acceptedFormats.includes(extension)) {
                alert(`El archivo ${file.name} tiene un formato no permitido`);
                return false;
            }

            return true;
        });

        onChange([...files, ...validFiles]);
    };

    const removeFile = (index: number) => {
        const updatedFiles = files.filter((_, i) => i !== index);
        onChange(updatedFiles);
    };

    const handleBrowseClick = () => {
        fileInputRef.current?.click();
    };

    const handleViewFile = (file: File | string) => {
        // En producción, aquí se abriría/descargaría el archivo
        const fileName = typeof file === 'string' ? file : file.name;
        alert(`Ver/Descargar archivo: ${fileName}`);
    };

    const formatFileSize = (bytes: number): string => {
        if (bytes < 1024) return bytes + ' B';
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
        return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
    };

    const getFileIcon = (fileName: string) => {
        const extension = fileName.split('.').pop()?.toLowerCase();
        return <FileIcon className="w-8 h-8 text-red-500" />;
    };

    const getFileName = (file: File | string): string => {
        return typeof file === 'string' ? file : file.name;
    };

    const getFileSize = (file: File | string): string => {
        if (typeof file === 'string') {
            // Para archivos ya cargados, mostrar un tamaño de ejemplo
            return '1.35 KB';
        }
        return formatFileSize(file.size);
    };

    return (
        <div className="space-y-3">
            {/* Área de drag & drop - solo visible si no está disabled */}
            {!disabled && (
                <>
                    <div
                        onDragEnter={handleDragEnter}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        className={`
                            border-2 border-dashed rounded-lg p-8 text-center transition-all
                            ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}
                            cursor-pointer hover:border-gray-400
                        `}
                    >
                        <div className="flex flex-col items-center gap-3">
                            <UploadCloudIcon className="w-12 h-12 text-gray-400" />
                            <div>
                                <p className="text-sm font-medium text-gray-700">
                                    Selecciona un archivo o arrástralo aquí
                                </p>
                                <p className="text-xs text-gray-500 mt-1">
                                    {acceptedFormats.join(', ')}, hasta {maxSize}MB
                                </p>
                            </div>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={handleBrowseClick}
                                className="mt-2"
                            >
                                Examinar archivo
                            </Button>
                        </div>
                    </div>

                    {/* Input oculto */}
                    <input
                        ref={fileInputRef}
                        id={id}
                        type="file"
                        multiple
                        onChange={handleFileSelect}
                        className="hidden"
                        accept={acceptedFormats.map((format) => `.${format.toLowerCase()}`).join(',')}
                    />
                </>
            )}

            {/* Lista de archivos cargados */}
            {files.length > 0 && (
                <div className="space-y-2">
                    {files.map((file, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200"
                        >
                            <div className="flex items-center gap-3 flex-1 min-w-0">
                                {getFileIcon(getFileName(file))}
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900 truncate">
                                        {getFileName(file)}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        {getFileSize(file)}
                                    </p>
                                </div>
                            </div>
                            {disabled ? (
                                <button
                                    type="button"
                                    onClick={() => handleViewFile(file)}
                                    className="ml-3 p-1 rounded-full hover:bg-gray-200 transition-colors"
                                    aria-label="Ver archivo"
                                >
                                    <EyeIcon className="w-5 h-5 text-blue-600" />
                                </button>
                            ) : (
                                <button
                                    type="button"
                                    onClick={() => removeFile(index)}
                                    className="ml-3 p-1 rounded-full hover:bg-gray-200 transition-colors"
                                    aria-label="Eliminar archivo"
                                >
                                    <XIcon className="w-5 h-5 text-gray-500" />
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default FileUpload;
