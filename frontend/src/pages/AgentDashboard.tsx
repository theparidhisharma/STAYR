import { useState } from 'react';
import { Header } from '@/components/copilot/Header';
import { ConstraintForm } from '@/components/copilot/ConstraintForm';
import { OptionCard } from '@/components/copilot/OptionCard';
import { StabilityInsights } from '@/components/copilot/StabilityInsights';
import { BSIExplainer } from '@/components/copilot/BSIExplainer';
import { mockBookingOptions, defaultConstraints, type AgentConstraints, type BookingOption } from '@/data/mockData';

export default function AgentDashboard() {
  const [constraints, setConstraints] = useState<AgentConstraints>(defaultConstraints);
  const [options, setOptions] = useState<BookingOption[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [hasAnalyzed, setHasAnalyzed] = useState(false);

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    // Sort by BSI score descending
    const sortedOptions = [...mockBookingOptions].sort((a, b) => b.bsiScore - a.bsiScore);
    setOptions(sortedOptions);
    setIsAnalyzing(false);
    setHasAnalyzed(true);
  };

  const recommendedOption = options.find((o) => !o.isRejected && o.bsiScore >= 80);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-[360px_1fr] gap-6">
          {/* Left Sidebar */}
          <aside className="space-y-6">
            <ConstraintForm
              constraints={constraints}
              onConstraintsChange={setConstraints}
              onAnalyze={handleAnalyze}
              isAnalyzing={isAnalyzing}
            />
            
            {hasAnalyzed && <StabilityInsights options={options} />}
            
            <BSIExplainer />
          </aside>

          {/* Main Content */}
          <section>
            {!hasAnalyzed ? (
              <div className="flex flex-col items-center justify-center h-[500px] text-center p-8">
                <div className="w-24 h-24 rounded-2xl gradient-primary flex items-center justify-center mb-8 shadow-lg animate-pulse-glow">
                  <svg
                    className="w-12 h-12 text-primary-foreground"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-foreground mb-3">
                  Stability-First Booking Analysis
                </h2>
                <p className="text-muted-foreground max-w-lg mb-8 text-lg leading-relaxed">
                  Enter your booking requirements and let our AI analyze options for
                  maximum stability. We evaluate refundability, supplier reliability,
                  and constraint conflicts.
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <div className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-stability-high/10 text-stability-high border border-stability-high/20 shadow-sm">
                    <span className="w-2.5 h-2.5 rounded-full bg-stability-high animate-pulse" />
                    <span className="font-medium">High Stability (70+)</span>
                  </div>
                  <div className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-stability-medium/10 text-stability-medium border border-stability-medium/20 shadow-sm">
                    <span className="w-2.5 h-2.5 rounded-full bg-stability-medium" />
                    <span className="font-medium">Medium (45-69)</span>
                  </div>
                  <div className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-stability-low/10 text-stability-low border border-stability-low/20 shadow-sm">
                    <span className="w-2.5 h-2.5 rounded-full bg-stability-low" />
                    <span className="font-medium">Low (&lt;45)</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h2 className="text-xl font-bold text-foreground">
                      Booking Options
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      Ranked by Booking Stability Index (BSI)
                    </p>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {options.filter((o) => !o.isRejected).length} of {options.length} options available
                  </p>
                </div>

                <div className="space-y-4">
                  {options.map((option, index) => (
                    <OptionCard
                      key={option.id}
                      option={option}
                      rank={option.isRejected ? undefined : index + 1}
                      isRecommended={option.id === recommendedOption?.id}
                    />
                  ))}
                </div>
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}
