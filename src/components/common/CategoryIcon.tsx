import React from "react";
import type { LucideProps } from "lucide-react";
import {
  Briefcase,
  Target,
  Zap,
  Send,
  Users,
  Palette,
  Layers,
  Search,
  Building2,
  Rocket,
  Globe,
  MapPin,
  CreditCard,
} from "lucide-react";

interface CategoryIconProps extends LucideProps {
  category: string;
}

export const CategoryIcon: React.FC<CategoryIconProps> = ({
  category,
  size = 16,
  strokeWidth = 2,
  className = "",
  ...props
}) => {
  switch (category) {
    case "Freelance Platforms":
      return (
        <Briefcase
          size={size}
          strokeWidth={strokeWidth}
          className={className}
          {...props}
        />
      );
    case "Job Boards":
      return (
        <Target
          size={size}
          strokeWidth={strokeWidth}
          className={className}
          {...props}
        />
      );
    case "Aggregators & Search":
      return (
        <Search
          size={size}
          strokeWidth={strokeWidth}
          className={className}
          {...props}
        />
      );
    case "Company Research":
      return (
        <Building2
          size={size}
          strokeWidth={strokeWidth}
          className={className}
          {...props}
        />
      );
    case "Startup Jobs":
      return (
        <Rocket
          size={size}
          strokeWidth={strokeWidth}
          className={className}
          {...props}
        />
      );
    case "Remote Platforms":
    case "Remote Jobs":
      return (
        <Globe
          size={size}
          strokeWidth={strokeWidth}
          className={className}
          {...props}
        />
      );
    case "India Portals":
      return (
        <MapPin
          size={size}
          strokeWidth={strokeWidth}
          className={className}
          {...props}
        />
      );
    case "Paid Services":
      return (
        <CreditCard
          size={size}
          strokeWidth={strokeWidth}
          className={className}
          {...props}
        />
      );
    case "AI-Powered":
      return (
        <Zap
          size={size}
          strokeWidth={strokeWidth}
          className={className}
          {...props}
        />
      );
    case "Cold Outreach":
      return (
        <Send
          size={size}
          strokeWidth={strokeWidth}
          className={className}
          {...props}
        />
      );
    case "Networking":
      return (
        <Users
          size={size}
          strokeWidth={strokeWidth}
          className={className}
          {...props}
        />
      );
    case "Portfolio":
      return (
        <Palette
          size={size}
          strokeWidth={strokeWidth}
          className={className}
          {...props}
        />
      );
    case "All":
    default:
      return (
        <Layers
          size={size}
          strokeWidth={strokeWidth}
          className={className}
          {...props}
        />
      );
  }
};

export default CategoryIcon;
