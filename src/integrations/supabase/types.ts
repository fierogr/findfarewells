export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      admin_users: {
        Row: {
          created_at: string
          email: string
          id: string
        }
        Insert: {
          created_at?: string
          email: string
          id: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
        }
        Relationships: []
      }
      new_partners: {
        Row: {
          address: string
          business_name: string
          city: string
          created_at: string
          description: string
          email: string
          id: string
          owner_name: string
          phone: string
          postal_code: string
          regions: string[] | null
          services: string | null
          status: string
          terms_accepted: boolean
          updated_at: string
          website: string | null
        }
        Insert: {
          address: string
          business_name: string
          city: string
          created_at?: string
          description: string
          email: string
          id?: string
          owner_name: string
          phone: string
          postal_code: string
          regions?: string[] | null
          services?: string | null
          status?: string
          terms_accepted?: boolean
          updated_at?: string
          website?: string | null
        }
        Update: {
          address?: string
          business_name?: string
          city?: string
          created_at?: string
          description?: string
          email?: string
          id?: string
          owner_name?: string
          phone?: string
          postal_code?: string
          regions?: string[] | null
          services?: string | null
          status?: string
          terms_accepted?: boolean
          updated_at?: string
          website?: string | null
        }
        Relationships: []
      }
      package_selections: {
        Row: {
          created_at: string
          id: string
          location: string | null
          package_id: string | null
          package_name: string
          package_price: number
          partner_id: number | null
          partner_name: string
          phone_number: string
          prefecture: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          location?: string | null
          package_id?: string | null
          package_name: string
          package_price: number
          partner_id?: number | null
          partner_name: string
          phone_number: string
          prefecture?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          location?: string | null
          package_id?: string | null
          package_name?: string
          package_price?: number
          partner_id?: number | null
          partner_name?: string
          phone_number?: string
          prefecture?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "package_selections_partner_id_fkey"
            columns: ["partner_id"]
            isOneToOne: false
            referencedRelation: "partners"
            referencedColumns: ["id"]
          },
        ]
      }
      partners: {
        Row: {
          address: string | null
          business_name: string | null
          city: string | null
          created_at: string
          description: string | null
          email: string | null
          featured: boolean | null
          id: number
          image_url: string | null
          name: string | null
          owner_name: string | null
          packages: Json[] | null
          phone: string | null
          regions: string[] | null
          services: string[] | null
          state: string | null
          telephone: string | null
          website: string | null
          zip: string | null
        }
        Insert: {
          address?: string | null
          business_name?: string | null
          city?: string | null
          created_at?: string
          description?: string | null
          email?: string | null
          featured?: boolean | null
          id?: number
          image_url?: string | null
          name?: string | null
          owner_name?: string | null
          packages?: Json[] | null
          phone?: string | null
          regions?: string[] | null
          services?: string[] | null
          state?: string | null
          telephone?: string | null
          website?: string | null
          zip?: string | null
        }
        Update: {
          address?: string | null
          business_name?: string | null
          city?: string | null
          created_at?: string
          description?: string | null
          email?: string | null
          featured?: boolean | null
          id?: number
          image_url?: string | null
          name?: string | null
          owner_name?: string | null
          packages?: Json[] | null
          phone?: string | null
          regions?: string[] | null
          services?: string[] | null
          state?: string | null
          telephone?: string | null
          website?: string | null
          zip?: string | null
        }
        Relationships: []
      }
      search_requests: {
        Row: {
          created_at: string
          id: string
          location: string | null
          phone_number: string
          prefecture: string | null
          services: string[] | null
        }
        Insert: {
          created_at?: string
          id?: string
          location?: string | null
          phone_number: string
          prefecture?: string | null
          services?: string[] | null
        }
        Update: {
          created_at?: string
          id?: string
          location?: string | null
          phone_number?: string
          prefecture?: string | null
          services?: string[] | null
        }
        Relationships: []
      }
      settings: {
        Row: {
          created_at: string
          id: string
          key: string
          updated_at: string | null
          value: string
        }
        Insert: {
          created_at?: string
          id?: string
          key: string
          updated_at?: string | null
          value: string
        }
        Update: {
          created_at?: string
          id?: string
          key?: string
          updated_at?: string | null
          value?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
