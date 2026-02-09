-- Create admin user
-- Note: This uses Supabase's internal auth functions available in migrations

DO $$
DECLARE
  new_user_id uuid;
BEGIN
  -- Insert into auth.users (this is allowed in migrations with proper permissions)
  INSERT INTO auth.users (
    instance_id,
    id,
    aud,
    role,
    email,
    encrypted_password,
    email_confirmed_at,
    raw_app_meta_data,
    raw_user_meta_data,
    created_at,
    updated_at,
    confirmation_token,
    email_change,
    email_change_token_new,
    recovery_token
  ) VALUES (
    '00000000-0000-0000-0000-000000000000',
    gen_random_uuid(),
    'authenticated',
    'authenticated',
    'mateus@advogandoparaenfermagem.blog.br',
    crypt('adm123', gen_salt('bf')),
    now(),
    '{"provider":"email","providers":["email"]}',
    '{}',
    now(),
    now(),
    '',
    '',
    '',
    ''
  )
  RETURNING id INTO new_user_id;

  -- Add admin role to user_roles table
  INSERT INTO public.user_roles (user_id, role)
  VALUES (new_user_id, 'admin');

  RAISE NOTICE 'Admin user created successfully with ID: %', new_user_id;
END $$;