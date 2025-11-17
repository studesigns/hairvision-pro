-- HairVision Pro Database Schema
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Stylists table (salon professionals)
CREATE TABLE IF NOT EXISTS stylists (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  salon_name TEXT,
  email TEXT NOT NULL UNIQUE,
  specialties TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Clients table
CREATE TABLE IF NOT EXISTS clients (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  stylist_id UUID REFERENCES stylists(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Consultations table (main data)
CREATE TABLE IF NOT EXISTS consultations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID REFERENCES clients(id) ON DELETE SET NULL,
  stylist_id UUID REFERENCES stylists(id) ON DELETE SET NULL,

  -- Client's current state
  client_photo_url TEXT,
  current_hair_level INTEGER CHECK (current_hair_level BETWEEN 1 AND 10),

  -- Desired outcome
  style_description TEXT NOT NULL,
  selected_color_id TEXT,
  selected_color_name TEXT,
  selected_color_hex TEXT,
  target_hair_level INTEGER CHECK (target_hair_level BETWEEN 1 AND 10),
  target_tone TEXT CHECK (target_tone IN ('warm', 'cool', 'neutral')),

  -- Formula details
  brand TEXT NOT NULL DEFAULT 'wella',
  formula_base_color TEXT,
  formula_developer_volume INTEGER CHECK (formula_developer_volume IN (10, 20, 30, 40)),
  formula_developer_ratio TEXT,
  formula_processing_time INTEGER,
  formula_additives JSONB DEFAULT '[]',
  formula_notes TEXT,

  -- AI-generated content
  generated_preview_url TEXT,
  ai_recommendations JSONB,

  -- Status tracking
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'in_progress', 'completed', 'archived')),
  notes TEXT,

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Saved formulas (reusable formulas)
CREATE TABLE IF NOT EXISTS saved_formulas (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  stylist_id UUID REFERENCES stylists(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  brand TEXT NOT NULL,
  base_color TEXT NOT NULL,
  developer_volume INTEGER NOT NULL,
  developer_ratio TEXT NOT NULL,
  processing_time INTEGER NOT NULL,
  additives JSONB DEFAULT '[]',
  notes TEXT,
  tags TEXT[] DEFAULT '{}',
  usage_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Consultation images storage (for before/after photos)
CREATE TABLE IF NOT EXISTS consultation_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  consultation_id UUID REFERENCES consultations(id) ON DELETE CASCADE,
  image_type TEXT CHECK (image_type IN ('before', 'after', 'preview', 'reference')),
  storage_path TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_consultations_client ON consultations(client_id);
CREATE INDEX IF NOT EXISTS idx_consultations_stylist ON consultations(stylist_id);
CREATE INDEX IF NOT EXISTS idx_consultations_status ON consultations(status);
CREATE INDEX IF NOT EXISTS idx_consultations_created ON consultations(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_clients_stylist ON clients(stylist_id);
CREATE INDEX IF NOT EXISTS idx_saved_formulas_stylist ON saved_formulas(stylist_id);

-- Row Level Security (RLS) Policies
ALTER TABLE stylists ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE consultations ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_formulas ENABLE ROW LEVEL SECURITY;
ALTER TABLE consultation_images ENABLE ROW LEVEL SECURITY;

-- Stylists can only see their own data
CREATE POLICY "Stylists can view own profile"
  ON stylists FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Stylists can update own profile"
  ON stylists FOR UPDATE
  USING (auth.uid() = user_id);

-- Clients belong to stylist
CREATE POLICY "Stylists can view own clients"
  ON clients FOR SELECT
  USING (stylist_id IN (SELECT id FROM stylists WHERE user_id = auth.uid()));

CREATE POLICY "Stylists can insert clients"
  ON clients FOR INSERT
  WITH CHECK (stylist_id IN (SELECT id FROM stylists WHERE user_id = auth.uid()));

CREATE POLICY "Stylists can update own clients"
  ON clients FOR UPDATE
  USING (stylist_id IN (SELECT id FROM stylists WHERE user_id = auth.uid()));

-- Consultations belong to stylist
CREATE POLICY "Stylists can view own consultations"
  ON consultations FOR SELECT
  USING (stylist_id IN (SELECT id FROM stylists WHERE user_id = auth.uid()));

CREATE POLICY "Stylists can insert consultations"
  ON consultations FOR INSERT
  WITH CHECK (stylist_id IN (SELECT id FROM stylists WHERE user_id = auth.uid()));

CREATE POLICY "Stylists can update own consultations"
  ON consultations FOR UPDATE
  USING (stylist_id IN (SELECT id FROM stylists WHERE user_id = auth.uid()));

-- Saved formulas belong to stylist
CREATE POLICY "Stylists can view own formulas"
  ON saved_formulas FOR SELECT
  USING (stylist_id IN (SELECT id FROM stylists WHERE user_id = auth.uid()));

CREATE POLICY "Stylists can manage own formulas"
  ON saved_formulas FOR ALL
  USING (stylist_id IN (SELECT id FROM stylists WHERE user_id = auth.uid()));

-- Function to update timestamps
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_clients_updated_at
  BEFORE UPDATE ON clients
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_consultations_updated_at
  BEFORE UPDATE ON consultations
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- Storage bucket for consultation images
-- Run this in Supabase Dashboard > Storage
-- INSERT INTO storage.buckets (id, name, public) VALUES ('consultation-images', 'consultation-images', true);
