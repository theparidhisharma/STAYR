import { cn } from '@/lib/utils';
import { Shield, ShieldAlert, ShieldCheck } from 'lucide-react';

interface StabilityMeterProps {
  score: number;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export function StabilityMeter({ score, size = 'md', showLabel = true }: StabilityMeterProps) {
  const getStabilityLevel = (score: number) => {
    if (score >= 70) return { level: 'High', color: 'bg-stability-high', textColor: 'text-stability-high', Icon: ShieldCheck };
    if (score >= 45) return { level: 'Medium', color: 'bg-stability-medium', textColor: 'text-stability-medium', Icon: Shield };
    return { level: 'Low', color: 'bg-stability-low', textColor: 'text-stability-low', Icon: ShieldAlert };
  };

  const { level, color, textColor, Icon } = getStabilityLevel(score);

  const sizeClasses = {
    sm: 'h-1.5',
    md: 'h-3',
    lg: 'h-4',
  };

  const textSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        {showLabel && (
          <div className="flex items-center gap-1.5">
            <Icon className={cn('w-4 h-4', textColor)} />
            <span className={cn('font-bold', textSizeClasses[size], textColor)}>
              BSI: {score}
            </span>
          </div>
        )}
        <span className={cn('text-muted-foreground font-medium', textSizeClasses[size])}>
          {level} Stability
        </span>
      </div>
      <div className={cn('w-full bg-muted rounded-full overflow-hidden', sizeClasses[size])}>
        <div
          className={cn('h-full rounded-full transition-all duration-700 ease-out animate-meter-fill', color)}
          style={{ 
            width: `${score}%`,
            '--meter-value': `${score}%`
          } as React.CSSProperties}
        />
      </div>
    </div>
  );
}
