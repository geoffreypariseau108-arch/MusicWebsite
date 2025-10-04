import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  product_type: 'single' | 'album' | 'merchandise';
  image_url: string;
  digital_file_url?: string;
  stock_quantity: number;
  created_at: string;
}

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  category: string;
  image_url?: string;
  author: string;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
