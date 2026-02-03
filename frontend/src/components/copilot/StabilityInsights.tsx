import { TrendingUp, AlertTriangle, CheckCircle2, BarChart3 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { BookingOption } from '@/data/mockData';

interface StabilityInsightsProps {
  options: BookingOption[];
}

export function StabilityInsights({ options }: StabilityInsightsProps) {
  const validOptions = options.filter((o) => !o.isRejected);
  const rejectedOptions = options.filter((o) => o.isRejected);
  const avgBSI = validOptions.length
    ? Math.round(validOptions.reduce((sum, o) => sum + o.bsiScore, 0) / validOptions.length)
    : 0;
  const highStabilityCount = validOptions.filter((o) => o.bsiScore >= 70).length;

  const insights = [
    {
      icon: TrendingUp,
      label: 'Average BSI',
      value: avgBSI,
      color: 'text-accent',
      bgColor: 'bg-accent/10',
      borderColor: 'border-accent/20',
    },
    {
      icon: CheckCircle2,
      label: 'High Stability',
      value: highStabilityCount,
      color: 'text-stability-high',
      bgColor: 'bg-stability-high/10',
      borderColor: 'border-stability-high/20',
    },
    {
      icon: AlertTriangle,
      label: 'Rejected',
      value: rejectedOptions.length,
      color: 'text-destructive',
      bgColor: 'bg-destructive/10',
      borderColor: 'border-destructive/20',
    },
    {
      icon: BarChart3,
      label: 'Total Options',
      value: options.length,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      borderColor: 'border-primary/20',
    },
  ];

  return (
    <Card className="shadow-card overflow-hidden">
      <CardHeader className="pb-3 bg-gradient-to-b from-primary/5 to-transparent">
        <CardTitle className="flex items-center gap-2 text-base font-semibold">
          <BarChart3 className="w-4 h-4 text-primary" />
          Stability Overview
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {insights.map((insight) => (
            <div
              key={insight.label}
              className={`flex items-center gap-3 p-3 rounded-xl ${insight.bgColor} border ${insight.borderColor} transition-all hover:scale-[1.02]`}
            >
              <div className={`flex items-center justify-center w-10 h-10 rounded-lg ${insight.bgColor}`}>
                <insight.icon className={`w-5 h-5 ${insight.color}`} />
              </div>
              <div>
                <p className={`text-xl font-bold ${insight.color}`}>{insight.value}</p>
                <p className="text-xs text-muted-foreground font-medium">{insight.label}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
