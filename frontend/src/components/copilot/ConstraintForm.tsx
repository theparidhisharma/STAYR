import { useState } from 'react';
import { Search, Calendar, DollarSign, Users, RefreshCw } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { AgentConstraints } from '@/data/mockData';

interface ConstraintFormProps {
  constraints: AgentConstraints;
  onConstraintsChange: (constraints: AgentConstraints) => void;
  onAnalyze: () => void;
  isAnalyzing: boolean;
}

export function ConstraintForm({
  constraints,
  onConstraintsChange,
  onAnalyze,
  isAnalyzing,
}: ConstraintFormProps) {
  const updateConstraint = <K extends keyof AgentConstraints>(
    key: K,
    value: AgentConstraints[K]
  ) => {
    onConstraintsChange({ ...constraints, [key]: value });
  };

  return (
    <Card className="shadow-card border-t-4 border-t-accent overflow-hidden">
      <CardHeader className="pb-4 bg-gradient-to-b from-accent/5 to-transparent">
        <CardTitle className="flex items-center gap-2 text-lg">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-accent/10">
            <Search className="w-4 h-4 text-accent" />
          </div>
          Booking Requirements
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        {/* Destination */}
        <div className="space-y-2">
          <Label htmlFor="destination" className="text-sm font-medium">
            Destination
          </Label>
          <Input
            id="destination"
            placeholder="Enter city or hotel"
            value={constraints.destination}
            onChange={(e) => updateConstraint('destination', e.target.value)}
            className="h-11 border-2 focus:border-accent transition-colors"
          />
        </div>

        {/* Dates */}
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <Label htmlFor="checkIn" className="text-sm font-medium">
              Check-in
            </Label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="checkIn"
                type="date"
                value={constraints.checkIn}
                onChange={(e) => updateConstraint('checkIn', e.target.value)}
                className="pl-10 h-11 border-2 focus:border-accent transition-colors"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="checkOut" className="text-sm font-medium">
              Check-out
            </Label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="checkOut"
                type="date"
                value={constraints.checkOut}
                onChange={(e) => updateConstraint('checkOut', e.target.value)}
                className="pl-10 h-11 border-2 focus:border-accent transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Budget */}
        <div className="space-y-2">
          <Label htmlFor="budget" className="text-sm font-medium">
            Maximum Budget (₹)
          </Label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              id="budget"
              type="number"
              placeholder="90000"
              value={constraints.budget}
              onChange={(e) => updateConstraint('budget', parseInt(e.target.value) || 0)}
              className="pl-10 h-11 border-2 focus:border-accent transition-colors"
            />
          </div>
        </div>

        {/* Client Type */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">Client Type</Label>
          <Select
            value={constraints.clientType}
            onValueChange={(value: 'corporate' | 'leisure') =>
              updateConstraint('clientType', value)
            }
          >
            <SelectTrigger className="h-11 border-2 focus:border-accent transition-colors">
              <Users className="w-4 h-4 text-muted-foreground mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="corporate">Corporate</SelectItem>
              <SelectItem value="leisure">Leisure</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Date Flexibility */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">Date Flexibility</Label>
          <Select
            value={constraints.dateFlexibility}
            onValueChange={(value: 'low' | 'medium' | 'high') =>
              updateConstraint('dateFlexibility', value)
            }
          >
            <SelectTrigger className="h-11 border-2 focus:border-accent transition-colors">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Low (Fixed dates)</SelectItem>
              <SelectItem value="medium">Medium (±1-2 days)</SelectItem>
              <SelectItem value="high">High (Flexible)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Refundability Required */}
        <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-secondary/80 to-secondary/40 border border-border/50">
          <div className="space-y-0.5">
            <Label htmlFor="refundable" className="text-sm font-medium cursor-pointer">
              Require Refundable Options
            </Label>
            <p className="text-xs text-muted-foreground">
              Only show bookings with free cancellation
            </p>
          </div>
          <Switch
            id="refundable"
            checked={constraints.refundabilityRequired}
            onCheckedChange={(checked) => updateConstraint('refundabilityRequired', checked)}
          />
        </div>

        {/* Analyze Button */}
        <Button
          onClick={onAnalyze}
          disabled={isAnalyzing}
          className="w-full h-12 text-base font-semibold gradient-accent text-accent-foreground hover:opacity-90 transition-all shadow-md hover:shadow-lg"
        >
          {isAnalyzing ? (
            <>
              <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
              Analyzing Stability...
            </>
          ) : (
            <>
              <Search className="w-5 h-5 mr-2" />
              Analyze Booking Options
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
