import { AlertTriangle, AlertCircle, Info } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ConflictItem } from '@/data/mockData';

interface ConflictBadgeProps {
  conflict: ConflictItem;
}

export function ConflictBadge({ conflict }: ConflictBadgeProps) {
  const severityConfig = {
    high: {
      icon: AlertTriangle,
      bgClass: 'bg-destructive/10',
      textClass: 'text-destructive',
      borderClass: 'border-destructive/20',
    },
    medium: {
      icon: AlertCircle,
      bgClass: 'bg-stability-medium/10',
      textClass: 'text-stability-medium',
      borderClass: 'border-stability-medium/20',
    },
    low: {
      icon: Info,
      bgClass: 'bg-primary/10',
      textClass: 'text-primary',
      borderClass: 'border-primary/20',
    },
  };

  const config = severityConfig[conflict.severity];
  const Icon = config.icon;

  return (
    <div
      className={cn(
        'flex items-start gap-2 p-2.5 rounded-lg border text-sm',
        config.bgClass,
        config.borderClass
      )}
    >
      <Icon className={cn('w-4 h-4 flex-shrink-0 mt-0.5', config.textClass)} />
      <span className={cn('font-medium', config.textClass)}>
        {conflict.description}
      </span>
    </div>
  );
}
