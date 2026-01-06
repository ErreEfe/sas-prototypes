import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { usePrestaciones } from '@/core/contexts/PrestacionesContext';
import type {
  PrestacionData,
  FilterState,
} from '../utils/prestaciones-helpers';

export const useCrearPreliquidacion = () => {
  const { allData, getPrestacionDisplayStatus } = usePrestaciones();

  // Base data: only prestations ready for pre-liquidation
  const elegibleData = useMemo(() => {
    return allData.filter(
      p => getPrestacionDisplayStatus(p).text === 'Con Informe',
    );
  }, [allData, getPrestacionDisplayStatus]);

  const [filters, setFilters] = useState<FilterState>({
    afiliado: '',
    prestacion: '',
    autorizacionId: '',
    denuncia: '',
    startDate: null,
    endDate: null,
  });
  const [filteredData, setFilteredData] = useState<PrestacionData[]>([]);

  // Selection state
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());

  // Apply filters on top of elegible data
  useEffect(() => {
    let data = [...elegibleData];

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

    if (filters.startDate) {
      const startDate = new Date(filters.startDate);
      startDate.setHours(0, 0, 0, 0);
      data = data.filter(
        item => item.turno && new Date(item.turno) >= startDate,
      );
    }

    if (filters.endDate) {
      const endDate = new Date(filters.endDate);
      endDate.setHours(23, 59, 59, 999);
      data = data.filter(item => item.turno && new Date(item.turno) <= endDate);
    }

    setFilteredData(data);
  }, [filters, elegibleData]);

  const handleFilterChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setFilters(prev => ({ ...prev, [name]: value }));
    },
    [],
  );

  const handleDateChange = useCallback(
    (name: 'startDate' | 'endDate', date: Date | null) => {
      setFilters(prev => ({ ...prev, [name]: date }));
    },
    [],
  );

  const handleClearFilters = useCallback(() => {
    setFilters({
      afiliado: '',
      prestacion: '',
      autorizacionId: '',
      denuncia: '',
      startDate: null,
      endDate: null,
    });
  }, []);

  // Selection handlers
  const handleSelect = (id: number) => {
    setSelectedIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const handleSelectAll = (isSelectingAll: boolean) => {
    if (isSelectingAll) {
      setSelectedIds(new Set(filteredData.map(p => p.id)));
    } else {
      setSelectedIds(new Set());
    }
  };

  const selectedPrestaciones = useMemo(() => {
    return allData.filter(p => selectedIds.has(p.id));
  }, [selectedIds, allData]);

  const summary = useMemo(() => {
    const totalAmount = selectedPrestaciones.reduce(
      (sum, p) => sum + p.monto,
      0,
    );
    return { count: selectedPrestaciones.length, totalAmount };
  }, [selectedPrestaciones]);

  return {
    filters,
    filteredData, // The data to display in the table
    selectedIds,
    selectedPrestaciones, // The actual selected prestation objects
    summary,
    handleFilterChange,
    handleDateChange,
    handleClearFilters,
    handleSelect,
    handleSelectAll,
  };
};
