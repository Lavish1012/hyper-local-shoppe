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
      customer_profiles: {
        Row: {
          address: string | null
          age: number | null
          area_street: string | null
          city: string | null
          created_at: string
          house_number: string | null
          id: string
          landmark: string | null
          location_lat: number | null
          location_lng: number | null
          notifications_email: boolean | null
          notifications_sms: boolean | null
          onboarding_completed: boolean | null
          pincode: string | null
          preferred_language: string | null
          shopping_preferences:
            | Database["public"]["Enums"]["product_category"][]
            | null
          state: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          address?: string | null
          age?: number | null
          area_street?: string | null
          city?: string | null
          created_at?: string
          house_number?: string | null
          id?: string
          landmark?: string | null
          location_lat?: number | null
          location_lng?: number | null
          notifications_email?: boolean | null
          notifications_sms?: boolean | null
          onboarding_completed?: boolean | null
          pincode?: string | null
          preferred_language?: string | null
          shopping_preferences?:
            | Database["public"]["Enums"]["product_category"][]
            | null
          state?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          address?: string | null
          age?: number | null
          area_street?: string | null
          city?: string | null
          created_at?: string
          house_number?: string | null
          id?: string
          landmark?: string | null
          location_lat?: number | null
          location_lng?: number | null
          notifications_email?: boolean | null
          notifications_sms?: boolean | null
          onboarding_completed?: boolean | null
          pincode?: string | null
          preferred_language?: string | null
          shopping_preferences?:
            | Database["public"]["Enums"]["product_category"][]
            | null
          state?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string
          full_name: string | null
          id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email: string
          full_name?: string | null
          id?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string
          full_name?: string | null
          id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      seller_profiles: {
        Row: {
          area_street: string | null
          closing_time: string | null
          created_at: string
          delivery_available: boolean | null
          house_number: string | null
          id: string
          landmark: string | null
          logo_url: string | null
          onboarding_completed: boolean | null
          opening_time: string | null
          owner_name: string
          payment_methods:
            | Database["public"]["Enums"]["payment_method"][]
            | null
          phone_number: string
          products_sold:
            | Database["public"]["Enums"]["product_category"][]
            | null
          shop_address: string
          shop_location_lat: number | null
          shop_location_lng: number | null
          shop_name: string
          shop_pincode: string
          state: string | null
          store_image_url: string | null
          store_type: Database["public"]["Enums"]["store_type"]
          updated_at: string
          user_id: string
          weekly_holidays: string[] | null
          whatsapp_number: string | null
        }
        Insert: {
          area_street?: string | null
          closing_time?: string | null
          created_at?: string
          delivery_available?: boolean | null
          house_number?: string | null
          id?: string
          landmark?: string | null
          logo_url?: string | null
          onboarding_completed?: boolean | null
          opening_time?: string | null
          owner_name: string
          payment_methods?:
            | Database["public"]["Enums"]["payment_method"][]
            | null
          phone_number: string
          products_sold?:
            | Database["public"]["Enums"]["product_category"][]
            | null
          shop_address: string
          shop_location_lat?: number | null
          shop_location_lng?: number | null
          shop_name: string
          shop_pincode: string
          state?: string | null
          store_image_url?: string | null
          store_type: Database["public"]["Enums"]["store_type"]
          updated_at?: string
          user_id: string
          weekly_holidays?: string[] | null
          whatsapp_number?: string | null
        }
        Update: {
          area_street?: string | null
          closing_time?: string | null
          created_at?: string
          delivery_available?: boolean | null
          house_number?: string | null
          id?: string
          landmark?: string | null
          logo_url?: string | null
          onboarding_completed?: boolean | null
          opening_time?: string | null
          owner_name?: string
          payment_methods?:
            | Database["public"]["Enums"]["payment_method"][]
            | null
          phone_number?: string
          products_sold?:
            | Database["public"]["Enums"]["product_category"][]
            | null
          shop_address?: string
          shop_location_lat?: number | null
          shop_location_lng?: number | null
          shop_name?: string
          shop_pincode?: string
          state?: string | null
          store_image_url?: string | null
          store_type?: Database["public"]["Enums"]["store_type"]
          updated_at?: string
          user_id?: string
          weekly_holidays?: string[] | null
          whatsapp_number?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["user_role"]
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_user_role: {
        Args: { user_uuid: string }
        Returns: Database["public"]["Enums"]["user_role"]
      }
    }
    Enums: {
      payment_method: "cash" | "upi" | "card" | "bank_transfer"
      product_category:
        | "groceries"
        | "stationery"
        | "snacks"
        | "household"
        | "electronics"
        | "bakery"
        | "fruits_vegetables"
        | "dairy"
        | "medical"
        | "clothing"
        | "other"
      store_type:
        | "grocery"
        | "dairy"
        | "medical"
        | "stationery"
        | "bakery"
        | "fruits_vegetables"
        | "electronics"
        | "clothing"
        | "hardware"
        | "other"
      user_role: "customer" | "seller"
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
      payment_method: ["cash", "upi", "card", "bank_transfer"],
      product_category: [
        "groceries",
        "stationery",
        "snacks",
        "household",
        "electronics",
        "bakery",
        "fruits_vegetables",
        "dairy",
        "medical",
        "clothing",
        "other",
      ],
      store_type: [
        "grocery",
        "dairy",
        "medical",
        "stationery",
        "bakery",
        "fruits_vegetables",
        "electronics",
        "clothing",
        "hardware",
        "other",
      ],
      user_role: ["customer", "seller"],
    },
  },
} as const
