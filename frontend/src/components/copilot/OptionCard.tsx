import { Check, Star, MapPin, Shield, TrendingUp, Wifi, Coffee, Car, Dumbbell, Waves, Utensils, Briefcase, Sparkles } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { StabilityMeter } from './StabilityMeter';
import { ConflictBadge } from './ConflictBadge';
import { RejectionReason } from './RejectionReason';
import { cn } from '@/lib/utils';
import type { BookingOption } from '@/data/mockData';

interface OptionCardProps {
  option: BookingOption;
  rank?: number;
  isRecommended?: boolean;
}

const amenityIcons: Record<string, React.ElementType> = {
  'Free WiFi': Wifi,
  'Breakfast': Coffee,
  'Airport Shuttle': Car,
  'Gym': Dumbbell,
  'Pool': Waves,
  'Restaurant': Utensils,
  'Fine Dining': Utensils,
  'Business Center': Briefcase,
  'Meeting Rooms': Briefcase,
  'Spa': Sparkles,
  'Concierge': Sparkles,
  'Parking': Car,
};

export function OptionCard({ option, rank, isRecommended }: OptionCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Card
      className={cn(
        'overflow-hidden transition-all duration-300 hover:shadow-card-hover animate-fade-in group',
        option.isRejected && 'opacity-70 grayscale-[30%]',
        isRecommended && 'ring-2 ring-accent shadow-lg'
      )}
    >
      <div className="flex flex-col md:flex-row">
        {/* Image Section */}
        <div className="relative w-full md:w-80 h-52 md:h-auto flex-shrink-0 overflow-hidden">
          <img
            src={option.imageUrl}
            alt={option.hotelName}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          {rank && !option.isRejected && (
            <div className="absolute top-3 left-3 w-9 h-9 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-bold text-sm shadow-lg border-2 border-primary-foreground/20">
              #{rank}
            </div>
          )}
          {isRecommended && (
            <div className="absolute top-3 right-3">
              <Badge className="bg-accent text-accent-foreground font-semibold shadow-lg px-3 py-1">
                <TrendingUp className="w-3.5 h-3.5 mr-1.5" />
                Top Pick
              </Badge>
            </div>
          )}
          {option.isRejected && (
            <div className="absolute inset-0 bg-background/70 backdrop-blur-sm flex items-center justify-center">
              <Badge variant="destructive" className="text-sm px-4 py-2 shadow-lg">
                Not Recommended
              </Badge>
            </div>
          )}
          {/* Rating Badge on Image */}
          <div className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-background/90 backdrop-blur-sm px-2.5 py-1 rounded-full shadow-md">
            <Star className="w-4 h-4 fill-accent text-accent" />
            <span className="font-bold text-sm text-foreground">{option.rating}</span>
          </div>
        </div>

        {/* Content Section */}
        <CardContent className="flex-1 p-6">
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <h3 className="text-xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                  {option.hotelName}
                </h3>
                <div className="flex items-center gap-1.5 text-muted-foreground text-sm">
                  <MapPin className="w-4 h-4" />
                  {option.location}
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-primary">
                  {formatPrice(option.price)}
                </p>
                <p className="text-xs text-muted-foreground">per night</p>
              </div>
            </div>

            {/* Badges Row */}
            <div className="flex flex-wrap items-center gap-2 mb-4">
              {option.refundable ? (
                <Badge variant="secondary" className="text-stability-high bg-stability-high/10 border border-stability-high/20">
                  <Check className="w-3.5 h-3.5 mr-1" />
                  Refundable
                </Badge>
              ) : (
                <Badge variant="secondary" className="text-destructive bg-destructive/10 border border-destructive/20">
                  Non-refundable
                </Badge>
              )}
              <Badge variant="outline" className="gap-1.5">
                <Shield className="w-3.5 h-3.5 text-primary" />
                {Math.round(option.supplierReliability * 100)}% Reliable
              </Badge>
            </div>

            {/* Stability Meter */}
            <div className="mb-5 p-4 rounded-lg bg-muted/50 border border-border/50">
              <StabilityMeter score={option.bsiScore} />
            </div>

            {/* Amenities */}
            <div className="flex flex-wrap gap-2 mb-4">
              {option.amenities.slice(0, 5).map((amenity) => {
                const IconComponent = amenityIcons[amenity] || Sparkles;
                return (
                  <div 
                    key={amenity} 
                    className="flex items-center gap-1.5 text-xs text-muted-foreground bg-secondary/50 px-2.5 py-1.5 rounded-md"
                  >
                    <IconComponent className="w-3.5 h-3.5" />
                    {amenity}
                  </div>
                );
              })}
              {option.amenities.length > 5 && (
                <div className="text-xs text-muted-foreground bg-secondary/50 px-2.5 py-1.5 rounded-md">
                  +{option.amenities.length - 5} more
                </div>
              )}
            </div>

            {/* Conflicts */}
            {option.conflicts.length > 0 && !option.isRejected && (
              <div className="space-y-2 mb-4">
                {option.conflicts.map((conflict, idx) => (
                  <ConflictBadge key={idx} conflict={conflict} />
                ))}
              </div>
            )}

            {/* Rejection Reason */}
            {option.isRejected && option.rejectionReason && (
              <div className="mb-4">
                <RejectionReason reason={option.rejectionReason} />
              </div>
            )}

            {/* Action */}
            <div className="mt-auto pt-3">
              <Button
                className={cn(
                  'w-full h-12 text-base font-semibold transition-all',
                  option.isRejected
                    ? 'bg-muted text-muted-foreground cursor-not-allowed'
                    : isRecommended
                    ? 'gradient-accent text-accent-foreground hover:opacity-90 shadow-md hover:shadow-lg'
                    : 'gradient-primary hover:opacity-90'
                )}
                disabled={option.isRejected}
              >
                {option.isRejected ? 'Not Available' : 'Select This Option'}
              </Button>
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  );
}
