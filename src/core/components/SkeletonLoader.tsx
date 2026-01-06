import React from 'react';
import { Skeleton } from '@/core/components/ui/skeleton';

const SkeletonLoader: React.FC = () => {
  const SkeletonRow = () => (
    <tr className="w-full">
      <td className="px-6 py-4">
        <Skeleton className="h-4 w-24" />
      </td>
      <td className="px-6 py-4">
        <Skeleton className="h-4 w-3/4" />
      </td>
      <td className="px-6 py-4">
        <Skeleton className="h-4 w-full" />
      </td>
      <td className="px-6 py-4">
        <Skeleton className="h-4 w-1/2" />
      </td>
      <td className="px-6 py-4">
        <Skeleton className="h-6 w-20 rounded-full" />
      </td>
      <td className="px-6 py-4">
        <Skeleton className="h-4 w-full" />
      </td>
      <td className="px-6 py-4">
        <div className="flex justify-end gap-2">
          <Skeleton className="h-8 w-8" />
          <Skeleton className="h-8 w-8" />
        </div>
      </td>
    </tr>
  );

  const SkeletonCard = () => (
    <div className="bg-card text-card-foreground p-4 rounded-lg shadow-md border border-border">
      <div className="flex justify-between items-start pb-3 mb-3 border-b border-border">
        <div>
          <Skeleton className="h-3 w-20 mb-1" />
          <Skeleton className="h-6 w-28" />
        </div>
        <Skeleton className="h-6 w-24 rounded-full" />
      </div>

      <div className="space-y-3">
        <div>
          <Skeleton className="h-3 w-16 mb-1" />
          <Skeleton className="h-4 w-3/4 mb-1" />
          <Skeleton className="h-3 w-1/2" />
        </div>

        <div className="grid grid-cols-2 gap-x-4">
          <div>
            <Skeleton className="h-3 w-20 mb-1" />
            <Skeleton className="h-4 w-full" />
          </div>
          <div>
            <Skeleton className="h-3 w-12 mb-1" />
            <Skeleton className="h-4 w-16" />
          </div>
        </div>

        <div>
          <Skeleton className="h-3 w-12 mb-1" />
          <Skeleton className="h-4 w-2/5" />
        </div>

        <div>
          <Skeleton className="h-3 w-16 mb-1" />
          <div className="flex gap-2 mt-1">
            <Skeleton className="h-8 w-8" />
            <Skeleton className="h-8 w-8" />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="animate-pulse">
      {/* Desktop Skeleton */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-sm text-left text-muted-foreground">
          <thead className="text-xs text-foreground/80 uppercase bg-muted sticky top-0 z-10">
            <tr>
              <th scope="col" className="px-6 py-3">ID Autorización</th>
              <th scope="col" className="px-6 py-3">Afiliado</th>
              <th scope="col" className="px-6 py-3">Prestación</th>
              <th scope="col" className="px-6 py-3">CIE10</th>
              <th scope="col" className="px-6 py-3">Estado</th>
              <th scope="col" className="px-6 py-3">Turno</th>
              <th scope="col" className="px-6 py-3 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {[...Array(5)].map((_, i) => (
              <SkeletonRow key={i} />
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Skeleton */}
      <div className="md:hidden space-y-4">
        {[...Array(3)].map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    </div>
  );
};

export default SkeletonLoader;
