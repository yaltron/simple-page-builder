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
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      about_content: {
        Row: {
          content: Json
          id: string
          section: string
          updated_at: string
        }
        Insert: {
          content?: Json
          id?: string
          section: string
          updated_at?: string
        }
        Update: {
          content?: Json
          id?: string
          section?: string
          updated_at?: string
        }
        Relationships: []
      }
      appointments: {
        Row: {
          admin_notes: string | null
          consultation_type: string
          created_at: string
          email: string | null
          follow_up_at: string | null
          full_name: string
          id: string
          message: string | null
          phone: string
          preferred_date: string
          preferred_time: string
          service: string | null
          status: string
          updated_at: string
        }
        Insert: {
          admin_notes?: string | null
          consultation_type?: string
          created_at?: string
          email?: string | null
          follow_up_at?: string | null
          full_name: string
          id?: string
          message?: string | null
          phone: string
          preferred_date: string
          preferred_time: string
          service?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          admin_notes?: string | null
          consultation_type?: string
          created_at?: string
          email?: string | null
          follow_up_at?: string | null
          full_name?: string
          id?: string
          message?: string | null
          phone?: string
          preferred_date?: string
          preferred_time?: string
          service?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      blogs: {
        Row: {
          author: string | null
          category: string | null
          content: string | null
          created_at: string
          excerpt: string | null
          featured_image: string | null
          featured_image_alt: string | null
          focus_keyword: string | null
          id: string
          meta_description: string | null
          meta_title: string | null
          published_at: string | null
          reading_time: number | null
          secondary_keywords: string[] | null
          slug: string
          status: string
          tags: string[] | null
          title: string
          updated_at: string
          word_count: number | null
        }
        Insert: {
          author?: string | null
          category?: string | null
          content?: string | null
          created_at?: string
          excerpt?: string | null
          featured_image?: string | null
          featured_image_alt?: string | null
          focus_keyword?: string | null
          id?: string
          meta_description?: string | null
          meta_title?: string | null
          published_at?: string | null
          reading_time?: number | null
          secondary_keywords?: string[] | null
          slug: string
          status?: string
          tags?: string[] | null
          title: string
          updated_at?: string
          word_count?: number | null
        }
        Update: {
          author?: string | null
          category?: string | null
          content?: string | null
          created_at?: string
          excerpt?: string | null
          featured_image?: string | null
          featured_image_alt?: string | null
          focus_keyword?: string | null
          id?: string
          meta_description?: string | null
          meta_title?: string | null
          published_at?: string | null
          reading_time?: number | null
          secondary_keywords?: string[] | null
          slug?: string
          status?: string
          tags?: string[] | null
          title?: string
          updated_at?: string
          word_count?: number | null
        }
        Relationships: []
      }
      career_applications: {
        Row: {
          career_id: string | null
          cover_letter: string | null
          created_at: string
          email: string
          full_name: string
          id: string
          phone: string
          portfolio_url: string | null
          position: string
          resume_url: string | null
          status: string
          updated_at: string
        }
        Insert: {
          career_id?: string | null
          cover_letter?: string | null
          created_at?: string
          email: string
          full_name: string
          id?: string
          phone: string
          portfolio_url?: string | null
          position: string
          resume_url?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          career_id?: string | null
          cover_letter?: string | null
          created_at?: string
          email?: string
          full_name?: string
          id?: string
          phone?: string
          portfolio_url?: string | null
          position?: string
          resume_url?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "career_applications_career_id_fkey"
            columns: ["career_id"]
            isOneToOne: false
            referencedRelation: "career_listings"
            referencedColumns: ["id"]
          },
        ]
      }
      career_listings: {
        Row: {
          created_at: string
          deadline: string | null
          department: string | null
          description: string | null
          experience: string | null
          id: string
          is_active: boolean
          location: string | null
          requirements: string | null
          title: string
          type: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          deadline?: string | null
          department?: string | null
          description?: string | null
          experience?: string | null
          id?: string
          is_active?: boolean
          location?: string | null
          requirements?: string | null
          title: string
          type?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          deadline?: string | null
          department?: string | null
          description?: string | null
          experience?: string | null
          id?: string
          is_active?: boolean
          location?: string | null
          requirements?: string | null
          title?: string
          type?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      doctors: {
        Row: {
          bio: string | null
          created_at: string
          display_order: number
          experience_years: number | null
          id: string
          image: string | null
          name: string
          qualifications: string | null
          slug: string | null
          specialties: string[] | null
          status: string
          title: string | null
          updated_at: string
        }
        Insert: {
          bio?: string | null
          created_at?: string
          display_order?: number
          experience_years?: number | null
          id?: string
          image?: string | null
          name: string
          qualifications?: string | null
          slug?: string | null
          specialties?: string[] | null
          status?: string
          title?: string | null
          updated_at?: string
        }
        Update: {
          bio?: string | null
          created_at?: string
          display_order?: number
          experience_years?: number | null
          id?: string
          image?: string | null
          name?: string
          qualifications?: string | null
          slug?: string | null
          specialties?: string[] | null
          status?: string
          title?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      faqs: {
        Row: {
          answer: string
          category: string
          created_at: string
          id: string
          is_active: boolean
          order_index: number
          question: string
          updated_at: string
        }
        Insert: {
          answer: string
          category?: string
          created_at?: string
          id?: string
          is_active?: boolean
          order_index?: number
          question: string
          updated_at?: string
        }
        Update: {
          answer?: string
          category?: string
          created_at?: string
          id?: string
          is_active?: boolean
          order_index?: number
          question?: string
          updated_at?: string
        }
        Relationships: []
      }
      gallery_items: {
        Row: {
          caption: string | null
          category: string | null
          created_at: string
          display_order: number
          id: string
          media_type: string
          status: string
          thumbnail: string | null
          title: string | null
          updated_at: string
          url: string
          video_url: string | null
        }
        Insert: {
          caption?: string | null
          category?: string | null
          created_at?: string
          display_order?: number
          id?: string
          media_type?: string
          status?: string
          thumbnail?: string | null
          title?: string | null
          updated_at?: string
          url: string
          video_url?: string | null
        }
        Update: {
          caption?: string | null
          category?: string | null
          created_at?: string
          display_order?: number
          id?: string
          media_type?: string
          status?: string
          thumbnail?: string | null
          title?: string | null
          updated_at?: string
          url?: string
          video_url?: string | null
        }
        Relationships: []
      }
      homepage_content: {
        Row: {
          content: Json
          id: string
          section: string
          updated_at: string
        }
        Insert: {
          content?: Json
          id?: string
          section: string
          updated_at?: string
        }
        Update: {
          content?: Json
          id?: string
          section?: string
          updated_at?: string
        }
        Relationships: []
      }
      moments_gallery: {
        Row: {
          created_at: string
          id: string
          image_alt: string | null
          image_url: string
          is_active: boolean
          order_index: number
          span_class: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          image_alt?: string | null
          image_url: string
          is_active?: boolean
          order_index?: number
          span_class?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          image_alt?: string | null
          image_url?: string
          is_active?: boolean
          order_index?: number
          span_class?: string
          updated_at?: string
        }
        Relationships: []
      }
      podcasts: {
        Row: {
          created_at: string
          description: string | null
          id: string
          is_active: boolean
          order_index: number
          title: string
          updated_at: string
          youtube_url: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          order_index?: number
          title?: string
          updated_at?: string
          youtube_url: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          order_index?: number
          title?: string
          updated_at?: string
          youtube_url?: string
        }
        Relationships: []
      }
      popup_banners: {
        Row: {
          background_color: string | null
          button_text: string | null
          button_url: string | null
          created_at: string
          description: string | null
          end_date: string | null
          id: string
          image_alt: string | null
          image_url: string | null
          is_active: boolean
          show_after_seconds: number
          show_on_pages: string[]
          show_once_per_session: boolean
          start_date: string | null
          title: string | null
          updated_at: string
        }
        Insert: {
          background_color?: string | null
          button_text?: string | null
          button_url?: string | null
          created_at?: string
          description?: string | null
          end_date?: string | null
          id?: string
          image_alt?: string | null
          image_url?: string | null
          is_active?: boolean
          show_after_seconds?: number
          show_on_pages?: string[]
          show_once_per_session?: boolean
          start_date?: string | null
          title?: string | null
          updated_at?: string
        }
        Update: {
          background_color?: string | null
          button_text?: string | null
          button_url?: string | null
          created_at?: string
          description?: string | null
          end_date?: string | null
          id?: string
          image_alt?: string | null
          image_url?: string | null
          is_active?: boolean
          show_after_seconds?: number
          show_on_pages?: string[]
          show_once_per_session?: boolean
          start_date?: string | null
          title?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      services: {
        Row: {
          created_at: string
          description: string | null
          display_order: number
          featured_image: string | null
          full_content: string | null
          hero_image_alt: string | null
          hero_image_url: string | null
          icon: string | null
          id: string
          key_points: string[]
          meta_description: string | null
          meta_title: string | null
          page_heading: string | null
          page_subtext: string | null
          short_description: string | null
          slug: string
          status: string
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          display_order?: number
          featured_image?: string | null
          full_content?: string | null
          hero_image_alt?: string | null
          hero_image_url?: string | null
          icon?: string | null
          id?: string
          key_points?: string[]
          meta_description?: string | null
          meta_title?: string | null
          page_heading?: string | null
          page_subtext?: string | null
          short_description?: string | null
          slug: string
          status?: string
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          display_order?: number
          featured_image?: string | null
          full_content?: string | null
          hero_image_alt?: string | null
          hero_image_url?: string | null
          icon?: string | null
          id?: string
          key_points?: string[]
          meta_description?: string | null
          meta_title?: string | null
          page_heading?: string | null
          page_subtext?: string | null
          short_description?: string | null
          slug?: string
          status?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      site_settings: {
        Row: {
          description: string | null
          id: string
          key: string
          updated_at: string
          value: Json
        }
        Insert: {
          description?: string | null
          id?: string
          key: string
          updated_at?: string
          value?: Json
        }
        Update: {
          description?: string | null
          id?: string
          key?: string
          updated_at?: string
          value?: Json
        }
        Relationships: []
      }
      testimonials: {
        Row: {
          created_at: string
          display_order: number
          id: string
          image: string | null
          location: string | null
          name: string
          rating: number | null
          status: string
          story: string | null
          treatment: string | null
          updated_at: string
          video_url: string | null
        }
        Insert: {
          created_at?: string
          display_order?: number
          id?: string
          image?: string | null
          location?: string | null
          name: string
          rating?: number | null
          status?: string
          story?: string | null
          treatment?: string | null
          updated_at?: string
          video_url?: string | null
        }
        Update: {
          created_at?: string
          display_order?: number
          id?: string
          image?: string | null
          location?: string | null
          name?: string
          rating?: number | null
          status?: string
          story?: string | null
          treatment?: string | null
          updated_at?: string
          video_url?: string | null
        }
        Relationships: []
      }
      trust_features: {
        Row: {
          created_at: string
          full_content: string
          icon: string
          icon_bg_color: string
          id: string
          is_active: boolean
          meta_description: string
          meta_title: string
          order_index: number
          page_heading: string
          page_subtext: string
          short_description: string
          slug: string
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          full_content?: string
          icon?: string
          icon_bg_color?: string
          id?: string
          is_active?: boolean
          meta_description?: string
          meta_title?: string
          order_index?: number
          page_heading?: string
          page_subtext?: string
          short_description?: string
          slug: string
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          full_content?: string
          icon?: string
          icon_bg_color?: string
          id?: string
          is_active?: boolean
          meta_description?: string
          meta_title?: string
          order_index?: number
          page_heading?: string
          page_subtext?: string
          short_description?: string
          slug?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      when_to_visit_items: {
        Row: {
          created_at: string
          id: string
          is_active: boolean
          order_index: number
          text: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_active?: boolean
          order_index?: number
          text: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          is_active?: boolean
          order_index?: number
          text?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "editor"
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
      app_role: ["admin", "editor"],
    },
  },
} as const
