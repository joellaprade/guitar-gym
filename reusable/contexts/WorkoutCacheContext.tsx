'use client';

import { Workout } from '@/reusable/models/Workout';
import { createContext, useContext, useEffect, useRef, useState } from 'react';

type WorkoutCacheContextType = {
  workouts: Workout[] | null;
  isLoading: boolean;
  invalidate: () => void;
};

const WorkoutCacheContext = createContext<WorkoutCacheContextType | undefined>(undefined);

export const useWorkoutCache = () => {
  const context = useContext(WorkoutCacheContext);
  if (!context) throw new Error('useWorkoutCache must be used within a WorkoutCacheProvider');
  return context;
};

export const WorkoutCacheProvider = ({ children }: { children: React.ReactNode }) => {
  const [workouts, setWorkouts] = useState<Workout[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const hasFetched = useRef(false);

  const fetchWorkouts = async () => {
    try {
      setIsLoading(true);
      const res = await fetch('/api/workouts');
      if (!res.ok) throw new Error('Failed to fetch workouts');
      const data = await res.json();
      setWorkouts(data);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  // Prefetch workouts once after initial mount (client-side only)
  useEffect(() => {
    if (!hasFetched.current) {
      hasFetched.current = true;
      fetchWorkouts();
    }
  }, []);

  // Allow manual cache invalidation (e.g. after editing workouts)
  const invalidate = () => {
    hasFetched.current = false;
    fetchWorkouts();
  };

  return (
    <WorkoutCacheContext.Provider value={{ workouts, isLoading, invalidate }}>
      {children}
    </WorkoutCacheContext.Provider>
  );
};
