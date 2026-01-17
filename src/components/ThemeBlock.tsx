import { LucideIcon } from 'lucide-react';

interface ThemeBlockProps {
  icon: LucideIcon;
  title: string;
  description: string;
  colorClass?: string;
}

export function ThemeBlock({ icon: Icon, title, description, colorClass = 'bg-terracotta-light' }: ThemeBlockProps) {
  return (
    <div className={`${colorClass} rounded-xl p-6 text-center`}>
      <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-card flex items-center justify-center">
        <Icon className="w-6 h-6 text-primary" />
      </div>
      <h3 className="font-serif text-lg font-medium text-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
    </div>
  );
}
