import { XCircle } from 'lucide-react';

interface RejectionReasonProps {
  reason: string;
}

export function RejectionReason({ reason }: RejectionReasonProps) {
  return (
    <div className="flex items-start gap-3 p-4 rounded-lg bg-destructive/5 border border-destructive/20">
      <XCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
      <div>
        <p className="font-semibold text-destructive text-sm mb-1">Booking Rejected</p>
        <p className="text-sm text-muted-foreground leading-relaxed">{reason}</p>
      </div>
    </div>
  );
}
