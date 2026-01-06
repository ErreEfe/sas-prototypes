// FIX: Importar React para traer el espacio de nombres 'React' al ámbito para tipos como React.ChangeEvent.
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { usePrestaciones } from '@/core/contexts/PrestacionesContext';
import type {
  PrestacionData,
  FilterState,
} from '../utils/prestaciones-helpers';

export const useGestionPrestaciones = (
  allData: PrestacionData[],
  initialFilters?: FilterState,
) => {
  const { getPrestacionDisplayStatus } = usePrestaciones();

  const [filters, setFilters] = useState<FilterState>({
    afiliado: '',
    prestacion: '',
    turno: '',
    autorizacionId: '',
    estado: '',
    denuncia: '',
  });

  const [filteredData, setFilteredData] = useState<PrestacionData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Effect to update filters from props on navigation
  useEffect(() => {
    setFilters(prevFilters => ({
      ...prevFilters,
      afiliado: '',
      prestacion: '',
      turno: '',
      autorizacionId: '',
      estado: '',
      denuncia: '',
      ...(initialFilters || {}),
    }));
  }, [initialFilters]);

  // Effect to apply filters whenever the data or manual filters change
  useEffect(() => {
    let data = [...allData];

    if (filters.afiliado) {
      const searchTerm = filters.afiliado.toLowerCase();
      data = data.filter(
        item =>
          item.afiliado.nombre.toLowerCase().includes(searchTerm) ||
          item.afiliado.dni
            .replace(/\./g, '')
            .includes(searchTerm.replace(/\./g, '')),
      );
    }

    if (filters.autorizacionId) {
      const searchTerm = filters.autorizacionId.toLowerCase();
      data = data.filter(item =>
        item.autorizacionId?.toLowerCase().includes(searchTerm),
      );
    }

    if (filters.denuncia) {
      const searchTerm = filters.denuncia.toLowerCase();
      data = data.filter(item =>
        item.denuncia?.toLowerCase().includes(searchTerm),
      );
    }

    if (filters.prestacion) {
      data = data.filter(item => item.prestacion === filters.prestacion);
    }

    if (filters.estado) {
      data = data.filter(
        item => getPrestacionDisplayStatus(item).text === filters.estado,
      );
    }

    if (filters.turno === 'con-turno') {
      data = data.filter(item => item.turno !== null);
    } else if (filters.turno === 'sin-turno') {
      data = data.filter(item => item.turno === null);
    }

    setFilteredData(data);
    setCurrentPage(1); // Reset to first page whenever filters change
  }, [filters, allData, getPrestacionDisplayStatus]);

  const handleFilterChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setFilters(prev => ({ ...prev, [name]: value }));
    },
    [],
  );

  const handleClear = useCallback(() => {
    setFilters({
      afiliado: '',
      prestacion: '',
      turno: '',
      autorizacionId: '',
      estado: '',
      denuncia: '',
    });
  }, []);

  const handleItemsPerPageChange = useCallback((newSize: number) => {
    setItemsPerPage(newSize);
    setCurrentPage(1);
  }, []);

  // --- Pagination Logic ---
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const paginatedData = useMemo(
    () => filteredData.slice(startIndex, endIndex),
    [filteredData, startIndex, endIndex],
  );

  const handleNextPage = useCallback(() => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  }, [currentPage, totalPages]);

  const handlePrevPage = useCallback(() => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }, [currentPage]);

  return {
    filters,
    filteredData,
    paginatedData,
    currentPage,
    totalPages,
    startIndex,
    endIndex,
    itemsPerPage,
    handleFilterChange,
    handleClear,
    handleNextPage,
    handlePrevPage,
    handleItemsPerPageChange,
  };
};
