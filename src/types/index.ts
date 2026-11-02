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
  features?: string[];
}

export interface ToolsData {
  categories: string[];
  tools: Tool[];
}

