-- Create enums for various types
CREATE TYPE trip_status AS ENUM ('planning', 'active', 'completed');
CREATE TYPE expense_category AS ENUM ('food', 'transport', 'accommodation', 'activities', 'shopping', 'other');
CREATE TYPE itinerary_type AS ENUM ('accommodation', 'transport', 'activity', 'meal', 'free-time');
CREATE TYPE booking_status AS ENUM ('not-booked', 'booked', 'confirmed');
CREATE TYPE place_type AS ENUM ('restaurant', 'attraction', 'hotel', 'transport', 'shopping', 'entertainment');
CREATE TYPE user_theme AS ENUM ('light', 'dark', 'auto');
CREATE TYPE group_visibility AS ENUM ('public', 'private');
CREATE TYPE invite_status AS ENUM ('pending', 'accepted', 'declined');

-- Create profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  avatar TEXT,
  phone TEXT,
  currency TEXT NOT NULL DEFAULT 'USD',
  language TEXT NOT NULL DEFAULT 'en',
  notifications BOOLEAN NOT NULL DEFAULT true,
  theme user_theme NOT NULL DEFAULT 'auto',
  trips_completed INTEGER NOT NULL DEFAULT 0,
  total_spent DECIMAL(10,2) NOT NULL DEFAULT 0,
  countries_visited INTEGER NOT NULL DEFAULT 0,
  friends_connected INTEGER NOT NULL DEFAULT 0,
  joined_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create trips table
CREATE TABLE public.trips (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  destination TEXT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  status trip_status NOT NULL DEFAULT 'planning',
  budget DECIMAL(10,2) NOT NULL,
  spent DECIMAL(10,2) NOT NULL DEFAULT 0,
  currency TEXT NOT NULL DEFAULT 'USD',
  image TEXT,
  description TEXT,
  tags TEXT[] DEFAULT '{}',
  created_by UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create trip_participants junction table
CREATE TABLE public.trip_participants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  trip_id UUID NOT NULL REFERENCES public.trips(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  joined_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(trip_id, user_id)
);

-- Create groups table
CREATE TABLE public.groups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  avatar TEXT,
  admin_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  visibility group_visibility NOT NULL DEFAULT 'private',
  join_approval BOOLEAN NOT NULL DEFAULT true,
  expense_notifications BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create group_members junction table
CREATE TABLE public.group_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  group_id UUID NOT NULL REFERENCES public.groups(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  joined_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(group_id, user_id)
);

-- Create group_trips junction table
CREATE TABLE public.group_trips (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  group_id UUID NOT NULL REFERENCES public.groups(id) ON DELETE CASCADE,
  trip_id UUID NOT NULL REFERENCES public.trips(id) ON DELETE CASCADE,
  added_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(group_id, trip_id)
);

-- Create group_invites table
CREATE TABLE public.group_invites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  group_id UUID NOT NULL REFERENCES public.groups(id) ON DELETE CASCADE,
  invited_by UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  invited_email TEXT NOT NULL,
  status invite_status NOT NULL DEFAULT 'pending',
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT (now() + interval '7 days'),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create expenses table
CREATE TABLE public.expenses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  trip_id UUID NOT NULL REFERENCES public.trips(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  currency TEXT NOT NULL DEFAULT 'USD',
  category expense_category NOT NULL,
  paid_by UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  description TEXT,
  receipt TEXT,
  location TEXT,
  tags TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create expense_splits table (who owes what for each expense)
CREATE TABLE public.expense_splits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  expense_id UUID NOT NULL REFERENCES public.expenses(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  amount DECIMAL(10,2) NOT NULL,
  settled BOOLEAN NOT NULL DEFAULT false,
  settled_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(expense_id, user_id)
);

-- Create places table
CREATE TABLE public.places (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  type place_type NOT NULL,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  country TEXT NOT NULL,
  coordinates POINT, -- PostgreSQL point type for lat/lng
  rating DECIMAL(2,1) CHECK (rating >= 0 AND rating <= 5),
  price_level INTEGER CHECK (price_level >= 1 AND price_level <= 5),
  photos TEXT[] DEFAULT '{}',
  description TEXT,
  tags TEXT[] DEFAULT '{}',
  opening_hours JSONB, -- Store as JSON object
  contact JSONB, -- Store phone, website, email as JSON
  amenities TEXT[] DEFAULT '{}',
  average_cost DECIMAL(10,2),
  currency TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create itinerary_items table
CREATE TABLE public.itinerary_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  trip_id UUID NOT NULL REFERENCES public.trips(id) ON DELETE CASCADE,
  day INTEGER NOT NULL,
  time TIME NOT NULL,
  title TEXT NOT NULL,
  type itinerary_type NOT NULL,
  location_name TEXT NOT NULL,
  location_address TEXT NOT NULL,
  coordinates POINT,
  duration INTEGER NOT NULL, -- in minutes
  cost DECIMAL(10,2),
  currency TEXT,
  description TEXT,
  notes TEXT,
  booking_status booking_status NOT NULL DEFAULT 'not-booked',
  booking_url TEXT,
  tags TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.trips ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.trip_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.group_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.group_trips ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.group_invites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.expenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.expense_splits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.places ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.itinerary_items ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- RLS Policies for trips
CREATE POLICY "Users can view trips they participate in" ON public.trips
  FOR SELECT USING (
    auth.uid() = created_by OR 
    EXISTS (
      SELECT 1 FROM public.trip_participants 
      WHERE trip_id = id AND user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create trips" ON public.trips
  FOR INSERT WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Trip creators and participants can update trips" ON public.trips
  FOR UPDATE USING (
    auth.uid() = created_by OR 
    EXISTS (
      SELECT 1 FROM public.trip_participants 
      WHERE trip_id = id AND user_id = auth.uid()
    )
  );

CREATE POLICY "Trip creators can delete trips" ON public.trips
  FOR DELETE USING (auth.uid() = created_by);

-- RLS Policies for trip_participants
CREATE POLICY "Users can view participants of their trips" ON public.trip_participants
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.trips 
      WHERE id = trip_id AND (
        created_by = auth.uid() OR 
        EXISTS (
          SELECT 1 FROM public.trip_participants tp2 
          WHERE tp2.trip_id = id AND tp2.user_id = auth.uid()
        )
      )
    )
  );

CREATE POLICY "Trip creators can manage participants" ON public.trip_participants
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.trips 
      WHERE id = trip_id AND created_by = auth.uid()
    )
  );

-- RLS Policies for groups
CREATE POLICY "Users can view groups they belong to" ON public.groups
  FOR SELECT USING (
    auth.uid() = admin_id OR 
    EXISTS (
      SELECT 1 FROM public.group_members 
      WHERE group_id = id AND user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create groups" ON public.groups
  FOR INSERT WITH CHECK (auth.uid() = admin_id);

CREATE POLICY "Group admins can update groups" ON public.groups
  FOR UPDATE USING (auth.uid() = admin_id);

CREATE POLICY "Group admins can delete groups" ON public.groups
  FOR DELETE USING (auth.uid() = admin_id);

-- RLS Policies for group_members
CREATE POLICY "Users can view members of their groups" ON public.group_members
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.groups 
      WHERE id = group_id AND (
        admin_id = auth.uid() OR 
        EXISTS (
          SELECT 1 FROM public.group_members gm2 
          WHERE gm2.group_id = id AND gm2.user_id = auth.uid()
        )
      )
    )
  );

CREATE POLICY "Group admins can manage members" ON public.group_members
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.groups 
      WHERE id = group_id AND admin_id = auth.uid()
    )
  );

-- RLS Policies for expenses
CREATE POLICY "Users can view expenses from their trips" ON public.expenses
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.trips t
      LEFT JOIN public.trip_participants tp ON t.id = tp.trip_id
      WHERE t.id = trip_id AND (
        t.created_by = auth.uid() OR 
        tp.user_id = auth.uid()
      )
    )
  );

CREATE POLICY "Trip participants can create expenses" ON public.expenses
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.trips t
      LEFT JOIN public.trip_participants tp ON t.id = tp.trip_id
      WHERE t.id = trip_id AND (
        t.created_by = auth.uid() OR 
        tp.user_id = auth.uid()
      )
    )
  );

CREATE POLICY "Expense creators can update their expenses" ON public.expenses
  FOR UPDATE USING (auth.uid() = paid_by);

CREATE POLICY "Expense creators can delete their expenses" ON public.expenses
  FOR DELETE USING (auth.uid() = paid_by);

-- RLS Policies for expense_splits
CREATE POLICY "Users can view expense splits for their expenses" ON public.expense_splits
  FOR SELECT USING (
    auth.uid() = user_id OR 
    EXISTS (
      SELECT 1 FROM public.expenses 
      WHERE id = expense_id AND paid_by = auth.uid()
    )
  );

CREATE POLICY "Expense creators can manage splits" ON public.expense_splits
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.expenses 
      WHERE id = expense_id AND paid_by = auth.uid()
    )
  );

-- RLS Policies for places (public read access)
CREATE POLICY "Anyone can view places" ON public.places
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Authenticated users can create places" ON public.places
  FOR INSERT TO authenticated WITH CHECK (true);

-- RLS Policies for itinerary_items
CREATE POLICY "Users can view itinerary items for their trips" ON public.itinerary_items
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.trips t
      LEFT JOIN public.trip_participants tp ON t.id = tp.trip_id
      WHERE t.id = trip_id AND (
        t.created_by = auth.uid() OR 
        tp.user_id = auth.uid()
      )
    )
  );

CREATE POLICY "Trip participants can manage itinerary items" ON public.itinerary_items
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.trips t
      LEFT JOIN public.trip_participants tp ON t.id = tp.trip_id
      WHERE t.id = trip_id AND (
        t.created_by = auth.uid() OR 
        tp.user_id = auth.uid()
      )
    )
  );

-- Create function to update updated_at timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_trips_updated_at BEFORE UPDATE ON public.trips
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_groups_updated_at BEFORE UPDATE ON public.groups
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_group_invites_updated_at BEFORE UPDATE ON public.group_invites
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_expenses_updated_at BEFORE UPDATE ON public.expenses
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_places_updated_at BEFORE UPDATE ON public.places
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_itinerary_items_updated_at BEFORE UPDATE ON public.itinerary_items
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to handle new user profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, name, email)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'name', NEW.email),
    NEW.email
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user profile creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create indexes for better performance
CREATE INDEX idx_trips_created_by ON public.trips(created_by);
CREATE INDEX idx_trips_status ON public.trips(status);
CREATE INDEX idx_trip_participants_trip_id ON public.trip_participants(trip_id);
CREATE INDEX idx_trip_participants_user_id ON public.trip_participants(user_id);
CREATE INDEX idx_expenses_trip_id ON public.expenses(trip_id);
CREATE INDEX idx_expenses_paid_by ON public.expenses(paid_by);
CREATE INDEX idx_expense_splits_expense_id ON public.expense_splits(expense_id);
CREATE INDEX idx_expense_splits_user_id ON public.expense_splits(user_id);
CREATE INDEX idx_groups_admin_id ON public.groups(admin_id);
CREATE INDEX idx_group_members_group_id ON public.group_members(group_id);
CREATE INDEX idx_group_members_user_id ON public.group_members(user_id);
CREATE INDEX idx_itinerary_items_trip_id ON public.itinerary_items(trip_id);
CREATE INDEX idx_places_coordinates ON public.places USING GIST(coordinates);
CREATE INDEX idx_places_city ON public.places(city);
CREATE INDEX idx_places_type ON public.places(type);