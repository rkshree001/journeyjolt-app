import { useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { getCurrentUserProfile, UserProfile } from '@/lib/database/profiles';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isGuest, setIsGuest] = useState(false);

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        // Fetch user profile when authenticated
        if (session?.user) {
          setTimeout(async () => {
            try {
              const profileData = await getCurrentUserProfile();
              setProfile(profileData);
            } catch (error) {
              console.error('Error fetching user profile:', error);
            }
          }, 0);
        } else {
          setProfile(null);
          setIsGuest(false);
        }
        
        setLoading(false);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        getCurrentUserProfile().then(setProfile).catch(console.error);
      }
      
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { error };
  };

  const signUp = async (email: string, password: string, name?: string) => {
    const redirectUrl = `${window.location.origin}/`;
    
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: {
          name: name || email
        }
      }
    });
    return { error };
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      setUser(null);
      setSession(null);
      setProfile(null);
    }
    return { error };
  };

  const resetPassword = async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    return { error };
  };

  const signInAsGuest = () => {
    setIsGuest(true);
    setProfile({
      id: 'guest',
      name: 'Guest User',
      email: 'guest@example.com',
      avatar: null,
      phone: null,
      currency: 'USD',
      language: 'en',
      theme: 'auto',
      notifications: true,
      joined_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      trips_completed: 0,
      total_spent: 0,
      countries_visited: 0,
      friends_connected: 0
    });
    setLoading(false);
  };

  const signOutGuest = () => {
    setIsGuest(false);
    setProfile(null);
  };

  return {
    user,
    session,
    profile,
    loading,
    isGuest,
    signIn,
    signUp,
    signOut,
    resetPassword,
    signInAsGuest,
    signOutGuest,
    isAuthenticated: !!user || isGuest,
  };
};