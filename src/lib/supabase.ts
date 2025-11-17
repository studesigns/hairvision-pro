import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for database tables
export interface Database {
  public: {
    Tables: {
      clients: {
        Row: {
          id: string
          name: string
          email: string | null
          phone: string | null
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['clients']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['clients']['Insert']>
      }
      consultations: {
        Row: {
          id: string
          client_id: string | null
          stylist_id: string | null
          client_photo_url: string | null
          style_description: string
          selected_color_id: string | null
          selected_color_name: string | null
          selected_color_hex: string | null
          current_hair_level: number
          target_hair_level: number
          target_tone: string
          brand: string
          formula_base_color: string | null
          formula_developer_volume: number | null
          formula_developer_ratio: string | null
          formula_processing_time: number | null
          formula_additives: object | null
          formula_notes: string | null
          generated_preview_url: string | null
          ai_recommendations: object | null
          status: 'draft' | 'in_progress' | 'completed' | 'archived'
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['consultations']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['consultations']['Insert']>
      }
      stylists: {
        Row: {
          id: string
          user_id: string
          name: string
          salon_name: string | null
          email: string
          specialties: string[] | null
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['stylists']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['stylists']['Insert']>
      }
      saved_formulas: {
        Row: {
          id: string
          stylist_id: string
          name: string
          brand: string
          base_color: string
          developer_volume: number
          developer_ratio: string
          processing_time: number
          additives: object | null
          notes: string | null
          tags: string[] | null
          usage_count: number
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['saved_formulas']['Row'], 'id' | 'created_at' | 'usage_count'>
        Update: Partial<Database['public']['Tables']['saved_formulas']['Insert']>
      }
    }
  }
}
