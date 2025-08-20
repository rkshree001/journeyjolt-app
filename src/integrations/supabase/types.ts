export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      expense_splits: {
        Row: {
          amount: number
          created_at: string
          expense_id: string
          id: string
          settled: boolean
          settled_at: string | null
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string
          expense_id: string
          id?: string
          settled?: boolean
          settled_at?: string | null
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string
          expense_id?: string
          id?: string
          settled?: boolean
          settled_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "expense_splits_expense_id_fkey"
            columns: ["expense_id"]
            isOneToOne: false
            referencedRelation: "expenses"
            referencedColumns: ["id"]
          },
        ]
      }
      expenses: {
        Row: {
          amount: number
          category: Database["public"]["Enums"]["expense_category"]
          created_at: string
          currency: string
          date: string
          description: string | null
          id: string
          location: string | null
          paid_by: string
          receipt: string | null
          tags: string[] | null
          title: string
          trip_id: string
          updated_at: string
        }
        Insert: {
          amount: number
          category: Database["public"]["Enums"]["expense_category"]
          created_at?: string
          currency?: string
          date: string
          description?: string | null
          id?: string
          location?: string | null
          paid_by: string
          receipt?: string | null
          tags?: string[] | null
          title: string
          trip_id: string
          updated_at?: string
        }
        Update: {
          amount?: number
          category?: Database["public"]["Enums"]["expense_category"]
          created_at?: string
          currency?: string
          date?: string
          description?: string | null
          id?: string
          location?: string | null
          paid_by?: string
          receipt?: string | null
          tags?: string[] | null
          title?: string
          trip_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "expenses_trip_id_fkey"
            columns: ["trip_id"]
            isOneToOne: false
            referencedRelation: "trips"
            referencedColumns: ["id"]
          },
        ]
      }
      group_invites: {
        Row: {
          created_at: string
          expires_at: string
          group_id: string
          id: string
          invited_by: string
          invited_email: string
          status: Database["public"]["Enums"]["invite_status"]
          updated_at: string
        }
        Insert: {
          created_at?: string
          expires_at?: string
          group_id: string
          id?: string
          invited_by: string
          invited_email: string
          status?: Database["public"]["Enums"]["invite_status"]
          updated_at?: string
        }
        Update: {
          created_at?: string
          expires_at?: string
          group_id?: string
          id?: string
          invited_by?: string
          invited_email?: string
          status?: Database["public"]["Enums"]["invite_status"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "group_invites_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "groups"
            referencedColumns: ["id"]
          },
        ]
      }
      group_members: {
        Row: {
          group_id: string
          id: string
          joined_at: string
          user_id: string
        }
        Insert: {
          group_id: string
          id?: string
          joined_at?: string
          user_id: string
        }
        Update: {
          group_id?: string
          id?: string
          joined_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "group_members_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "groups"
            referencedColumns: ["id"]
          },
        ]
      }
      group_trips: {
        Row: {
          added_at: string
          group_id: string
          id: string
          trip_id: string
        }
        Insert: {
          added_at?: string
          group_id: string
          id?: string
          trip_id: string
        }
        Update: {
          added_at?: string
          group_id?: string
          id?: string
          trip_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "group_trips_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "groups"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "group_trips_trip_id_fkey"
            columns: ["trip_id"]
            isOneToOne: false
            referencedRelation: "trips"
            referencedColumns: ["id"]
          },
        ]
      }
      groups: {
        Row: {
          admin_id: string
          avatar: string | null
          created_at: string
          description: string | null
          expense_notifications: boolean
          id: string
          join_approval: boolean
          name: string
          updated_at: string
          visibility: Database["public"]["Enums"]["group_visibility"]
        }
        Insert: {
          admin_id: string
          avatar?: string | null
          created_at?: string
          description?: string | null
          expense_notifications?: boolean
          id?: string
          join_approval?: boolean
          name: string
          updated_at?: string
          visibility?: Database["public"]["Enums"]["group_visibility"]
        }
        Update: {
          admin_id?: string
          avatar?: string | null
          created_at?: string
          description?: string | null
          expense_notifications?: boolean
          id?: string
          join_approval?: boolean
          name?: string
          updated_at?: string
          visibility?: Database["public"]["Enums"]["group_visibility"]
        }
        Relationships: []
      }
      itinerary_items: {
        Row: {
          booking_status: Database["public"]["Enums"]["booking_status"]
          booking_url: string | null
          coordinates: unknown | null
          cost: number | null
          created_at: string
          currency: string | null
          day: number
          description: string | null
          duration: number
          id: string
          location_address: string
          location_name: string
          notes: string | null
          tags: string[] | null
          time: string
          title: string
          trip_id: string
          type: Database["public"]["Enums"]["itinerary_type"]
          updated_at: string
        }
        Insert: {
          booking_status?: Database["public"]["Enums"]["booking_status"]
          booking_url?: string | null
          coordinates?: unknown | null
          cost?: number | null
          created_at?: string
          currency?: string | null
          day: number
          description?: string | null
          duration: number
          id?: string
          location_address: string
          location_name: string
          notes?: string | null
          tags?: string[] | null
          time: string
          title: string
          trip_id: string
          type: Database["public"]["Enums"]["itinerary_type"]
          updated_at?: string
        }
        Update: {
          booking_status?: Database["public"]["Enums"]["booking_status"]
          booking_url?: string | null
          coordinates?: unknown | null
          cost?: number | null
          created_at?: string
          currency?: string | null
          day?: number
          description?: string | null
          duration?: number
          id?: string
          location_address?: string
          location_name?: string
          notes?: string | null
          tags?: string[] | null
          time?: string
          title?: string
          trip_id?: string
          type?: Database["public"]["Enums"]["itinerary_type"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "itinerary_items_trip_id_fkey"
            columns: ["trip_id"]
            isOneToOne: false
            referencedRelation: "trips"
            referencedColumns: ["id"]
          },
        ]
      }
      places: {
        Row: {
          address: string
          amenities: string[] | null
          average_cost: number | null
          city: string
          contact: Json | null
          coordinates: unknown | null
          country: string
          created_at: string
          currency: string | null
          description: string | null
          id: string
          name: string
          opening_hours: Json | null
          photos: string[] | null
          price_level: number | null
          rating: number | null
          tags: string[] | null
          type: Database["public"]["Enums"]["place_type"]
          updated_at: string
        }
        Insert: {
          address: string
          amenities?: string[] | null
          average_cost?: number | null
          city: string
          contact?: Json | null
          coordinates?: unknown | null
          country: string
          created_at?: string
          currency?: string | null
          description?: string | null
          id?: string
          name: string
          opening_hours?: Json | null
          photos?: string[] | null
          price_level?: number | null
          rating?: number | null
          tags?: string[] | null
          type: Database["public"]["Enums"]["place_type"]
          updated_at?: string
        }
        Update: {
          address?: string
          amenities?: string[] | null
          average_cost?: number | null
          city?: string
          contact?: Json | null
          coordinates?: unknown | null
          country?: string
          created_at?: string
          currency?: string | null
          description?: string | null
          id?: string
          name?: string
          opening_hours?: Json | null
          photos?: string[] | null
          price_level?: number | null
          rating?: number | null
          tags?: string[] | null
          type?: Database["public"]["Enums"]["place_type"]
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar: string | null
          countries_visited: number
          currency: string
          email: string
          friends_connected: number
          id: string
          joined_at: string
          language: string
          name: string
          notifications: boolean
          phone: string | null
          theme: Database["public"]["Enums"]["user_theme"]
          total_spent: number
          trips_completed: number
          updated_at: string
        }
        Insert: {
          avatar?: string | null
          countries_visited?: number
          currency?: string
          email: string
          friends_connected?: number
          id: string
          joined_at?: string
          language?: string
          name: string
          notifications?: boolean
          phone?: string | null
          theme?: Database["public"]["Enums"]["user_theme"]
          total_spent?: number
          trips_completed?: number
          updated_at?: string
        }
        Update: {
          avatar?: string | null
          countries_visited?: number
          currency?: string
          email?: string
          friends_connected?: number
          id?: string
          joined_at?: string
          language?: string
          name?: string
          notifications?: boolean
          phone?: string | null
          theme?: Database["public"]["Enums"]["user_theme"]
          total_spent?: number
          trips_completed?: number
          updated_at?: string
        }
        Relationships: []
      }
      trip_participants: {
        Row: {
          id: string
          joined_at: string
          trip_id: string
          user_id: string
        }
        Insert: {
          id?: string
          joined_at?: string
          trip_id: string
          user_id: string
        }
        Update: {
          id?: string
          joined_at?: string
          trip_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "trip_participants_trip_id_fkey"
            columns: ["trip_id"]
            isOneToOne: false
            referencedRelation: "trips"
            referencedColumns: ["id"]
          },
        ]
      }
      trips: {
        Row: {
          budget: number
          created_at: string
          created_by: string
          currency: string
          description: string | null
          destination: string
          end_date: string
          id: string
          image: string | null
          spent: number
          start_date: string
          status: Database["public"]["Enums"]["trip_status"]
          tags: string[] | null
          title: string
          updated_at: string
        }
        Insert: {
          budget: number
          created_at?: string
          created_by: string
          currency?: string
          description?: string | null
          destination: string
          end_date: string
          id?: string
          image?: string | null
          spent?: number
          start_date: string
          status?: Database["public"]["Enums"]["trip_status"]
          tags?: string[] | null
          title: string
          updated_at?: string
        }
        Update: {
          budget?: number
          created_at?: string
          created_by?: string
          currency?: string
          description?: string | null
          destination?: string
          end_date?: string
          id?: string
          image?: string | null
          spent?: number
          start_date?: string
          status?: Database["public"]["Enums"]["trip_status"]
          tags?: string[] | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      booking_status: "not-booked" | "booked" | "confirmed"
      expense_category:
        | "food"
        | "transport"
        | "accommodation"
        | "activities"
        | "shopping"
        | "other"
      group_visibility: "public" | "private"
      invite_status: "pending" | "accepted" | "declined"
      itinerary_type:
        | "accommodation"
        | "transport"
        | "activity"
        | "meal"
        | "free-time"
      place_type:
        | "restaurant"
        | "attraction"
        | "hotel"
        | "transport"
        | "shopping"
        | "entertainment"
      trip_status: "planning" | "active" | "completed"
      user_theme: "light" | "dark" | "auto"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      booking_status: ["not-booked", "booked", "confirmed"],
      expense_category: [
        "food",
        "transport",
        "accommodation",
        "activities",
        "shopping",
        "other",
      ],
      group_visibility: ["public", "private"],
      invite_status: ["pending", "accepted", "declined"],
      itinerary_type: [
        "accommodation",
        "transport",
        "activity",
        "meal",
        "free-time",
      ],
      place_type: [
        "restaurant",
        "attraction",
        "hotel",
        "transport",
        "shopping",
        "entertainment",
      ],
      trip_status: ["planning", "active", "completed"],
      user_theme: ["light", "dark", "auto"],
    },
  },
} as const
