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
    PostgrestVersion: "14.4"
  }
  public: {
    Tables: {
      cost_items: {
        Row: {
          cost_value: number | null
          created_at: string | null
          description: string
          id: string
          opportunity_id: string | null
          revenue_item_id: string | null
        }
        Insert: {
          cost_value?: number | null
          created_at?: string | null
          description: string
          id?: string
          opportunity_id?: string | null
          revenue_item_id?: string | null
        }
        Update: {
          cost_value?: number | null
          created_at?: string | null
          description?: string
          id?: string
          opportunity_id?: string | null
          revenue_item_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "cost_items_opportunity_id_fkey"
            columns: ["opportunity_id"]
            isOneToOne: false
            referencedRelation: "opportunities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cost_items_revenue_item_id_fkey"
            columns: ["revenue_item_id"]
            isOneToOne: false
            referencedRelation: "revenue_items"
            referencedColumns: ["id"]
          },
        ]
      }
      music_briefings: {
        Row: {
          authorized_names: string | null
          blacklist: string | null
          created_at: string | null
          id: string
          observations: string | null
          opportunity_id: string
          special_moments: Json | null
          status: string | null
          styles_json: Json | null
          submitted_at: string | null
          wishlist: Json | null
        }
        Insert: {
          authorized_names?: string | null
          blacklist?: string | null
          created_at?: string | null
          id?: string
          observations?: string | null
          opportunity_id: string
          special_moments?: Json | null
          status?: string | null
          styles_json?: Json | null
          submitted_at?: string | null
          wishlist?: Json | null
        }
        Update: {
          authorized_names?: string | null
          blacklist?: string | null
          created_at?: string | null
          id?: string
          observations?: string | null
          opportunity_id?: string
          special_moments?: Json | null
          status?: string | null
          styles_json?: Json | null
          submitted_at?: string | null
          wishlist?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "music_briefings_opportunity_id_fkey"
            columns: ["opportunity_id"]
            isOneToOne: true
            referencedRelation: "opportunities"
            referencedColumns: ["id"]
          },
        ]
      }
      opportunities: {
        Row: {
          archived: boolean
          client_name: string
          client_profile: string | null
          created_at: string | null
          custom_prompt: string | null
          event_date: string | null
          event_type: string | null
          guests: number | null
          id: string
          last_ai_script: string | null
          location: string | null
          negotiation_history: string | null
          phone: string | null
          requested_repertoire: string | null
          status: string | null
        }
        Insert: {
          archived?: boolean
          client_name: string
          client_profile?: string | null
          created_at?: string | null
          custom_prompt?: string | null
          event_date?: string | null
          event_type?: string | null
          guests?: number | null
          id?: string
          last_ai_script?: string | null
          location?: string | null
          negotiation_history?: string | null
          phone?: string | null
          requested_repertoire?: string | null
          status?: string | null
        }
        Update: {
          archived?: boolean
          client_name?: string
          client_profile?: string | null
          created_at?: string | null
          custom_prompt?: string | null
          event_date?: string | null
          event_type?: string | null
          guests?: number | null
          id?: string
          last_ai_script?: string | null
          location?: string | null
          negotiation_history?: string | null
          phone?: string | null
          requested_repertoire?: string | null
          status?: string | null
        }
        Relationships: []
      }
      revenue_items: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          opportunity_id: string | null
          sale_value: number | null
          title: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          opportunity_id?: string | null
          sale_value?: number | null
          title: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          opportunity_id?: string | null
          sale_value?: number | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "revenue_items_opportunity_id_fkey"
            columns: ["opportunity_id"]
            isOneToOne: false
            referencedRelation: "opportunities"
            referencedColumns: ["id"]
          },
        ]
      }
      site_settings: {
        Row: {
          description: string | null
          id: string
          key: string
          value: string
        }
        Insert: {
          description?: string | null
          id?: string
          key: string
          value: string
        }
        Update: {
          description?: string | null
          id?: string
          key?: string
          value?: string
        }
        Relationships: []
      }
      standard_revenue_items: {
        Row: {
          created_at: string | null
          default_description: string | null
          id: string
          title: string
        }
        Insert: {
          created_at?: string | null
          default_description?: string | null
          id?: string
          title: string
        }
        Update: {
          created_at?: string | null
          default_description?: string | null
          id?: string
          title?: string
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
      [_ in never]: never
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
    Enums: {},
  },
} as const
