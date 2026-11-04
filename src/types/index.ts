export type LoginType = "Google Login" | "Username Password" | "" | string;

export interface Tool {
  id: number;
  name: string;
  tagline: string;
  description: string;
  url: string;
  logo: string;
  category: string;
  tags: string[];
  pricing: string;
  rating: number;
  featured: boolean;
  badge: string;
  loginType?: LoginType;
  features?: string[];
}

export interface ToolsData {
  categories: string[];
  tools: Tool[];
}
