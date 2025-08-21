import { supabase } from "@/integrations/supabase/client";

export interface Group {
  id: string;
  name: string;
  description?: string;
  avatar?: string;
  admin_id: string;
  visibility: 'public' | 'private';
  join_approval: boolean;
  expense_notifications: boolean;
  created_at: string;
  updated_at: string;
  members?: string[];
  trip_ids?: string[];
  stats?: {
    totalTrips: number;
    totalSpent: number;
    activeMembers: number;
  };
}

export interface GroupInvite {
  id: string;
  group_id: string;
  invited_by: string;
  invited_email: string;
  status: 'pending' | 'accepted' | 'declined';
  expires_at: string;
  created_at: string;
  updated_at: string;
}

export const createGroup = async (groupData: Omit<Group, 'id' | 'created_at' | 'updated_at' | 'admin_id'>) => {
  const user = await supabase.auth.getUser();
  const userId = user.data.user?.id;
  
  if (!userId) throw new Error('User not authenticated');

  const { data: group, error: groupError } = await supabase
    .from('groups')
    .insert([{
      ...groupData,
      admin_id: userId
    }])
    .select()
    .single();

  if (groupError) throw groupError;

  // Add creator as member
  const { error: memberError } = await supabase
    .from('group_members')
    .insert([{
      group_id: group.id,
      user_id: userId
    }]);

  if (memberError) throw memberError;

  return group;
};

export const getUserGroups = async () => {
  const { data, error } = await supabase
    .from('groups')
    .select(`
      *,
      group_members!inner(user_id),
      group_trips(trip_id)
    `)
    .order('created_at', { ascending: false });

  if (error) throw error;

  return data?.map(group => ({
    ...group,
    members: group.group_members?.map((m: any) => m.user_id) || [],
    trip_ids: group.group_trips?.map((t: any) => t.trip_id) || [],
    stats: {
      totalTrips: group.group_trips?.length || 0,
      totalSpent: 0, // Would need to calculate from expenses
      activeMembers: group.group_members?.length || 0
    }
  })) || [];
};

export const getGroupById = async (groupId: string) => {
  const { data, error } = await supabase
    .from('groups')
    .select(`
      *,
      group_members(user_id),
      group_trips(trip_id),
      profiles!admin_id(name, email, avatar)
    `)
    .eq('id', groupId)
    .single();

  if (error) throw error;

  return {
    ...data,
    members: data.group_members?.map((m: any) => m.user_id) || [],
    trip_ids: data.group_trips?.map((t: any) => t.trip_id) || []
  };
};

export const updateGroup = async (groupId: string, updates: Partial<Group>) => {
  const { data, error } = await supabase
    .from('groups')
    .update(updates)
    .eq('id', groupId)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const deleteGroup = async (groupId: string) => {
  const { error } = await supabase
    .from('groups')
    .delete()
    .eq('id', groupId);

  if (error) throw error;
};

export const addGroupMember = async (groupId: string, userId: string) => {
  const { data, error } = await supabase
    .from('group_members')
    .insert([{
      group_id: groupId,
      user_id: userId
    }])
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const removeGroupMember = async (groupId: string, userId: string) => {
  const { error } = await supabase
    .from('group_members')
    .delete()
    .eq('group_id', groupId)
    .eq('user_id', userId);

  if (error) throw error;
};

export const addTripToGroup = async (groupId: string, tripId: string) => {
  const { data, error } = await supabase
    .from('group_trips')
    .insert([{
      group_id: groupId,
      trip_id: tripId
    }])
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const removeTripFromGroup = async (groupId: string, tripId: string) => {
  const { error } = await supabase
    .from('group_trips')
    .delete()
    .eq('group_id', groupId)
    .eq('trip_id', tripId);

  if (error) throw error;
};

export const inviteToGroup = async (groupId: string, email: string) => {
  const user = await supabase.auth.getUser();
  const userId = user.data.user?.id;
  
  if (!userId) throw new Error('User not authenticated');

  const { data, error } = await supabase
    .from('group_invites')
    .insert([{
      group_id: groupId,
      invited_by: userId,
      invited_email: email
    }])
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const getGroupInvites = async () => {
  const user = await supabase.auth.getUser();
  const userEmail = user.data.user?.email;
  
  if (!userEmail) return [];

  const { data, error } = await supabase
    .from('group_invites')
    .select(`
      *,
      groups(name, description)
    `)
    .eq('invited_email', userEmail)
    .eq('status', 'pending');

  if (error) throw error;
  return data || [];
};

export const respondToGroupInvite = async (inviteId: string, status: 'accepted' | 'declined') => {
  const { data: invite, error: inviteError } = await supabase
    .from('group_invites')
    .update({ status })
    .eq('id', inviteId)
    .select()
    .single();

  if (inviteError) throw inviteError;

  // If accepted, add user to group
  if (status === 'accepted') {
    const user = await supabase.auth.getUser();
    const userId = user.data.user?.id;
    
    if (userId) {
      await addGroupMember(invite.group_id, userId);
    }
  }

  return invite;
};