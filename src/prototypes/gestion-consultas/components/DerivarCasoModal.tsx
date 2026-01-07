import React, { useState } from 'react';
import { Button } from '@/core/components/ui/button';
import { Textarea } from '@/core/components/ui/textarea';
import { Select } from '@/core/components/ui/select';
import Autocomplete from '@/core/components/Autocomplete';
import { X } from 'lucide-react';

interface DerivarCasoModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (data: { area: string; gestor: string; observaciones: string }) => void;
}

interface Gestor {
    id: string;
    nombre: string;
}

const AREAS = [
    { label: 'CEM', value: 'CEM' },
    { label: 'Mesa de Carga', value: 'Mesa de Carga' },
    { label: 'Auditoría Médica', value: 'Auditoría Médica' },
    { label: 'Legales', value: 'Legales' }
];

const GESTORES: Gestor[] = [
    { id: '1', nombre: 'Eduardo Romano' },
    { id: '2', nombre: 'Ana Martínez' },
    { id: '3', nombre: 'Carlos Rodríguez' },
    { id: '4', nombre: 'Lucía Fernández' },
    { id: '5', nombre: 'Juan Pérez' }
];

const DerivarCasoModal: React.FC<DerivarCasoModalProps> = ({
    isOpen,
    onClose,
    onConfirm
}) => {
    const [area, setArea] = useState('');
    const [gestor, setGestor] = useState<Gestor | null>(null);
    const [gestorInput, setGestorInput] = useState('');
    const [observaciones, setObservaciones] = useState('');

    if (!isOpen) return null;

    const handleConfirm = () => {
        if (!area) return;
        onConfirm({
            area,
            gestor: gestor?.nombre || '',
            observaciones
        });
        // Reset and close
        setArea('');
        setGestor(null);
        setGestorInput('');
        setObservaciones('');
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-slate-900/60 z-[10000] flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden border border-gray-100 animate-in zoom-in-95 duration-200">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                    <h3 className="text-xl font-bold text-gray-900">Derivar Caso</h3>
                    <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                        <X className="h-5 w-5 text-gray-500" />
                    </button>
                </div>

                <div className="p-6 space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700 uppercase tracking-tight">Área a derivar *</label>
                        <Select
                            placeholder="Seleccione un área..."
                            options={AREAS}
                            value={area}
                            onChange={(e) => setArea(e.target.value)}
                            className="h-12 border-gray-200 focus:ring-blue-500 rounded-xl"
                        />
                    </div>

                    <div className="space-y-2">
                        <Autocomplete<Gestor>
                            id="gestor-autocomplete"
                            label="Gestor (opcional)"
                            placeholder="Buscar gestor..."
                            options={GESTORES}
                            getOptionLabel={(o) => o.nombre}
                            getOptionValue={(o) => o.id}
                            value={gestor}
                            onChange={(val) => setGestor(val)}
                            inputValue={gestorInput}
                            onInputChange={setGestorInput}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700 uppercase tracking-tight">Observaciones</label>
                        <Textarea
                            placeholder="Ingrese observaciones adicionales..."
                            value={observaciones}
                            onChange={(e) => setObservaciones(e.target.value)}
                            className="min-h-[100px] rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500 p-4 transition-all"
                        />
                    </div>
                </div>

                <div className="p-6 bg-gray-50 flex flex-col sm:flex-row justify-end gap-3 border-t border-gray-100">
                    <Button variant="outline" onClick={onClose} className="rounded-full px-8 py-6 h-auto text-base hover:bg-white">
                        Cancelar
                    </Button>
                    <Button
                        onClick={handleConfirm}
                        disabled={!area}
                        className="rounded-full px-8 py-6 h-auto text-base shadow-lg shadow-blue-500/20 active:scale-95 transition-transform"
                    >
                        Enviar
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default DerivarCasoModal;
