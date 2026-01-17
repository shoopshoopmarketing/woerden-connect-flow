import { useState } from 'react';
import { ChevronRight, ChevronLeft, RotateCcw, Church, Heart, Users, Sparkles, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Organization, Denomination, ChurchSize, ServiceStyle } from '@/data/types';
import { getChurches } from '@/data/organizations';
import { ChurchCard } from './ChurchCard';

interface Answers {
  style?: ServiceStyle;
  denomination?: Denomination | 'geen-voorkeur';
  size?: ChurchSize | 'geen-voorkeur';
  features?: string[];
}

const steps = [
  {
    id: 'style',
    icon: Sparkles,
    question: 'Wat voor sfeer zoek je in een kerkdienst?',
    description: 'Elke kerk heeft haar eigen karakter en stijl.',
    options: [
      { value: 'traditioneel', label: 'Traditioneel', description: 'Klassieke liturgie, orgelmuziek, rust en bezinning' },
      { value: 'modern', label: 'Modern', description: 'Eigentijdse muziek, informele sfeer, interactief' },
      { value: 'gemengd', label: 'Combinatie', description: 'Mix van traditioneel en modern, afwisselend' },
    ],
  },
  {
    id: 'denomination',
    icon: Church,
    question: 'Welke geloofstraditie spreekt je aan?',
    description: 'Kies een traditie of geef aan dat je openstaat voor alles.',
    options: [
      { value: 'rooms-katholiek', label: 'Rooms-Katholiek', description: 'Sacramenten, Maria-verering, rijke liturgie' },
      { value: 'protestant-hervormd', label: 'Protestant / Hervormd', description: 'Nadruk op Bijbel en prediking' },
      { value: 'gereformeerd', label: 'Gereformeerd', description: 'Gereformeerde belijdenisgeschriften' },
      { value: 'evangelisch', label: 'Evangelisch', description: 'Persoonlijk geloof, hedendaagse muziek' },
      { value: 'geen-voorkeur', label: 'Geen voorkeur', description: 'Ik sta open voor verschillende tradities' },
    ],
  },
  {
    id: 'size',
    icon: Users,
    question: 'In wat voor gemeenschap voel je je prettig?',
    description: 'De grootte van een kerk bepaalt vaak de sfeer en het contact.',
    options: [
      { value: 'klein', label: 'Klein & intiem', description: 'Minder dan 100 mensen, iedereen kent elkaar' },
      { value: 'middelgroot', label: 'Middelgroot', description: '100-300 mensen, goede balans persoonlijk/divers' },
      { value: 'groot', label: 'Groot & veelzijdig', description: 'Meer dan 300 mensen, veel activiteiten en anonimiteit' },
      { value: 'geen-voorkeur', label: 'Maakt niet uit', description: 'Grootte is voor mij geen criterium' },
    ],
  },
  {
    id: 'features',
    icon: Heart,
    question: 'Welke praktische zaken zijn belangrijk voor jou?',
    description: 'Selecteer wat voor jou relevant is (meerdere opties mogelijk).',
    multiSelect: true,
    options: [
      { value: 'hasChildcare', label: 'Kinderoppas', description: 'Opvang tijdens de dienst' },
      { value: 'hasYouthGroup', label: 'Jeugdwerk', description: 'Activiteiten voor jongeren' },
      { value: 'hasAccessibility', label: 'Rolstoeltoegankelijk', description: 'Toegankelijk voor minder validen' },
      { value: 'hasParkingAvailable', label: 'Parkeergelegenheid', description: 'Parkeren bij de kerk' },
      { value: 'hasRingloop', label: 'Ringleiding', description: 'Voor slechthorenden' },
    ],
  },
];

function calculateMatchScore(church: Organization, answers: Answers): number {
  let score = 0;
  let maxScore = 0;

  // Style match (30 points)
  if (answers.style) {
    maxScore += 30;
    if (church.serviceStyle === answers.style) {
      score += 30;
    } else if (church.serviceStyle === 'gemengd' || answers.style === 'gemengd') {
      score += 15;
    }
  }

  // Denomination match (30 points)
  if (answers.denomination && answers.denomination !== 'geen-voorkeur') {
    maxScore += 30;
    if (church.denomination === answers.denomination) {
      score += 30;
    } else if (church.denomination === 'oecumenisch') {
      score += 15;
    }
  }

  // Size match (20 points)
  if (answers.size && answers.size !== 'geen-voorkeur') {
    maxScore += 20;
    if (church.size === answers.size) {
      score += 20;
    }
  }

  // Features match (5 points each, max 20)
  if (answers.features && answers.features.length > 0) {
    const featurePoints = 5;
    answers.features.forEach(feature => {
      maxScore += featurePoints;
      if (church[feature as keyof Organization]) {
        score += featurePoints;
      }
    });
  }

  // Ensure minimum score if no criteria selected
  if (maxScore === 0) return 100;

  return Math.round((score / maxScore) * 100);
}

export function ChurchFinder() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [showResults, setShowResults] = useState(false);

  const churches = getChurches();

  const handleSelect = (value: string) => {
    const step = steps[currentStep];
    
    if (step.multiSelect) {
      const currentFeatures = answers.features || [];
      const newFeatures = currentFeatures.includes(value)
        ? currentFeatures.filter(f => f !== value)
        : [...currentFeatures, value];
      setAnswers({ ...answers, features: newFeatures });
    } else {
      setAnswers({ ...answers, [step.id]: value });
      // Auto-advance for single select
      setTimeout(() => {
        if (currentStep < steps.length - 1) {
          setCurrentStep(currentStep + 1);
        } else {
          setShowResults(true);
        }
      }, 300);
    }
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowResults(true);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleReset = () => {
    setAnswers({});
    setCurrentStep(0);
    setShowResults(false);
  };

  if (showResults) {
    const results = churches
      .map(church => ({
        church,
        score: calculateMatchScore(church, answers),
      }))
      .sort((a, b) => b.score - a.score);

    return (
      <div className="space-y-8">
        <div className="text-center">
          <h2 className="font-serif text-2xl sm:text-3xl font-medium text-foreground mb-3">
            Jouw persoonlijke resultaten
          </h2>
          <p className="text-muted-foreground mb-6">
            Op basis van jouw voorkeuren hebben we de kerken in Woerden voor je gerangschikt.
          </p>
          <Button variant="outline" onClick={handleReset} className="gap-2">
            <RotateCcw className="w-4 h-4" />
            Opnieuw beginnen
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map(({ church, score }) => (
            <ChurchCard key={church.id} church={church} matchScore={score} />
          ))}
        </div>
      </div>
    );
  }

  const step = steps[currentStep];
  const StepIcon = step.icon;
  const currentAnswer = step.multiSelect 
    ? answers.features || []
    : answers[step.id as keyof Answers];

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress */}
      <div className="flex justify-center gap-2 mb-8">
        {steps.map((_, index) => (
          <div
            key={index}
            className={`h-2 w-12 rounded-full transition-colors ${
              index <= currentStep ? 'bg-primary' : 'bg-muted'
            }`}
          />
        ))}
      </div>

      {/* Question Card */}
      <Card className="p-8 text-center">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <StepIcon className="w-8 h-8 text-primary" />
        </div>

        <h2 className="font-serif text-2xl font-medium text-foreground mb-2">
          {step.question}
        </h2>
        <p className="text-muted-foreground mb-8">
          {step.description}
        </p>

        {/* Options */}
        <div className="space-y-3">
          {step.options.map(option => {
            const isSelected = step.multiSelect
              ? (answers.features || []).includes(option.value)
              : currentAnswer === option.value;

            return (
              <button
                key={option.value}
                onClick={() => handleSelect(option.value)}
                className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                  isSelected
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/50 hover:bg-muted/50'
                }`}
              >
                <p className="font-medium text-foreground">{option.label}</p>
                <p className="text-sm text-muted-foreground">{option.description}</p>
              </button>
            );
          })}
        </div>

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <Button
            variant="ghost"
            onClick={handleBack}
            disabled={currentStep === 0}
            className="gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Vorige
          </Button>

          {step.multiSelect && (
            <Button onClick={handleNext} className="gap-2">
              {currentStep === steps.length - 1 ? 'Bekijk resultaten' : 'Volgende'}
              <ChevronRight className="w-4 h-4" />
            </Button>
          )}
        </div>
      </Card>

      {/* Skip link */}
      <p className="text-center mt-6">
        <button
          onClick={() => setShowResults(true)}
          className="text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          Sla over en bekijk alle kerken
        </button>
      </p>
    </div>
  );
}
