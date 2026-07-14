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
      activity_events: {
        Row: {
          action: string
          actor_id: string | null
          context: Json
          id: string
          metadata: Json
          occurred_at: string
          targets: Json
        }
        Insert: {
          action: string
          actor_id?: string | null
          context?: Json
          id?: string
          metadata?: Json
          occurred_at?: string
          targets?: Json
        }
        Update: {
          action?: string
          actor_id?: string | null
          context?: Json
          id?: string
          metadata?: Json
          occurred_at?: string
          targets?: Json
        }
        Relationships: []
      }
      entity_versions: {
        Row: {
          author_id: string | null
          change_summary: string | null
          created_at: string
          entity_id: string
          entity_type: string
          id: string
          snapshot: Json
          state: string
          version_no: number
        }
        Insert: {
          author_id?: string | null
          change_summary?: string | null
          created_at?: string
          entity_id: string
          entity_type: string
          id?: string
          snapshot: Json
          state: string
          version_no: number
        }
        Update: {
          author_id?: string | null
          change_summary?: string | null
          created_at?: string
          entity_id?: string
          entity_type?: string
          id?: string
          snapshot?: Json
          state?: string
          version_no?: number
        }
        Relationships: []
      }
      events: {
        Row: {
          booked_note: string | null
          capacity: number | null
          created_at: string
          ends_on: string | null
          festival_id: string | null
          id: string
          kind: Database["public"]["Enums"]["event_kind"]
          label: string | null
          starts_on: string
          status: Database["public"]["Enums"]["event_status"]
          tour_id: string | null
          updated_at: string
          year: number | null
        }
        Insert: {
          booked_note?: string | null
          capacity?: number | null
          created_at?: string
          ends_on?: string | null
          festival_id?: string | null
          id?: string
          kind: Database["public"]["Enums"]["event_kind"]
          label?: string | null
          starts_on: string
          status?: Database["public"]["Enums"]["event_status"]
          tour_id?: string | null
          updated_at?: string
          year?: number | null
        }
        Update: {
          booked_note?: string | null
          capacity?: number | null
          created_at?: string
          ends_on?: string | null
          festival_id?: string | null
          id?: string
          kind?: Database["public"]["Enums"]["event_kind"]
          label?: string | null
          starts_on?: string
          status?: Database["public"]["Enums"]["event_status"]
          tour_id?: string | null
          updated_at?: string
          year?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "events_festival_id_fkey"
            columns: ["festival_id"]
            isOneToOne: false
            referencedRelation: "festivals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "events_tour_id_fkey"
            columns: ["tour_id"]
            isOneToOne: false
            referencedRelation: "tours"
            referencedColumns: ["id"]
          },
        ]
      }
      experiences: {
        Row: {
          authentic: boolean
          body: Json | null
          created_at: string
          deleted_at: string | null
          duration_label: string | null
          exclusivity_tier: number
          group_max: number | null
          hero_media_id: string | null
          host_id: string | null
          id: string
          kind: Database["public"]["Enums"]["experience_kind"]
          name: string
          place_id: string | null
          price_inr: number | null
          published_at: string | null
          scheduled_for: string | null
          seo: Json
          slug: string
          status: Database["public"]["Enums"]["publish_status"]
          tribe_id: string | null
          updated_at: string
        }
        Insert: {
          authentic?: boolean
          body?: Json | null
          created_at?: string
          deleted_at?: string | null
          duration_label?: string | null
          exclusivity_tier?: number
          group_max?: number | null
          hero_media_id?: string | null
          host_id?: string | null
          id?: string
          kind?: Database["public"]["Enums"]["experience_kind"]
          name: string
          place_id?: string | null
          price_inr?: number | null
          published_at?: string | null
          scheduled_for?: string | null
          seo?: Json
          slug: string
          status?: Database["public"]["Enums"]["publish_status"]
          tribe_id?: string | null
          updated_at?: string
        }
        Update: {
          authentic?: boolean
          body?: Json | null
          created_at?: string
          deleted_at?: string | null
          duration_label?: string | null
          exclusivity_tier?: number
          group_max?: number | null
          hero_media_id?: string | null
          host_id?: string | null
          id?: string
          kind?: Database["public"]["Enums"]["experience_kind"]
          name?: string
          place_id?: string | null
          price_inr?: number | null
          published_at?: string | null
          scheduled_for?: string | null
          seo?: Json
          slug?: string
          status?: Database["public"]["Enums"]["publish_status"]
          tribe_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "experiences_hero_media_id_fkey"
            columns: ["hero_media_id"]
            isOneToOne: false
            referencedRelation: "media"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "experiences_host_id_fkey"
            columns: ["host_id"]
            isOneToOne: false
            referencedRelation: "partners"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "experiences_place_id_fkey"
            columns: ["place_id"]
            isOneToOne: false
            referencedRelation: "places"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "experiences_tribe_id_fkey"
            columns: ["tribe_id"]
            isOneToOne: false
            referencedRelation: "tribes"
            referencedColumns: ["id"]
          },
        ]
      }
      festivals: {
        Row: {
          body: Json | null
          created_at: string
          deleted_at: string | null
          hero_media_id: string | null
          id: string
          name: string
          place_id: string | null
          published_at: string | null
          recurrence: Json
          region_id: string | null
          scheduled_for: string | null
          seo: Json
          slug: string
          status: Database["public"]["Enums"]["publish_status"]
          tribe_id: string | null
          updated_at: string
        }
        Insert: {
          body?: Json | null
          created_at?: string
          deleted_at?: string | null
          hero_media_id?: string | null
          id?: string
          name: string
          place_id?: string | null
          published_at?: string | null
          recurrence?: Json
          region_id?: string | null
          scheduled_for?: string | null
          seo?: Json
          slug: string
          status?: Database["public"]["Enums"]["publish_status"]
          tribe_id?: string | null
          updated_at?: string
        }
        Update: {
          body?: Json | null
          created_at?: string
          deleted_at?: string | null
          hero_media_id?: string | null
          id?: string
          name?: string
          place_id?: string | null
          published_at?: string | null
          recurrence?: Json
          region_id?: string | null
          scheduled_for?: string | null
          seo?: Json
          slug?: string
          status?: Database["public"]["Enums"]["publish_status"]
          tribe_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "festivals_hero_media_id_fkey"
            columns: ["hero_media_id"]
            isOneToOne: false
            referencedRelation: "media"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "festivals_place_id_fkey"
            columns: ["place_id"]
            isOneToOne: false
            referencedRelation: "places"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "festivals_region_id_fkey"
            columns: ["region_id"]
            isOneToOne: false
            referencedRelation: "regions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "festivals_tribe_id_fkey"
            columns: ["tribe_id"]
            isOneToOne: false
            referencedRelation: "tribes"
            referencedColumns: ["id"]
          },
        ]
      }
      media: {
        Row: {
          alt: string | null
          blurhash: string | null
          bytes: number | null
          caption: string | null
          content_hash: string | null
          created_at: string
          credit: string | null
          focal_point: Json | null
          geom: unknown
          height: number | null
          id: string
          kind: string
          mime: string | null
          storage_path: string
          updated_at: string
          width: number | null
        }
        Insert: {
          alt?: string | null
          blurhash?: string | null
          bytes?: number | null
          caption?: string | null
          content_hash?: string | null
          created_at?: string
          credit?: string | null
          focal_point?: Json | null
          geom?: unknown
          height?: number | null
          id?: string
          kind?: string
          mime?: string | null
          storage_path: string
          updated_at?: string
          width?: number | null
        }
        Update: {
          alt?: string | null
          blurhash?: string | null
          bytes?: number | null
          caption?: string | null
          content_hash?: string | null
          created_at?: string
          credit?: string | null
          focal_point?: Json | null
          geom?: unknown
          height?: number | null
          id?: string
          kind?: string
          mime?: string | null
          storage_path?: string
          updated_at?: string
          width?: number | null
        }
        Relationships: []
      }
      media_links: {
        Row: {
          created_at: string
          id: string
          media_id: string
          owner_id: string
          owner_type: string
          role: string
          sort: number
        }
        Insert: {
          created_at?: string
          id?: string
          media_id: string
          owner_id: string
          owner_type: string
          role?: string
          sort?: number
        }
        Update: {
          created_at?: string
          id?: string
          media_id?: string
          owner_id?: string
          owner_type?: string
          role?: string
          sort?: number
        }
        Relationships: [
          {
            foreignKeyName: "media_links_media_id_fkey"
            columns: ["media_id"]
            isOneToOne: false
            referencedRelation: "media"
            referencedColumns: ["id"]
          },
        ]
      }
      partners: {
        Row: {
          bio: string | null
          contact: Json
          created_at: string
          hero_media_id: string | null
          id: string
          kind: Database["public"]["Enums"]["partner_kind"]
          name: string
          place_id: string | null
          tribe_id: string | null
          updated_at: string
          verified_at: string | null
        }
        Insert: {
          bio?: string | null
          contact?: Json
          created_at?: string
          hero_media_id?: string | null
          id?: string
          kind?: Database["public"]["Enums"]["partner_kind"]
          name: string
          place_id?: string | null
          tribe_id?: string | null
          updated_at?: string
          verified_at?: string | null
        }
        Update: {
          bio?: string | null
          contact?: Json
          created_at?: string
          hero_media_id?: string | null
          id?: string
          kind?: Database["public"]["Enums"]["partner_kind"]
          name?: string
          place_id?: string | null
          tribe_id?: string | null
          updated_at?: string
          verified_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "partners_hero_media_id_fkey"
            columns: ["hero_media_id"]
            isOneToOne: false
            referencedRelation: "media"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "partners_place_id_fkey"
            columns: ["place_id"]
            isOneToOne: false
            referencedRelation: "places"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "partners_tribe_id_fkey"
            columns: ["tribe_id"]
            isOneToOne: false
            referencedRelation: "tribes"
            referencedColumns: ["id"]
          },
        ]
      }
      permit_zones: {
        Row: {
          body: Json | null
          created_at: string
          deleted_at: string | null
          faqs: Json
          fee: Json
          foreigners_allowed: boolean
          geom: unknown
          helpline: string | null
          hero_media_id: string | null
          id: string
          indians_allowed: boolean
          last_verified_at: string | null
          name: string
          official_portal: string | null
          on_arrival: boolean
          permit_type: Database["public"]["Enums"]["permit_type"]
          processing_time: string | null
          published_at: string | null
          region_id: string | null
          rules: Json
          scheduled_for: string | null
          seo: Json
          slug: string
          status: Database["public"]["Enums"]["publish_status"]
          updated_at: string
          validity: string | null
        }
        Insert: {
          body?: Json | null
          created_at?: string
          deleted_at?: string | null
          faqs?: Json
          fee?: Json
          foreigners_allowed?: boolean
          geom?: unknown
          helpline?: string | null
          hero_media_id?: string | null
          id?: string
          indians_allowed?: boolean
          last_verified_at?: string | null
          name: string
          official_portal?: string | null
          on_arrival?: boolean
          permit_type?: Database["public"]["Enums"]["permit_type"]
          processing_time?: string | null
          published_at?: string | null
          region_id?: string | null
          rules?: Json
          scheduled_for?: string | null
          seo?: Json
          slug: string
          status?: Database["public"]["Enums"]["publish_status"]
          updated_at?: string
          validity?: string | null
        }
        Update: {
          body?: Json | null
          created_at?: string
          deleted_at?: string | null
          faqs?: Json
          fee?: Json
          foreigners_allowed?: boolean
          geom?: unknown
          helpline?: string | null
          hero_media_id?: string | null
          id?: string
          indians_allowed?: boolean
          last_verified_at?: string | null
          name?: string
          official_portal?: string | null
          on_arrival?: boolean
          permit_type?: Database["public"]["Enums"]["permit_type"]
          processing_time?: string | null
          published_at?: string | null
          region_id?: string | null
          rules?: Json
          scheduled_for?: string | null
          seo?: Json
          slug?: string
          status?: Database["public"]["Enums"]["publish_status"]
          updated_at?: string
          validity?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "permit_zones_hero_media_id_fkey"
            columns: ["hero_media_id"]
            isOneToOne: false
            referencedRelation: "media"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "permit_zones_region_id_fkey"
            columns: ["region_id"]
            isOneToOne: false
            referencedRelation: "regions"
            referencedColumns: ["id"]
          },
        ]
      }
      places: {
        Row: {
          body: Json | null
          created_at: string
          deleted_at: string | null
          elevation_m: number | null
          entry_no: number | null
          exclusivity_tier: number
          geom: unknown
          hero_media_id: string | null
          id: string
          is_secret: boolean
          kind: Database["public"]["Enums"]["place_kind"]
          lat: number | null
          lng: number | null
          name: string
          permit_note: string | null
          published_at: string | null
          region_id: string | null
          scheduled_for: string | null
          search_vector: unknown
          seo: Json
          slug: string
          status: Database["public"]["Enums"]["publish_status"]
          tribe_id: string | null
          updated_at: string
        }
        Insert: {
          body?: Json | null
          created_at?: string
          deleted_at?: string | null
          elevation_m?: number | null
          entry_no?: number | null
          exclusivity_tier?: number
          geom?: unknown
          hero_media_id?: string | null
          id?: string
          is_secret?: boolean
          kind?: Database["public"]["Enums"]["place_kind"]
          lat?: number | null
          lng?: number | null
          name: string
          permit_note?: string | null
          published_at?: string | null
          region_id?: string | null
          scheduled_for?: string | null
          search_vector?: unknown
          seo?: Json
          slug: string
          status?: Database["public"]["Enums"]["publish_status"]
          tribe_id?: string | null
          updated_at?: string
        }
        Update: {
          body?: Json | null
          created_at?: string
          deleted_at?: string | null
          elevation_m?: number | null
          entry_no?: number | null
          exclusivity_tier?: number
          geom?: unknown
          hero_media_id?: string | null
          id?: string
          is_secret?: boolean
          kind?: Database["public"]["Enums"]["place_kind"]
          lat?: number | null
          lng?: number | null
          name?: string
          permit_note?: string | null
          published_at?: string | null
          region_id?: string | null
          scheduled_for?: string | null
          search_vector?: unknown
          seo?: Json
          slug?: string
          status?: Database["public"]["Enums"]["publish_status"]
          tribe_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "places_hero_media_id_fkey"
            columns: ["hero_media_id"]
            isOneToOne: false
            referencedRelation: "media"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "places_region_id_fkey"
            columns: ["region_id"]
            isOneToOne: false
            referencedRelation: "regions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "places_tribe_id_fkey"
            columns: ["tribe_id"]
            isOneToOne: false
            referencedRelation: "tribes"
            referencedColumns: ["id"]
          },
        ]
      }
      redirects: {
        Row: {
          created_at: string
          entity_id: string | null
          entity_type: string | null
          from_path: string
          id: string
          status_code: number
          to_path: string
        }
        Insert: {
          created_at?: string
          entity_id?: string | null
          entity_type?: string | null
          from_path: string
          id?: string
          status_code?: number
          to_path: string
        }
        Update: {
          created_at?: string
          entity_id?: string | null
          entity_type?: string | null
          from_path?: string
          id?: string
          status_code?: number
          to_path?: string
        }
        Relationships: []
      }
      regions: {
        Row: {
          body: Json | null
          created_at: string
          deleted_at: string | null
          geom: unknown
          hero_media_id: string | null
          id: string
          level: string
          name: string
          parent_id: string | null
          published_at: string | null
          scheduled_for: string | null
          search_vector: unknown
          seo: Json
          slug: string
          status: Database["public"]["Enums"]["publish_status"]
          updated_at: string
        }
        Insert: {
          body?: Json | null
          created_at?: string
          deleted_at?: string | null
          geom?: unknown
          hero_media_id?: string | null
          id?: string
          level?: string
          name: string
          parent_id?: string | null
          published_at?: string | null
          scheduled_for?: string | null
          search_vector?: unknown
          seo?: Json
          slug: string
          status?: Database["public"]["Enums"]["publish_status"]
          updated_at?: string
        }
        Update: {
          body?: Json | null
          created_at?: string
          deleted_at?: string | null
          geom?: unknown
          hero_media_id?: string | null
          id?: string
          level?: string
          name?: string
          parent_id?: string | null
          published_at?: string | null
          scheduled_for?: string | null
          search_vector?: unknown
          seo?: Json
          slug?: string
          status?: Database["public"]["Enums"]["publish_status"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "regions_hero_media_id_fkey"
            columns: ["hero_media_id"]
            isOneToOne: false
            referencedRelation: "media"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "regions_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "regions"
            referencedColumns: ["id"]
          },
        ]
      }
      reviews: {
        Row: {
          author: Json
          content: string
          created_at: string
          id: string
          rating: Json
          source: string
          status: Database["public"]["Enums"]["review_status"]
          tour_id: string
          trip: Json
          updated_at: string
        }
        Insert: {
          author?: Json
          content: string
          created_at?: string
          id?: string
          rating?: Json
          source?: string
          status?: Database["public"]["Enums"]["review_status"]
          tour_id: string
          trip?: Json
          updated_at?: string
        }
        Update: {
          author?: Json
          content?: string
          created_at?: string
          id?: string
          rating?: Json
          source?: string
          status?: Database["public"]["Enums"]["review_status"]
          tour_id?: string
          trip?: Json
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "reviews_tour_id_fkey"
            columns: ["tour_id"]
            isOneToOne: false
            referencedRelation: "tours"
            referencedColumns: ["id"]
          },
        ]
      }
      rides: {
        Row: {
          base_place_id: string | null
          body: Json | null
          capacity: number | null
          created_at: string
          deleted_at: string | null
          hero_media_id: string | null
          id: string
          name: string
          price_band: string | null
          published_at: string | null
          scheduled_for: string | null
          seo: Json
          slug: string
          status: Database["public"]["Enums"]["publish_status"]
          type: string
          updated_at: string
        }
        Insert: {
          base_place_id?: string | null
          body?: Json | null
          capacity?: number | null
          created_at?: string
          deleted_at?: string | null
          hero_media_id?: string | null
          id?: string
          name: string
          price_band?: string | null
          published_at?: string | null
          scheduled_for?: string | null
          seo?: Json
          slug: string
          status?: Database["public"]["Enums"]["publish_status"]
          type?: string
          updated_at?: string
        }
        Update: {
          base_place_id?: string | null
          body?: Json | null
          capacity?: number | null
          created_at?: string
          deleted_at?: string | null
          hero_media_id?: string | null
          id?: string
          name?: string
          price_band?: string | null
          published_at?: string | null
          scheduled_for?: string | null
          seo?: Json
          slug?: string
          status?: Database["public"]["Enums"]["publish_status"]
          type?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "rides_base_place_id_fkey"
            columns: ["base_place_id"]
            isOneToOne: false
            referencedRelation: "places"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rides_hero_media_id_fkey"
            columns: ["hero_media_id"]
            isOneToOne: false
            referencedRelation: "media"
            referencedColumns: ["id"]
          },
        ]
      }
      role_permissions: {
        Row: {
          id: number
          permission: Database["public"]["Enums"]["app_permission"]
          role: Database["public"]["Enums"]["app_role"]
        }
        Insert: {
          id?: number
          permission: Database["public"]["Enums"]["app_permission"]
          role: Database["public"]["Enums"]["app_role"]
        }
        Update: {
          id?: number
          permission?: Database["public"]["Enums"]["app_permission"]
          role?: Database["public"]["Enums"]["app_role"]
        }
        Relationships: []
      }
      spatial_ref_sys: {
        Row: {
          auth_name: string | null
          auth_srid: number | null
          proj4text: string | null
          srid: number
          srtext: string | null
        }
        Insert: {
          auth_name?: string | null
          auth_srid?: number | null
          proj4text?: string | null
          srid: number
          srtext?: string | null
        }
        Update: {
          auth_name?: string | null
          auth_srid?: number | null
          proj4text?: string | null
          srid?: number
          srtext?: string | null
        }
        Relationships: []
      }
      stays: {
        Row: {
          body: Json | null
          capacity: number | null
          created_at: string
          deleted_at: string | null
          facilities: string[]
          geom: unknown
          hero_media_id: string | null
          host_id: string | null
          id: string
          name: string
          place_id: string | null
          price_band: string | null
          published_at: string | null
          rooms_note: string | null
          scheduled_for: string | null
          seo: Json
          slug: string
          status: Database["public"]["Enums"]["publish_status"]
          type: Database["public"]["Enums"]["stay_type"]
          updated_at: string
        }
        Insert: {
          body?: Json | null
          capacity?: number | null
          created_at?: string
          deleted_at?: string | null
          facilities?: string[]
          geom?: unknown
          hero_media_id?: string | null
          host_id?: string | null
          id?: string
          name: string
          place_id?: string | null
          price_band?: string | null
          published_at?: string | null
          rooms_note?: string | null
          scheduled_for?: string | null
          seo?: Json
          slug: string
          status?: Database["public"]["Enums"]["publish_status"]
          type?: Database["public"]["Enums"]["stay_type"]
          updated_at?: string
        }
        Update: {
          body?: Json | null
          capacity?: number | null
          created_at?: string
          deleted_at?: string | null
          facilities?: string[]
          geom?: unknown
          hero_media_id?: string | null
          host_id?: string | null
          id?: string
          name?: string
          place_id?: string | null
          price_band?: string | null
          published_at?: string | null
          rooms_note?: string | null
          scheduled_for?: string | null
          seo?: Json
          slug?: string
          status?: Database["public"]["Enums"]["publish_status"]
          type?: Database["public"]["Enums"]["stay_type"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "stays_hero_media_id_fkey"
            columns: ["hero_media_id"]
            isOneToOne: false
            referencedRelation: "media"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "stays_host_id_fkey"
            columns: ["host_id"]
            isOneToOne: false
            referencedRelation: "partners"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "stays_place_id_fkey"
            columns: ["place_id"]
            isOneToOne: false
            referencedRelation: "places"
            referencedColumns: ["id"]
          },
        ]
      }
      stories: {
        Row: {
          author: Json
          body: Json | null
          created_at: string
          deleted_at: string | null
          hero_media_id: string | null
          id: string
          mentions: Json
          published_at: string | null
          scheduled_for: string | null
          seo: Json
          slug: string
          status: Database["public"]["Enums"]["publish_status"]
          title: string
          updated_at: string
        }
        Insert: {
          author?: Json
          body?: Json | null
          created_at?: string
          deleted_at?: string | null
          hero_media_id?: string | null
          id?: string
          mentions?: Json
          published_at?: string | null
          scheduled_for?: string | null
          seo?: Json
          slug: string
          status?: Database["public"]["Enums"]["publish_status"]
          title: string
          updated_at?: string
        }
        Update: {
          author?: Json
          body?: Json | null
          created_at?: string
          deleted_at?: string | null
          hero_media_id?: string | null
          id?: string
          mentions?: Json
          published_at?: string | null
          scheduled_for?: string | null
          seo?: Json
          slug?: string
          status?: Database["public"]["Enums"]["publish_status"]
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "stories_hero_media_id_fkey"
            columns: ["hero_media_id"]
            isOneToOne: false
            referencedRelation: "media"
            referencedColumns: ["id"]
          },
        ]
      }
      tour_days: {
        Row: {
          body: Json | null
          created_at: string
          day_no: number
          id: string
          place_ids: string[]
          title: string | null
          tour_id: string
          updated_at: string
        }
        Insert: {
          body?: Json | null
          created_at?: string
          day_no: number
          id?: string
          place_ids?: string[]
          title?: string | null
          tour_id: string
          updated_at?: string
        }
        Update: {
          body?: Json | null
          created_at?: string
          day_no?: number
          id?: string
          place_ids?: string[]
          title?: string | null
          tour_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "tour_days_tour_id_fkey"
            columns: ["tour_id"]
            isOneToOne: false
            referencedRelation: "tours"
            referencedColumns: ["id"]
          },
        ]
      }
      tour_places: {
        Row: {
          place_id: string
          role: string
          sort: number
          tour_id: string
        }
        Insert: {
          place_id: string
          role?: string
          sort?: number
          tour_id: string
        }
        Update: {
          place_id?: string
          role?: string
          sort?: number
          tour_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "tour_places_place_id_fkey"
            columns: ["place_id"]
            isOneToOne: false
            referencedRelation: "places"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tour_places_tour_id_fkey"
            columns: ["tour_id"]
            isOneToOne: false
            referencedRelation: "tours"
            referencedColumns: ["id"]
          },
        ]
      }
      tours: {
        Row: {
          altitude_max_m: number | null
          best_time: string | null
          body: Json | null
          created_at: string
          deleted_at: string | null
          difficulty: Database["public"]["Enums"]["tour_difficulty"]
          duration_days: number | null
          ends_at_place_id: string | null
          featured: boolean
          festival_id: string | null
          format: Database["public"]["Enums"]["tour_format"]
          hero_media_id: string | null
          id: string
          max_group_size: number | null
          nights: number | null
          price_inr: number | null
          pricing: Json
          published_at: string | null
          region_id: string | null
          route: Json
          scheduled_for: string | null
          search_vector: unknown
          seo: Json
          slug: string
          starts_from_place_id: string | null
          status: Database["public"]["Enums"]["publish_status"]
          subtitle: string | null
          title: string
          trending: boolean
          type: Database["public"]["Enums"]["tour_type"]
          updated_at: string
        }
        Insert: {
          altitude_max_m?: number | null
          best_time?: string | null
          body?: Json | null
          created_at?: string
          deleted_at?: string | null
          difficulty?: Database["public"]["Enums"]["tour_difficulty"]
          duration_days?: number | null
          ends_at_place_id?: string | null
          featured?: boolean
          festival_id?: string | null
          format?: Database["public"]["Enums"]["tour_format"]
          hero_media_id?: string | null
          id?: string
          max_group_size?: number | null
          nights?: number | null
          price_inr?: number | null
          pricing?: Json
          published_at?: string | null
          region_id?: string | null
          route?: Json
          scheduled_for?: string | null
          search_vector?: unknown
          seo?: Json
          slug: string
          starts_from_place_id?: string | null
          status?: Database["public"]["Enums"]["publish_status"]
          subtitle?: string | null
          title: string
          trending?: boolean
          type?: Database["public"]["Enums"]["tour_type"]
          updated_at?: string
        }
        Update: {
          altitude_max_m?: number | null
          best_time?: string | null
          body?: Json | null
          created_at?: string
          deleted_at?: string | null
          difficulty?: Database["public"]["Enums"]["tour_difficulty"]
          duration_days?: number | null
          ends_at_place_id?: string | null
          featured?: boolean
          festival_id?: string | null
          format?: Database["public"]["Enums"]["tour_format"]
          hero_media_id?: string | null
          id?: string
          max_group_size?: number | null
          nights?: number | null
          price_inr?: number | null
          pricing?: Json
          published_at?: string | null
          region_id?: string | null
          route?: Json
          scheduled_for?: string | null
          search_vector?: unknown
          seo?: Json
          slug?: string
          starts_from_place_id?: string | null
          status?: Database["public"]["Enums"]["publish_status"]
          subtitle?: string | null
          title?: string
          trending?: boolean
          type?: Database["public"]["Enums"]["tour_type"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "tours_ends_at_place_id_fkey"
            columns: ["ends_at_place_id"]
            isOneToOne: false
            referencedRelation: "places"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tours_festival_id_fkey"
            columns: ["festival_id"]
            isOneToOne: false
            referencedRelation: "festivals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tours_hero_media_id_fkey"
            columns: ["hero_media_id"]
            isOneToOne: false
            referencedRelation: "media"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tours_region_id_fkey"
            columns: ["region_id"]
            isOneToOne: false
            referencedRelation: "regions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tours_starts_from_place_id_fkey"
            columns: ["starts_from_place_id"]
            isOneToOne: false
            referencedRelation: "places"
            referencedColumns: ["id"]
          },
        ]
      }
      tribes: {
        Row: {
          body: Json | null
          created_at: string
          deleted_at: string | null
          hero_media_id: string | null
          id: string
          name: string
          published_at: string | null
          region_ids: string[]
          scheduled_for: string | null
          seo: Json
          slug: string
          status: Database["public"]["Enums"]["publish_status"]
          updated_at: string
        }
        Insert: {
          body?: Json | null
          created_at?: string
          deleted_at?: string | null
          hero_media_id?: string | null
          id?: string
          name: string
          published_at?: string | null
          region_ids?: string[]
          scheduled_for?: string | null
          seo?: Json
          slug: string
          status?: Database["public"]["Enums"]["publish_status"]
          updated_at?: string
        }
        Update: {
          body?: Json | null
          created_at?: string
          deleted_at?: string | null
          hero_media_id?: string | null
          id?: string
          name?: string
          published_at?: string | null
          region_ids?: string[]
          scheduled_for?: string | null
          seo?: Json
          slug?: string
          status?: Database["public"]["Enums"]["publish_status"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "tribes_hero_media_id_fkey"
            columns: ["hero_media_id"]
            isOneToOne: false
            referencedRelation: "media"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          id: number
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: number
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: number
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      geography_columns: {
        Row: {
          coord_dimension: number | null
          f_geography_column: unknown
          f_table_catalog: unknown
          f_table_name: unknown
          f_table_schema: unknown
          srid: number | null
          type: string | null
        }
        Relationships: []
      }
      geometry_columns: {
        Row: {
          coord_dimension: number | null
          f_geometry_column: unknown
          f_table_catalog: string | null
          f_table_name: unknown
          f_table_schema: unknown
          srid: number | null
          type: string | null
        }
        Insert: {
          coord_dimension?: number | null
          f_geometry_column?: unknown
          f_table_catalog?: string | null
          f_table_name?: unknown
          f_table_schema?: unknown
          srid?: number | null
          type?: string | null
        }
        Update: {
          coord_dimension?: number | null
          f_geometry_column?: unknown
          f_table_catalog?: string | null
          f_table_name?: unknown
          f_table_schema?: unknown
          srid?: number | null
          type?: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      _postgis_deprecate: {
        Args: { newname: string; oldname: string; version: string }
        Returns: undefined
      }
      _postgis_index_extent: {
        Args: { col: string; tbl: unknown }
        Returns: unknown
      }
      _postgis_pgsql_version: { Args: never; Returns: string }
      _postgis_scripts_pgsql_version: { Args: never; Returns: string }
      _postgis_selectivity: {
        Args: { att_name: string; geom: unknown; mode?: string; tbl: unknown }
        Returns: number
      }
      _postgis_stats: {
        Args: { ""?: string; att_name: string; tbl: unknown }
        Returns: string
      }
      _st_3dintersects: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      _st_contains: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      _st_containsproperly: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      _st_coveredby:
        | { Args: { geog1: unknown; geog2: unknown }; Returns: boolean }
        | { Args: { geom1: unknown; geom2: unknown }; Returns: boolean }
      _st_covers:
        | { Args: { geog1: unknown; geog2: unknown }; Returns: boolean }
        | { Args: { geom1: unknown; geom2: unknown }; Returns: boolean }
      _st_crosses: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      _st_dwithin: {
        Args: {
          geog1: unknown
          geog2: unknown
          tolerance: number
          use_spheroid?: boolean
        }
        Returns: boolean
      }
      _st_equals: { Args: { geom1: unknown; geom2: unknown }; Returns: boolean }
      _st_intersects: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      _st_linecrossingdirection: {
        Args: { line1: unknown; line2: unknown }
        Returns: number
      }
      _st_longestline: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      _st_maxdistance: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: number
      }
      _st_orderingequals: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      _st_overlaps: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      _st_sortablehash: { Args: { geom: unknown }; Returns: number }
      _st_touches: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      _st_voronoi: {
        Args: {
          clip?: unknown
          g1: unknown
          return_polygons?: boolean
          tolerance?: number
        }
        Returns: unknown
      }
      _st_within: { Args: { geom1: unknown; geom2: unknown }; Returns: boolean }
      addauth: { Args: { "": string }; Returns: boolean }
      addgeometrycolumn:
        | {
            Args: {
              catalog_name: string
              column_name: string
              new_dim: number
              new_srid_in: number
              new_type: string
              schema_name: string
              table_name: string
              use_typmod?: boolean
            }
            Returns: string
          }
        | {
            Args: {
              column_name: string
              new_dim: number
              new_srid: number
              new_type: string
              schema_name: string
              table_name: string
              use_typmod?: boolean
            }
            Returns: string
          }
        | {
            Args: {
              column_name: string
              new_dim: number
              new_srid: number
              new_type: string
              table_name: string
              use_typmod?: boolean
            }
            Returns: string
          }
      authorize: {
        Args: {
          requested_permission: Database["public"]["Enums"]["app_permission"]
        }
        Returns: boolean
      }
      custom_access_token_hook: { Args: { event: Json }; Returns: Json }
      disablelongtransactions: { Args: never; Returns: string }
      dropgeometrycolumn:
        | {
            Args: {
              catalog_name: string
              column_name: string
              schema_name: string
              table_name: string
            }
            Returns: string
          }
        | {
            Args: {
              column_name: string
              schema_name: string
              table_name: string
            }
            Returns: string
          }
        | { Args: { column_name: string; table_name: string }; Returns: string }
      dropgeometrytable:
        | {
            Args: {
              catalog_name: string
              schema_name: string
              table_name: string
            }
            Returns: string
          }
        | { Args: { schema_name: string; table_name: string }; Returns: string }
        | { Args: { table_name: string }; Returns: string }
      enablelongtransactions: { Args: never; Returns: string }
      equals: { Args: { geom1: unknown; geom2: unknown }; Returns: boolean }
      geometry: { Args: { "": string }; Returns: unknown }
      geometry_above: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_below: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_cmp: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: number
      }
      geometry_contained_3d: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_contains: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_contains_3d: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_distance_box: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: number
      }
      geometry_distance_centroid: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: number
      }
      geometry_eq: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_ge: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_gt: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_le: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_left: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_lt: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_overabove: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_overbelow: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_overlaps: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_overlaps_3d: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_overleft: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_overright: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_right: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_same: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_same_3d: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_within: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geomfromewkt: { Args: { "": string }; Returns: unknown }
      gettransactionid: { Args: never; Returns: unknown }
      longtransactionsenabled: { Args: never; Returns: boolean }
      populate_geometry_columns:
        | { Args: { tbl_oid: unknown; use_typmod?: boolean }; Returns: number }
        | { Args: { use_typmod?: boolean }; Returns: string }
      postgis_constraint_dims: {
        Args: { geomcolumn: string; geomschema: string; geomtable: string }
        Returns: number
      }
      postgis_constraint_srid: {
        Args: { geomcolumn: string; geomschema: string; geomtable: string }
        Returns: number
      }
      postgis_constraint_type: {
        Args: { geomcolumn: string; geomschema: string; geomtable: string }
        Returns: string
      }
      postgis_extensions_upgrade: { Args: never; Returns: string }
      postgis_full_version: { Args: never; Returns: string }
      postgis_geos_version: { Args: never; Returns: string }
      postgis_lib_build_date: { Args: never; Returns: string }
      postgis_lib_revision: { Args: never; Returns: string }
      postgis_lib_version: { Args: never; Returns: string }
      postgis_libjson_version: { Args: never; Returns: string }
      postgis_liblwgeom_version: { Args: never; Returns: string }
      postgis_libprotobuf_version: { Args: never; Returns: string }
      postgis_libxml_version: { Args: never; Returns: string }
      postgis_proj_version: { Args: never; Returns: string }
      postgis_scripts_build_date: { Args: never; Returns: string }
      postgis_scripts_installed: { Args: never; Returns: string }
      postgis_scripts_released: { Args: never; Returns: string }
      postgis_svn_version: { Args: never; Returns: string }
      postgis_type_name: {
        Args: {
          coord_dimension: number
          geomname: string
          use_new_name?: boolean
        }
        Returns: string
      }
      postgis_version: { Args: never; Returns: string }
      postgis_wagyu_version: { Args: never; Returns: string }
      st_3dclosestpoint: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_3ddistance: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: number
      }
      st_3dintersects: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      st_3dlongestline: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_3dmakebox: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_3dmaxdistance: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: number
      }
      st_3dshortestline: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_addpoint: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_angle:
        | { Args: { line1: unknown; line2: unknown }; Returns: number }
        | {
            Args: { pt1: unknown; pt2: unknown; pt3: unknown; pt4?: unknown }
            Returns: number
          }
      st_area:
        | { Args: { geog: unknown; use_spheroid?: boolean }; Returns: number }
        | { Args: { "": string }; Returns: number }
      st_asencodedpolyline: {
        Args: { geom: unknown; nprecision?: number }
        Returns: string
      }
      st_asewkt: { Args: { "": string }; Returns: string }
      st_asgeojson:
        | {
            Args: { geog: unknown; maxdecimaldigits?: number; options?: number }
            Returns: string
          }
        | {
            Args: { geom: unknown; maxdecimaldigits?: number; options?: number }
            Returns: string
          }
        | {
            Args: {
              geom_column?: string
              maxdecimaldigits?: number
              pretty_bool?: boolean
              r: Record<string, unknown>
            }
            Returns: string
          }
        | { Args: { "": string }; Returns: string }
      st_asgml:
        | {
            Args: {
              geog: unknown
              id?: string
              maxdecimaldigits?: number
              nprefix?: string
              options?: number
            }
            Returns: string
          }
        | {
            Args: { geom: unknown; maxdecimaldigits?: number; options?: number }
            Returns: string
          }
        | { Args: { "": string }; Returns: string }
        | {
            Args: {
              geog: unknown
              id?: string
              maxdecimaldigits?: number
              nprefix?: string
              options?: number
              version: number
            }
            Returns: string
          }
        | {
            Args: {
              geom: unknown
              id?: string
              maxdecimaldigits?: number
              nprefix?: string
              options?: number
              version: number
            }
            Returns: string
          }
      st_askml:
        | {
            Args: { geog: unknown; maxdecimaldigits?: number; nprefix?: string }
            Returns: string
          }
        | {
            Args: { geom: unknown; maxdecimaldigits?: number; nprefix?: string }
            Returns: string
          }
        | { Args: { "": string }; Returns: string }
      st_aslatlontext: {
        Args: { geom: unknown; tmpl?: string }
        Returns: string
      }
      st_asmarc21: { Args: { format?: string; geom: unknown }; Returns: string }
      st_asmvtgeom: {
        Args: {
          bounds: unknown
          buffer?: number
          clip_geom?: boolean
          extent?: number
          geom: unknown
        }
        Returns: unknown
      }
      st_assvg:
        | {
            Args: { geog: unknown; maxdecimaldigits?: number; rel?: number }
            Returns: string
          }
        | {
            Args: { geom: unknown; maxdecimaldigits?: number; rel?: number }
            Returns: string
          }
        | { Args: { "": string }; Returns: string }
      st_astext: { Args: { "": string }; Returns: string }
      st_astwkb:
        | {
            Args: {
              geom: unknown
              prec?: number
              prec_m?: number
              prec_z?: number
              with_boxes?: boolean
              with_sizes?: boolean
            }
            Returns: string
          }
        | {
            Args: {
              geom: unknown[]
              ids: number[]
              prec?: number
              prec_m?: number
              prec_z?: number
              with_boxes?: boolean
              with_sizes?: boolean
            }
            Returns: string
          }
      st_asx3d: {
        Args: { geom: unknown; maxdecimaldigits?: number; options?: number }
        Returns: string
      }
      st_azimuth:
        | { Args: { geog1: unknown; geog2: unknown }; Returns: number }
        | { Args: { geom1: unknown; geom2: unknown }; Returns: number }
      st_boundingdiagonal: {
        Args: { fits?: boolean; geom: unknown }
        Returns: unknown
      }
      st_buffer:
        | {
            Args: { geom: unknown; options?: string; radius: number }
            Returns: unknown
          }
        | {
            Args: { geom: unknown; quadsegs: number; radius: number }
            Returns: unknown
          }
      st_centroid: { Args: { "": string }; Returns: unknown }
      st_clipbybox2d: {
        Args: { box: unknown; geom: unknown }
        Returns: unknown
      }
      st_closestpoint: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_collect: { Args: { geom1: unknown; geom2: unknown }; Returns: unknown }
      st_concavehull: {
        Args: {
          param_allow_holes?: boolean
          param_geom: unknown
          param_pctconvex: number
        }
        Returns: unknown
      }
      st_contains: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      st_containsproperly: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      st_coorddim: { Args: { geometry: unknown }; Returns: number }
      st_coveredby:
        | { Args: { geog1: unknown; geog2: unknown }; Returns: boolean }
        | { Args: { geom1: unknown; geom2: unknown }; Returns: boolean }
      st_covers:
        | { Args: { geog1: unknown; geog2: unknown }; Returns: boolean }
        | { Args: { geom1: unknown; geom2: unknown }; Returns: boolean }
      st_crosses: { Args: { geom1: unknown; geom2: unknown }; Returns: boolean }
      st_curvetoline: {
        Args: { flags?: number; geom: unknown; tol?: number; toltype?: number }
        Returns: unknown
      }
      st_delaunaytriangles: {
        Args: { flags?: number; g1: unknown; tolerance?: number }
        Returns: unknown
      }
      st_difference: {
        Args: { geom1: unknown; geom2: unknown; gridsize?: number }
        Returns: unknown
      }
      st_disjoint: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      st_distance:
        | {
            Args: { geog1: unknown; geog2: unknown; use_spheroid?: boolean }
            Returns: number
          }
        | { Args: { geom1: unknown; geom2: unknown }; Returns: number }
      st_distancesphere:
        | { Args: { geom1: unknown; geom2: unknown }; Returns: number }
        | {
            Args: { geom1: unknown; geom2: unknown; radius: number }
            Returns: number
          }
      st_distancespheroid: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: number
      }
      st_dwithin: {
        Args: {
          geog1: unknown
          geog2: unknown
          tolerance: number
          use_spheroid?: boolean
        }
        Returns: boolean
      }
      st_equals: { Args: { geom1: unknown; geom2: unknown }; Returns: boolean }
      st_expand:
        | { Args: { box: unknown; dx: number; dy: number }; Returns: unknown }
        | {
            Args: { box: unknown; dx: number; dy: number; dz?: number }
            Returns: unknown
          }
        | {
            Args: {
              dm?: number
              dx: number
              dy: number
              dz?: number
              geom: unknown
            }
            Returns: unknown
          }
      st_force3d: { Args: { geom: unknown; zvalue?: number }; Returns: unknown }
      st_force3dm: {
        Args: { geom: unknown; mvalue?: number }
        Returns: unknown
      }
      st_force3dz: {
        Args: { geom: unknown; zvalue?: number }
        Returns: unknown
      }
      st_force4d: {
        Args: { geom: unknown; mvalue?: number; zvalue?: number }
        Returns: unknown
      }
      st_generatepoints:
        | { Args: { area: unknown; npoints: number }; Returns: unknown }
        | {
            Args: { area: unknown; npoints: number; seed: number }
            Returns: unknown
          }
      st_geogfromtext: { Args: { "": string }; Returns: unknown }
      st_geographyfromtext: { Args: { "": string }; Returns: unknown }
      st_geohash:
        | { Args: { geog: unknown; maxchars?: number }; Returns: string }
        | { Args: { geom: unknown; maxchars?: number }; Returns: string }
      st_geomcollfromtext: { Args: { "": string }; Returns: unknown }
      st_geometricmedian: {
        Args: {
          fail_if_not_converged?: boolean
          g: unknown
          max_iter?: number
          tolerance?: number
        }
        Returns: unknown
      }
      st_geometryfromtext: { Args: { "": string }; Returns: unknown }
      st_geomfromewkt: { Args: { "": string }; Returns: unknown }
      st_geomfromgeojson:
        | { Args: { "": Json }; Returns: unknown }
        | { Args: { "": Json }; Returns: unknown }
        | { Args: { "": string }; Returns: unknown }
      st_geomfromgml: { Args: { "": string }; Returns: unknown }
      st_geomfromkml: { Args: { "": string }; Returns: unknown }
      st_geomfrommarc21: { Args: { marc21xml: string }; Returns: unknown }
      st_geomfromtext: { Args: { "": string }; Returns: unknown }
      st_gmltosql: { Args: { "": string }; Returns: unknown }
      st_hasarc: { Args: { geometry: unknown }; Returns: boolean }
      st_hausdorffdistance: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: number
      }
      st_hexagon: {
        Args: { cell_i: number; cell_j: number; origin?: unknown; size: number }
        Returns: unknown
      }
      st_hexagongrid: {
        Args: { bounds: unknown; size: number }
        Returns: Record<string, unknown>[]
      }
      st_interpolatepoint: {
        Args: { line: unknown; point: unknown }
        Returns: number
      }
      st_intersection: {
        Args: { geom1: unknown; geom2: unknown; gridsize?: number }
        Returns: unknown
      }
      st_intersects:
        | { Args: { geog1: unknown; geog2: unknown }; Returns: boolean }
        | { Args: { geom1: unknown; geom2: unknown }; Returns: boolean }
      st_isvaliddetail: {
        Args: { flags?: number; geom: unknown }
        Returns: Database["public"]["CompositeTypes"]["valid_detail"]
        SetofOptions: {
          from: "*"
          to: "valid_detail"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      st_length:
        | { Args: { geog: unknown; use_spheroid?: boolean }; Returns: number }
        | { Args: { "": string }; Returns: number }
      st_letters: { Args: { font?: Json; letters: string }; Returns: unknown }
      st_linecrossingdirection: {
        Args: { line1: unknown; line2: unknown }
        Returns: number
      }
      st_linefromencodedpolyline: {
        Args: { nprecision?: number; txtin: string }
        Returns: unknown
      }
      st_linefromtext: { Args: { "": string }; Returns: unknown }
      st_linelocatepoint: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: number
      }
      st_linetocurve: { Args: { geometry: unknown }; Returns: unknown }
      st_locatealong: {
        Args: { geometry: unknown; leftrightoffset?: number; measure: number }
        Returns: unknown
      }
      st_locatebetween: {
        Args: {
          frommeasure: number
          geometry: unknown
          leftrightoffset?: number
          tomeasure: number
        }
        Returns: unknown
      }
      st_locatebetweenelevations: {
        Args: { fromelevation: number; geometry: unknown; toelevation: number }
        Returns: unknown
      }
      st_longestline: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_makebox2d: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_makeline: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_makevalid: {
        Args: { geom: unknown; params: string }
        Returns: unknown
      }
      st_maxdistance: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: number
      }
      st_minimumboundingcircle: {
        Args: { inputgeom: unknown; segs_per_quarter?: number }
        Returns: unknown
      }
      st_mlinefromtext: { Args: { "": string }; Returns: unknown }
      st_mpointfromtext: { Args: { "": string }; Returns: unknown }
      st_mpolyfromtext: { Args: { "": string }; Returns: unknown }
      st_multilinestringfromtext: { Args: { "": string }; Returns: unknown }
      st_multipointfromtext: { Args: { "": string }; Returns: unknown }
      st_multipolygonfromtext: { Args: { "": string }; Returns: unknown }
      st_node: { Args: { g: unknown }; Returns: unknown }
      st_normalize: { Args: { geom: unknown }; Returns: unknown }
      st_offsetcurve: {
        Args: { distance: number; line: unknown; params?: string }
        Returns: unknown
      }
      st_orderingequals: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      st_overlaps: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      st_perimeter: {
        Args: { geog: unknown; use_spheroid?: boolean }
        Returns: number
      }
      st_pointfromtext: { Args: { "": string }; Returns: unknown }
      st_pointm: {
        Args: {
          mcoordinate: number
          srid?: number
          xcoordinate: number
          ycoordinate: number
        }
        Returns: unknown
      }
      st_pointz: {
        Args: {
          srid?: number
          xcoordinate: number
          ycoordinate: number
          zcoordinate: number
        }
        Returns: unknown
      }
      st_pointzm: {
        Args: {
          mcoordinate: number
          srid?: number
          xcoordinate: number
          ycoordinate: number
          zcoordinate: number
        }
        Returns: unknown
      }
      st_polyfromtext: { Args: { "": string }; Returns: unknown }
      st_polygonfromtext: { Args: { "": string }; Returns: unknown }
      st_project: {
        Args: { azimuth: number; distance: number; geog: unknown }
        Returns: unknown
      }
      st_quantizecoordinates: {
        Args: {
          g: unknown
          prec_m?: number
          prec_x: number
          prec_y?: number
          prec_z?: number
        }
        Returns: unknown
      }
      st_reduceprecision: {
        Args: { geom: unknown; gridsize: number }
        Returns: unknown
      }
      st_relate: { Args: { geom1: unknown; geom2: unknown }; Returns: string }
      st_removerepeatedpoints: {
        Args: { geom: unknown; tolerance?: number }
        Returns: unknown
      }
      st_segmentize: {
        Args: { geog: unknown; max_segment_length: number }
        Returns: unknown
      }
      st_setsrid:
        | { Args: { geog: unknown; srid: number }; Returns: unknown }
        | { Args: { geom: unknown; srid: number }; Returns: unknown }
      st_sharedpaths: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_shortestline: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_simplifypolygonhull: {
        Args: { geom: unknown; is_outer?: boolean; vertex_fraction: number }
        Returns: unknown
      }
      st_split: { Args: { geom1: unknown; geom2: unknown }; Returns: unknown }
      st_square: {
        Args: { cell_i: number; cell_j: number; origin?: unknown; size: number }
        Returns: unknown
      }
      st_squaregrid: {
        Args: { bounds: unknown; size: number }
        Returns: Record<string, unknown>[]
      }
      st_srid:
        | { Args: { geog: unknown }; Returns: number }
        | { Args: { geom: unknown }; Returns: number }
      st_subdivide: {
        Args: { geom: unknown; gridsize?: number; maxvertices?: number }
        Returns: unknown[]
      }
      st_swapordinates: {
        Args: { geom: unknown; ords: unknown }
        Returns: unknown
      }
      st_symdifference: {
        Args: { geom1: unknown; geom2: unknown; gridsize?: number }
        Returns: unknown
      }
      st_symmetricdifference: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_tileenvelope: {
        Args: {
          bounds?: unknown
          margin?: number
          x: number
          y: number
          zoom: number
        }
        Returns: unknown
      }
      st_touches: { Args: { geom1: unknown; geom2: unknown }; Returns: boolean }
      st_transform:
        | {
            Args: { from_proj: string; geom: unknown; to_proj: string }
            Returns: unknown
          }
        | {
            Args: { from_proj: string; geom: unknown; to_srid: number }
            Returns: unknown
          }
        | { Args: { geom: unknown; to_proj: string }; Returns: unknown }
      st_triangulatepolygon: { Args: { g1: unknown }; Returns: unknown }
      st_union:
        | { Args: { geom1: unknown; geom2: unknown }; Returns: unknown }
        | {
            Args: { geom1: unknown; geom2: unknown; gridsize: number }
            Returns: unknown
          }
      st_voronoilines: {
        Args: { extend_to?: unknown; g1: unknown; tolerance?: number }
        Returns: unknown
      }
      st_voronoipolygons: {
        Args: { extend_to?: unknown; g1: unknown; tolerance?: number }
        Returns: unknown
      }
      st_within: { Args: { geom1: unknown; geom2: unknown }; Returns: boolean }
      st_wkbtosql: { Args: { wkb: string }; Returns: unknown }
      st_wkttosql: { Args: { "": string }; Returns: unknown }
      st_wrapx: {
        Args: { geom: unknown; move: number; wrap: number }
        Returns: unknown
      }
      unlockrows: { Args: { "": string }; Returns: number }
      updategeometrysrid: {
        Args: {
          catalogn_name: string
          column_name: string
          new_srid_in: number
          schema_name: string
          table_name: string
        }
        Returns: string
      }
    }
    Enums: {
      app_permission:
        | "content.read"
        | "content.write"
        | "content.publish"
        | "content.delete"
        | "media.manage"
        | "settings.manage"
        | "roles.manage"
      app_role: "owner" | "editor" | "contributor" | "scout"
      event_kind: "festival_edition" | "tour_departure"
      event_status:
        | "scheduled"
        | "open"
        | "limited"
        | "sold_out"
        | "completed"
        | "cancelled"
      experience_kind:
        | "homestay_life"
        | "craft"
        | "food"
        | "ritual"
        | "trek_day"
        | "sunrise"
        | "wildlife"
        | "other"
      partner_kind: "host" | "guide" | "scout" | "artisan"
      permit_type: "ILP" | "PAP" | "RAP" | "none"
      place_kind:
        | "village"
        | "town"
        | "lake"
        | "pass"
        | "peak"
        | "monastery"
        | "market"
        | "viewpoint"
        | "waterfall"
        | "other"
      publish_status: "draft" | "published" | "archived" | "scheduled"
      review_status: "pending" | "approved" | "rejected"
      stay_type: "homestay" | "camp" | "tent" | "hotel" | "guesthouse"
      tour_difficulty: "easy" | "moderate" | "challenging"
      tour_format:
        | "expedition"
        | "trek"
        | "road_trip"
        | "cultural"
        | "festival"
        | "wildlife"
        | "pilgrimage"
        | "bike"
        | "camping"
      tour_type:
        | "adventure"
        | "cultural"
        | "nature"
        | "pilgrimage"
        | "festival"
        | "trek"
    }
    CompositeTypes: {
      geometry_dump: {
        path: number[] | null
        geom: unknown
      }
      valid_detail: {
        valid: boolean | null
        reason: string | null
        location: unknown
      }
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
      app_permission: [
        "content.read",
        "content.write",
        "content.publish",
        "content.delete",
        "media.manage",
        "settings.manage",
        "roles.manage",
      ],
      app_role: ["owner", "editor", "contributor", "scout"],
      event_kind: ["festival_edition", "tour_departure"],
      event_status: [
        "scheduled",
        "open",
        "limited",
        "sold_out",
        "completed",
        "cancelled",
      ],
      experience_kind: [
        "homestay_life",
        "craft",
        "food",
        "ritual",
        "trek_day",
        "sunrise",
        "wildlife",
        "other",
      ],
      partner_kind: ["host", "guide", "scout", "artisan"],
      permit_type: ["ILP", "PAP", "RAP", "none"],
      place_kind: [
        "village",
        "town",
        "lake",
        "pass",
        "peak",
        "monastery",
        "market",
        "viewpoint",
        "waterfall",
        "other",
      ],
      publish_status: ["draft", "published", "archived", "scheduled"],
      review_status: ["pending", "approved", "rejected"],
      stay_type: ["homestay", "camp", "tent", "hotel", "guesthouse"],
      tour_difficulty: ["easy", "moderate", "challenging"],
      tour_format: [
        "expedition",
        "trek",
        "road_trip",
        "cultural",
        "festival",
        "wildlife",
        "pilgrimage",
        "bike",
        "camping",
      ],
      tour_type: [
        "adventure",
        "cultural",
        "nature",
        "pilgrimage",
        "festival",
        "trek",
      ],
    },
  },
} as const
