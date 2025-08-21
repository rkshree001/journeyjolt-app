import { supabase } from "@/integrations/supabase/client";

export interface Trip {
  id: string;
  title: string;
  destination: string;
  start_date: string;
  end_date: string;
  status: 'planning' | 'active' | 'completed';
  budget: number;
  spent: number;
  currency: string;
  image?: string;
  description?: string;
  tags: string[];
  created_by: string;
  created_at: string;
  updated_at: string;
  participants?: string[];
}

export const createTrip = async (tripData: Omit<Trip, 'id' | 'created_at' | 'updated_at' | 'created_by' | 'spent'>) => {
  const { data, error } = await supabase
    .from('trips')
    .insert([{
      ...tripData,
      start_date: tripData.start_date,
      end_date: tripData.end_date,
      created_by: (await supabase.auth.getUser()).data.user?.id
    }])
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const getUserTrips = async () => {
  const { data, error } = await supabase
    .from('trips')
    .select(`
      *,
      trip_participants!inner(user_id)
    `)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data?.map(trip => ({
    ...trip,
    startDate: trip.start_date,
    endDate: trip.end_date,
    participants: trip.trip_participants?.map((p: any) => p.user_id) || []
  })) || [];
};

export const getTripById = async (tripId: string) => {
  const { data, error } = await supabase
    .from('trips')
    .select(`
      *,
      trip_participants(user_id),
      profiles!created_by(name, email, avatar)
    `)
    .eq('id', tripId)
    .single();

  if (error) throw error;
  return {
    ...data,
    startDate: data.start_date,
    endDate: data.end_date,
    participants: data.trip_participants?.map((p: any) => p.user_id) || []
  };
};

export const updateTrip = async (tripId: string, updates: Partial<Trip>) => {
  const { data, error } = await supabase
    .from('trips')
    .update(updates)
    .eq('id', tripId)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const deleteTrip = async (tripId: string) => {
  const { error } = await supabase
    .from('trips')
    .delete()
    .eq('id', tripId);

  if (error) throw error;
};

export const addTripParticipant = async (tripId: string, userId: string) => {
  const { data, error } = await supabase
    .from('trip_participants')
    .insert([{ trip_id: tripId, user_id: userId }])
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const removeTripParticipant = async (tripId: string, userId: string) => {
  const { error } = await supabase
    .from('trip_participants')
    .delete()
    .eq('trip_id', tripId)
    .eq('user_id', userId);

  if (error) throw error;
};

export const getCurrentTrip = async () => {
  const trips = await getUserTrips();
  return trips.find(trip => trip.status === 'active');
};

export const getPlanningTrips = async () => {
  const trips = await getUserTrips();
  return trips.filter(trip => trip.status === 'planning');
};

export const getCompletedTrips = async () => {
  const trips = await getUserTrips();
  return trips.filter(trip => trip.status === 'completed');
};