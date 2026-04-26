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
      mp_webhook_logs: {
        Row: {
          error_message: string | null
          event_type: string | null
          id: string
          mp_payment_id: string | null
          processed: boolean
          raw_payload: Json | null
          received_at: string
        }
        Insert: {
          error_message?: string | null
          event_type?: string | null
          id?: string
          mp_payment_id?: string | null
          processed?: boolean
          raw_payload?: Json | null
          received_at?: string
        }
        Update: {
          error_message?: string | null
          event_type?: string | null
          id?: string
          mp_payment_id?: string | null
          processed?: boolean
          raw_payload?: Json | null
          received_at?: string
        }
        Relationships: []
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
      payments: {
        Row: {
          amount: number
          approved_at: string | null
          created_at: string
          expires_at: string | null
          id: string
          is_manual: boolean
          mp_payment_id: string | null
          played_at: string | null
          qr_code: string | null
          qr_code_base64: string | null
          requester_name: string
          show_id: string
          show_setlist_id: string
          status: Database["public"]["Enums"]["payment_status"]
          ticket_url: string | null
          updated_at: string
        }
        Insert: {
          amount: number
          approved_at?: string | null
          created_at?: string
          expires_at?: string | null
          id?: string
          is_manual?: boolean
          mp_payment_id?: string | null
          played_at?: string | null
          qr_code?: string | null
          qr_code_base64?: string | null
          requester_name: string
          show_id: string
          show_setlist_id: string
          status?: Database["public"]["Enums"]["payment_status"]
          ticket_url?: string | null
          updated_at?: string
        }
        Update: {
          amount?: number
          approved_at?: string | null
          created_at?: string
          expires_at?: string | null
          id?: string
          is_manual?: boolean
          mp_payment_id?: string | null
          played_at?: string | null
          qr_code?: string | null
          qr_code_base64?: string | null
          requester_name?: string
          show_id?: string
          show_setlist_id?: string
          status?: Database["public"]["Enums"]["payment_status"]
          ticket_url?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "payments_show_id_fkey"
            columns: ["show_id"]
            isOneToOne: false
            referencedRelation: "shows"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_show_setlist_id_fkey"
            columns: ["show_setlist_id"]
            isOneToOne: false
            referencedRelation: "show_setlist"
            referencedColumns: ["id"]
          },
        ]
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
      show_setlist: {
        Row: {
          created_at: string
          custom_min_price: number | null
          custom_sug_price: number | null
          id: string
          locked_at: string | null
          pending_until: string | null
          played_at: string | null
          position: number
          show_id: string
          song_id: string
          status: Database["public"]["Enums"]["setlist_status"]
          updated_at: string
        }
        Insert: {
          created_at?: string
          custom_min_price?: number | null
          custom_sug_price?: number | null
          id?: string
          locked_at?: string | null
          pending_until?: string | null
          played_at?: string | null
          position?: number
          show_id: string
          song_id: string
          status?: Database["public"]["Enums"]["setlist_status"]
          updated_at?: string
        }
        Update: {
          created_at?: string
          custom_min_price?: number | null
          custom_sug_price?: number | null
          id?: string
          locked_at?: string | null
          pending_until?: string | null
          played_at?: string | null
          position?: number
          show_id?: string
          song_id?: string
          status?: Database["public"]["Enums"]["setlist_status"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "show_setlist_show_id_fkey"
            columns: ["show_id"]
            isOneToOne: false
            referencedRelation: "shows"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "show_setlist_song_id_fkey"
            columns: ["song_id"]
            isOneToOne: false
            referencedRelation: "songs"
            referencedColumns: ["id"]
          },
        ]
      }
      shows: {
        Row: {
          created_at: string
          event_date: string
          id: string
          is_active: boolean
          location: string
          notes: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          event_date: string
          id?: string
          is_active?: boolean
          location: string
          notes?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          event_date?: string
          id?: string
          is_active?: boolean
          location?: string
          notes?: string | null
          updated_at?: string
        }
        Relationships: []
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
      songs: {
        Row: {
          active: boolean
          artist: string | null
          created_at: string
          default_min_price: number
          default_sug_price: number
          id: string
          title: string
          updated_at: string
        }
        Insert: {
          active?: boolean
          artist?: string | null
          created_at?: string
          default_min_price?: number
          default_sug_price?: number
          id?: string
          title: string
          updated_at?: string
        }
        Update: {
          active?: boolean
          artist?: string | null
          created_at?: string
          default_min_price?: number
          default_sug_price?: number
          id?: string
          title?: string
          updated_at?: string
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
      get_briefing_by_opportunity: {
        Args: { p_opportunity_id: string }
        Returns: {
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
        }[]
        SetofOptions: {
          from: "*"
          to: "music_briefings"
          isOneToOne: false
          isSetofReturn: true
        }
      }
      get_payment_status: {
        Args: { p_payment_id: string }
        Returns: {
          approved_at: string
          id: string
          status: Database["public"]["Enums"]["payment_status"]
        }[]
      }
      get_proposal_data: { Args: { p_opportunity_id: string }; Returns: Json }
      release_expired_pending: { Args: never; Returns: undefined }
    }
    Enums: {
      payment_status:
        | "pending"
        | "approved"
        | "rejected"
        | "cancelled"
        | "refunded"
      setlist_status: "available" | "pending" | "locked" | "played"
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
      payment_status: [
        "pending",
        "approved",
        "rejected",
        "cancelled",
        "refunded",
      ],
      setlist_status: ["available", "pending", "locked", "played"],
    },
  },
} as const
