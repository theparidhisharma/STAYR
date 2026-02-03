import { Info, Shield, RefreshCcw, DollarSign, Users, Settings } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function BSIExplainer() {
  const factors = [
    {
      icon: RefreshCcw,
      name: 'Refundability',
      weight: '35%',
      description: 'Free cancellation policies reduce booking failure risk',
    },
    {
      icon: Shield,
      name: 'Supplier Reliability',
      weight: '25%',
      description: 'Historical performance and fulfillment rate of the supplier',
    },
    {
      icon: DollarSign,
      name: 'Budget Slack',
      weight: '20%',
      description: 'Room for price adjustments without exceeding limits',
    },
    {
      icon: Users,
      name: 'Credit Risk',
      weight: '10%',
      description: 'Payment and credit-related risk factors',
    },
    {
      icon: Settings,
      name: 'Operational Effort',
      weight: '10%',
      description: 'Complexity of managing and modifying the booking',
    },
  ];

  return (
    <Card className="shadow-card">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base font-semibold">
          <Info className="w-4 h-4 text-accent" />
          What is BSI?
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="bsi" className="border-none">
            <AccordionTrigger className="py-2 text-sm hover:no-underline">
              Booking Stability Index Explained
            </AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground">
              <p className="mb-4">
                BSI scores booking options from 0-100 based on their likelihood to
                complete without issues. Higher scores mean more stable bookings.
              </p>
              <div className="space-y-3">
                {factors.map((factor) => (
                  <div key={factor.name} className="flex items-start gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-md bg-secondary flex-shrink-0">
                      <factor.icon className="w-4 h-4 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-foreground">{factor.name}</span>
                        <span className="text-xs text-accent font-semibold">
                          {factor.weight}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">{factor.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}
