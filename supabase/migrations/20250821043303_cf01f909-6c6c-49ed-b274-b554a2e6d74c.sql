-- Fix function search paths for security
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER
SET search_path = public;

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
$$ LANGUAGE plpgsql SECURITY DEFINER
SET search_path = public;

-- Add missing RLS policies for group_trips and group_invites
CREATE POLICY "Users can view group trips for their groups" ON public.group_trips
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.groups g
      LEFT JOIN public.group_members gm ON g.id = gm.group_id
      WHERE g.id = group_id AND (
        g.admin_id = auth.uid() OR 
        gm.user_id = auth.uid()
      )
    )
  );

CREATE POLICY "Group admins can manage group trips" ON public.group_trips
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.groups 
      WHERE id = group_id AND admin_id = auth.uid()
    )
  );

CREATE POLICY "Users can view invites for their groups" ON public.group_invites
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.groups g
      LEFT JOIN public.group_members gm ON g.id = gm.group_id
      WHERE g.id = group_id AND (
        g.admin_id = auth.uid() OR 
        gm.user_id = auth.uid() OR
        invited_email = (SELECT email FROM auth.users WHERE id = auth.uid())
      )
    )
  );

CREATE POLICY "Group admins can manage invites" ON public.group_invites
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.groups 
      WHERE id = group_id AND admin_id = auth.uid()
    )
  );