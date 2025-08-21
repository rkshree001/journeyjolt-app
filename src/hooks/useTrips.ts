import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getUserTrips, createTrip, updateTrip, deleteTrip, getCurrentTrip, getPlanningTrips, getCompletedTrips, Trip } from '@/lib/database/trips';
import { toast } from '@/hooks/use-toast';

export const useTrips = () => {
  const { data: trips = [], isLoading, error } = useQuery({
    queryKey: ['trips'],
    queryFn: getUserTrips,
  });

  return {
    trips,
    isLoading,
    error,
    currentTrip: trips.find(trip => trip.status === 'active'),
    planningTrips: trips.filter(trip => trip.status === 'planning'),
    completedTrips: trips.filter(trip => trip.status === 'completed'),
  };
};

export const useCreateTrip = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: createTrip,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['trips'] });
      toast({
        title: "Trip created!",
        description: "Your new trip has been created successfully.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to create trip",
        variant: "destructive",
      });
    },
  });
};

export const useUpdateTrip = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ tripId, updates }: { tripId: string; updates: Partial<Trip> }) => 
      updateTrip(tripId, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['trips'] });
      toast({
        title: "Trip updated!",
        description: "Your trip has been updated successfully.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update trip",
        variant: "destructive",
      });
    },
  });
};

export const useDeleteTrip = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: deleteTrip,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['trips'] });
      toast({
        title: "Trip deleted!",
        description: "Your trip has been deleted successfully.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to delete trip",
        variant: "destructive",
      });
    },
  });
};