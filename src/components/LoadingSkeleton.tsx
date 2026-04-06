import React from 'react';
import { cn } from '../lib/utils';

interface SkeletonProps {
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({ className }) => {
  return (
    <div className={cn("animate-pulse bg-gray-200 rounded-2xl", className)} />
  );
};

export const PlaceCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-[2.5rem] shadow-xl overflow-hidden border border-gray-100 p-4 space-y-4">
      <Skeleton className="w-full aspect-[4/3]" />
      <div className="space-y-2 px-2">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <div className="flex gap-2 pt-2">
          <Skeleton className="h-8 w-20 rounded-full" />
          <Skeleton className="h-8 w-20 rounded-full" />
        </div>
      </div>
    </div>
  );
};

export const PlaceGridSkeleton: React.FC<{ count?: number }> = ({ count = 6 }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from({ length: count }).map((_, i) => (
        <PlaceCardSkeleton key={i} />
      ))}
    </div>
  );
};

export const HeroSkeleton: React.FC = () => {
  return (
    <div className="relative h-[60vh] min-h-[400px] bg-gray-100 flex items-center justify-center">
      <div className="max-w-4xl w-full px-4 text-center space-y-6">
        <Skeleton className="h-16 w-3/4 mx-auto" />
        <Skeleton className="h-8 w-1/2 mx-auto" />
        <Skeleton className="h-12 w-64 mx-auto rounded-full" />
      </div>
    </div>
  );
};

export const PageLoader: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-indigo-600 font-bold text-lg tracking-widest uppercase animate-pulse">Loading TravelBharat...</p>
      </div>
    </div>
  );
};
