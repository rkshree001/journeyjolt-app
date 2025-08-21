import { supabase } from "@/integrations/supabase/client";

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  phone?: string;
  currency: string;
  language: string;
  notifications: boolean;
  theme: 'light' | 'dark' | 'auto';
  trips_completed: number;
  total_spent: number;
  countries_visited: number;
  friends_connected: number;
  joined_at: string;
  updated_at: string;
}

export const getCurrentUserProfile = async () => {
  const user = await supabase.auth.getUser();
  const userId = user.data.user?.id;
  
  if (!userId) return null;

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) throw error;
  return data;
};

export const updateUserProfile = async (updates: Partial<UserProfile>) => {
  const user = await supabase.auth.getUser();
  const userId = user.data.user?.id;
  
  if (!userId) throw new Error('User not authenticated');

  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', userId)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const getUserProfileById = async (userId: string) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('id, name, email, avatar')
    .eq('id', userId)
    .single();

  if (error) throw error;
  return data;
};

export const getUserProfilesByIds = async (userIds: string[]) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('id, name, email, avatar')
    .in('id', userIds);

  if (error) throw error;
  return data || [];
};

export const searchUsersByEmail = async (email: string, limit = 10) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('id, name, email, avatar')
    .ilike('email', `%${email}%`)
    .limit(limit);

  if (error) throw error;
  return data || [];
};