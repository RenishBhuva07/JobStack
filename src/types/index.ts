export type LoginType =
  | "Google Login"
  | "Username Password"
  | ""
  | string
  | string[]
  | null;

export interface RatingDetail {
  value: number;
  source?: string;
  reviews?: number;
  asOf?: string;
}

export interface Tool {
  id: string | number;
  name: string;
  aliases?: string[];
  tagline: string;
  description: string;
  url: string;
  logo?: string | null;
  category: string;
  regions?: string[];
  focus?: string[];
  audience?: string[];
  tags: string[];
  pricing: string;
  seekerCost?: string;
  loginType?: LoginType;
  badge?: string | null;
  featured: boolean;
  features?: string[];
  rating?: number | RatingDetail | null;
  status?: string;
  lastVerified?: string | null;
  confidence?: string;
  sourceUrls?: string[];
  notes?: string | null;
}

export interface ToolsData {
  schemaVersion?: number;
  generatedOn?: string;
  categories: string[];
  tools: Tool[];
}
