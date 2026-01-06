import React, { useState, useEffect } from 'react';
import Drawer from './Drawer';
import { NoteAddIcon, FileDownloadIcon, ViewIcon } from './icons';
import type { PrestacionData } from '../utils/prestaciones-helpers';
import { usePrestaciones } from '@/core/contexts/PrestacionesContext';
import { useToast } from '../contexts/ToastContext';

interface PrestacionDetalleDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  prestacion: PrestacionData | null;
  triggerRef: React.RefObject<HTMLElement>;
  onNuevaPrestacion: () => void;
}

const SectionCard: React.FC<{ title: string; children: React.ReactNode }> = ({
  title,
  children,
}) => (
  <div className="bg-background-alt p-4 rounded-lg border border-border">
    <h3 className="text-sm font-bold text-text-primary mb-3">{title}</h3>
    <div className="space-y-4">{children}</div>
  </div>
);

const DetailRow: React.FC<{ label: string; value: React.ReactNode }> = ({
  label,
  value,
}) => (
  <div>
    <p className="text-xs font-medium text-text-secondary uppercase tracking-wider">
      {label}
    </p>
    <div className="mt-1 text-text-primary">{value}</div>
  </div>
);

const PrestacionDetalleDrawer: React.FC<PrestacionDetalleDrawerProps> = ({
  isOpen,
  onClose,
  prestacion,
  triggerRef,
  onNuevaPrestacion,
}) => {
  const { getPrestacionDisplayStatus, cie10DescriptionMap, allData } =
    usePrestaciones();
  const { addToast } = useToast();
  const [activeTab, setActiveTab] = useState<'detalle' | 'asociadas'>(
    'detalle',
  );

  useEffect(() => {
    if (isOpen) {
      setActiveTab('detalle');
    }
  }, [isOpen, prestacion]);

  const formatTurno = (turno: string | null) => {
    if (!turno) return 'No asignado';
    return (
      new Date(turno).toLocaleString('es-AR', {
        dateStyle: 'full',
        timeStyle: 'short',
      }) + ' hs.'
    );
  };

  const handleDownloadInforme = () => {
    if (prestacion?.informe) {
      addToast(`Descargando informe: ${prestacion.informe}`, 'info');
    }
  };

  const handleViewInforme = () => {
    if (prestacion?.informe) {
      addToast(`Visualizando informe: ${prestacion.informe}`, 'info');
    }
  };

  const handleDownloadDocumento = (documentoNombre: string) => {
    addToast(`Descargando documento: ${documentoNombre}`, 'info');
  };

  const handleDownloadAutorizacion = () => {
    if (prestacion?.autorizacionId) {
      addToast(
        `Descargando autorización #${prestacion.autorizacionId}.pdf`,
        'info',
      );
    }
  };

  if (!prestacion) return null;

  const displayStatus = getPrestacionDisplayStatus(prestacion);
  const isReadOnly =
    prestacion.estado === 'Cancelado' || prestacion.estado === 'Preliquidado';
  const cie10Description =
    cie10DescriptionMap[prestacion.cie10] || 'Descripción no disponible';

  const prestacionesAsociadas = prestacion.autorizacionId
    ? allData.filter(
      p =>
        p.autorizacionId === prestacion.autorizacionId &&
        p.id !== prestacion.id,
    )
    : [];

  const StatusChip = ({
    prestacionData,
  }: {
    prestacionData: PrestacionData;
  }) => {
    const status = getPrestacionDisplayStatus(prestacionData);
    return (
      <span
        className={`px-2 py-1 text-xs font-medium rounded border whitespace-nowrap ${status.bg} ${status.textColor} ${status.borderColor}`}
      >
        {status.text}
      </span>
    );
  };

  const footer = (
    <div className="flex justify-end gap-4 w-full">
      <button
        onClick={onClose}
        className="px-6 py-2 bg-surface text-text-primary border border-border-strong font-medium rounded-full hover:bg-background-alt transition"
      >
        Cerrar
      </button>
      {!isReadOnly && prestacion.estado === 'Aprobado' && !prestacion.turno && (
        <button
          onClick={onNuevaPrestacion}
          className="px-6 py-2 bg-primary text-text-on-primary font-medium rounded-full hover:bg-primary-hover transition"
        >
          Nueva Prestación
        </button>
      )}
    </div>
  );

  const tabBaseClasses =
    'whitespace-nowrap pb-3 pt-1 px-1 border-b-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-focus-ring rounded-t-sm';
  const activeTabClasses = 'border-primary text-primary';
  const inactiveTabClasses =
    'border-transparent text-text-secondary hover:text-text-primary hover:border-border-strong';

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      triggerRef={triggerRef}
      title="Detalle de la Prestación"
      footerContent={footer}
    >
      <div className="px-6 pt-4">
        <div className="flex justify-start">
          <span
            className={`px-3 py-1 text-sm font-medium rounded border ${displayStatus.bg} ${displayStatus.textColor} ${displayStatus.borderColor}`}
          >
            {displayStatus.text}
          </span>
        </div>
      </div>

      <div className="border-b border-border mt-4 sticky top-0 bg-surface z-10">
        <nav className="-mb-px flex space-x-6 px-6" aria-label="Tabs">
          <button
            onClick={() => setActiveTab('detalle')}
            className={`${tabBaseClasses} ${activeTab === 'detalle' ? activeTabClasses : inactiveTabClasses}`}
            role="tab"
            aria-selected={activeTab === 'detalle'}
          >
            Detalle de la Prestación
          </button>
          <button
            onClick={() => setActiveTab('asociadas')}
            className={`${tabBaseClasses} ${activeTab === 'asociadas' ? activeTabClasses : inactiveTabClasses}`}
            role="tab"
            aria-selected={activeTab === 'asociadas'}
          >
            Prestaciones Asociadas
          </button>
        </nav>
      </div>

      <div className="p-6">
        {activeTab === 'detalle' && (
          <div className="space-y-6" role="tabpanel">
            <SectionCard title="Información del Afiliado">
              <DetailRow
                label="Nombre Completo"
                value={
                  <p className="font-semibold">{prestacion.afiliado.nombre}</p>
                }
              />
              <DetailRow label="DNI" value={<p>{prestacion.afiliado.dni}</p>} />
              <DetailRow
                label="Nro. Denuncia"
                value={<p className="font-mono">{prestacion.denuncia}</p>}
              />
              <DetailRow
                label="Diagnóstico (CIE10)"
                value={
                  <>
                    <p className="font-semibold">{cie10Description}</p>
                    <p className="text-sm text-text-secondary font-mono">
                      {prestacion.cie10}
                    </p>
                  </>
                }
              />
            </SectionCard>

            <SectionCard title="Detalles de la Prestación">
              {prestacion.autorizacionId && (
                <DetailRow
                  label="ID Autorización"
                  value={
                    <p className="font-mono">{prestacion.autorizacionId}</p>
                  }
                />
              )}
              {prestacion.estado !== 'Pendiente' &&
                prestacion.autorizacionId && (
                  <DetailRow
                    label="Autorización"
                    value={
                      <button
                        onClick={handleDownloadAutorizacion}
                        className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-primary bg-primary-lightest rounded-full hover:bg-blue-100 border border-blue-200 transition"
                      >
                        <FileDownloadIcon className="w-4 h-4" />
                        <span>Descargar PDF</span>
                      </button>
                    }
                  />
                )}
              <DetailRow
                label="Prestación Solicitada"
                value={<p>{prestacion.prestacion}</p>}
              />
              <DetailRow
                label="Turno Asignado"
                value={<p>{formatTurno(prestacion.turno)}</p>}
              />
              {prestacion.estado === 'Reprogramado' &&
                prestacion.motivoReprogramacion && (
                  <DetailRow
                    label="Motivo de Reprogramación"
                    value={
                      <p className="italic text-gray-700">
                        {prestacion.motivoReprogramacion}
                      </p>
                    }
                  />
                )}
              <DetailRow
                label="Observación"
                value={
                  <p className="text-sm italic text-gray-700">
                    {prestacion.observacion || 'Sin observaciones.'}
                  </p>
                }
              />
            </SectionCard>

            {prestacion.informe && (
              <SectionCard title="Informe Adjunto">
                <div className="flex items-center justify-between bg-surface p-3 rounded-md border">
                  <div className="flex items-center truncate mr-2">
                    <NoteAddIcon className="w-6 h-6 text-status-info-icon mr-3 flex-shrink-0" />
                    <span
                      className="text-sm font-medium text-text-primary truncate"
                      title={prestacion.informe}
                    >
                      {prestacion.informe}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <button
                      onClick={handleViewInforme}
                      className="p-2 text-text-secondary hover:text-primary rounded-full hover:bg-background-alt transition"
                      title="Ver Informe"
                    >
                      <ViewIcon className="w-5 h-5" />
                    </button>
                    <button
                      onClick={handleDownloadInforme}
                      className="p-2 text-text-secondary hover:text-primary rounded-full hover:bg-background-alt transition"
                      title="Descargar Informe"
                    >
                      <FileDownloadIcon className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </SectionCard>
            )}
          </div>
        )}

        {activeTab === 'asociadas' && (
          <div role="tabpanel">
            {prestacionesAsociadas.length > 0 ? (
              <div className="space-y-4">
                {prestacionesAsociadas.map(p => (
                  <div
                    key={p.id}
                    className="bg-background-alt p-4 rounded-lg border border-border"
                  >
                    <div className="flex justify-between items-start">
                      <p className="font-semibold text-text-primary pr-4">
                        {p.prestacion}
                      </p>
                      <div className="flex-shrink-0">
                        <StatusChip prestacionData={p} />
                      </div>
                    </div>
                    <p className="text-sm text-text-secondary mt-2">
                      Turno:{' '}
                      {p.turno
                        ? new Date(p.turno).toLocaleString('es-AR', {
                          dateStyle: 'short',
                          timeStyle: 'short',
                        }) + ' hs.'
                        : 'No asignado'}
                    </p>

                    {(p.cantidad || p.observacion || p.documentoAdjunto) && (
                      <div className="mt-3 pt-3 border-t border-border space-y-3">
                        {p.cantidad && (
                          <DetailRow
                            label="Cantidad"
                            value={
                              <p className="font-semibold">{p.cantidad}</p>
                            }
                          />
                        )}
                        {p.observacion && (
                          <DetailRow
                            label="Observación"
                            value={
                              <p className="text-sm italic text-gray-700">
                                {p.observacion}
                              </p>
                            }
                          />
                        )}
                        {p.documentoAdjunto && (
                          <DetailRow
                            label="Documentación Clínica"
                            value={
                              <div className="flex items-center justify-between bg-surface p-2 rounded-md border">
                                <div className="flex items-center truncate mr-2">
                                  <NoteAddIcon className="w-5 h-5 text-status-info-icon mr-2 flex-shrink-0" />
                                  <span
                                    className="text-sm font-medium text-text-primary truncate"
                                    title={p.documentoAdjunto}
                                  >
                                    {p.documentoAdjunto}
                                  </span>
                                </div>
                                <button
                                  onClick={() =>
                                    handleDownloadDocumento(p.documentoAdjunto!)
                                  }
                                  className="p-2 text-text-secondary hover:text-primary rounded-full hover:bg-background-alt transition"
                                  title="Descargar Documentación"
                                >
                                  <FileDownloadIcon className="w-5 h-5" />
                                </button>
                              </div>
                            }
                          />
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-text-secondary">
                  No hay otras prestaciones con el mismo ID de autorización.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </Drawer>
  );
};

export default PrestacionDetalleDrawer;
