
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Activity, Accessibility, FileQuestion } from 'lucide-react';

const PrototypeSelector: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-6 font-sans">
            <div className="max-w-4xl w-full">
                <header className="mb-12 text-center">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">
                        Selecciona un Prototipo
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Bienvenido al entorno de pruebas de SAS. Por favor, selecciona el módulo al que deseas acceder.
                    </p>
                </header>

                <div className="grid md:grid-cols-1 gap-8 max-w-xl mx-auto">
                    {/* Card 2: SAS Incapacidades */}
                    <div
                        onClick={() => navigate('/sas-incapacidades')}
                        className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer border border-gray-100 hover:border-indigo-500/30"
                    >
                        <div className="absolute top-0 left-0 w-2 h-full bg-indigo-600 group-hover:w-3 transition-all"></div>
                        <div className="p-8">
                            <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center mb-6 text-indigo-600 group-hover:scale-110 transition-transform duration-300">
                                <Accessibility size={28} />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors">
                                SAS Incapacidades
                            </h2>
                            <p className="text-gray-600 mb-8 leading-relaxed">
                                Gestión de siniestros, incidencias y consultas especializadas. Enfocado en el seguimiento de casos de incapacidad.
                            </p>

                            <div className="flex items-center text-indigo-600 font-semibold group-hover:translate-x-2 transition-transform">
                                Ingresar al módulo <ArrowRight className="ml-2 w-5 h-5" />
                            </div>
                        </div>
                    </div>


                    {/* Card 3: Formularios Públicos */}
                    <div
                        onClick={() => navigate('/formularios-publicos')}
                        className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer border border-gray-100 hover:border-orange-500/30"
                    >
                        <div className="absolute top-0 left-0 w-2 h-full bg-orange-500 group-hover:w-3 transition-all"></div>
                        <div className="p-8">
                            <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center mb-6 text-orange-600 group-hover:scale-110 transition-transform duration-300">
                                <FileQuestion size={28} />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors">
                                Consultas y Reclamos
                            </h2>
                            <p className="text-gray-600 mb-8 leading-relaxed">
                                Portal público para la gestión de consultas, estado de siniestros y reclamos. Diseño neutral y accesible.
                            </p>

                            <div className="flex items-center text-orange-600 font-semibold group-hover:translate-x-2 transition-transform">
                                Ingresar al módulo <ArrowRight className="ml-2 w-5 h-5" />
                            </div>
                        </div>
                    </div>
                </div>

                <footer className="mt-16 text-center text-sm text-gray-400">
                    © {new Date().getFullYear()} Designed by product, powered by AI
                </footer>
            </div>

        </div>
    );
};

export default PrototypeSelector;
