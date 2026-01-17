import { useState } from 'react';
import { Search, Filter, Grid, Sparkles } from 'lucide-react';
import { Layout } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ChurchCard } from '@/components/ChurchCard';
import { ChurchFinder } from '@/components/ChurchFinder';
import { getChurches } from '@/data/organizations';
import { Denomination, ChurchSize, ServiceStyle, denominationLabels, sizeLabels, styleLabels } from '@/data/types';

type ViewMode = 'finder' | 'overview';

export default function Churches() {
  const [viewMode, setViewMode] = useState<ViewMode>('finder');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDenomination, setSelectedDenomination] = useState<Denomination | ''>('');
  const [selectedSize, setSelectedSize] = useState<ChurchSize | ''>('');
  const [selectedStyle, setSelectedStyle] = useState<ServiceStyle | ''>('');

  const churches = getChurches();

  const filteredChurches = churches.filter(church => {
    const matchesSearch = !searchQuery || 
      church.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      church.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      church.neighborhood?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesDenomination = !selectedDenomination || church.denomination === selectedDenomination;
    const matchesSize = !selectedSize || church.size === selectedSize;
    const matchesStyle = !selectedStyle || church.serviceStyle === selectedStyle;

    return matchesSearch && matchesDenomination && matchesSize && matchesStyle;
  });

  const hasActiveFilters = selectedDenomination || selectedSize || selectedStyle || searchQuery;

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedDenomination('');
    setSelectedSize('');
    setSelectedStyle('');
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-secondary/50 to-background section-padding">
        <div className="container-page text-center">
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-foreground mb-4">
            Vind een kerk in Woerden
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Woerden telt diverse kerken en geloofsgemeenschappen, elk met hun eigen karakter. 
            Ontdek welke gemeenschap bij jou past met onze Kerkwijzer.
          </p>

          {/* View Toggle */}
          <div className="flex justify-center gap-3">
            <Button
              variant={viewMode === 'finder' ? 'default' : 'outline'}
              onClick={() => setViewMode('finder')}
              className="gap-2"
            >
              <Sparkles className="w-4 h-4" />
              Kerkwijzer
            </Button>
            <Button
              variant={viewMode === 'overview' ? 'default' : 'outline'}
              onClick={() => setViewMode('overview')}
              className="gap-2"
            >
              <Grid className="w-4 h-4" />
              Alle kerken
            </Button>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="section-padding">
        <div className="container-page">
          {viewMode === 'finder' ? (
            <ChurchFinder />
          ) : (
            <>
              {/* Filters */}
              <div className="bg-card rounded-xl border border-border p-4 mb-8">
                <div className="flex flex-col lg:flex-row gap-4">
                  {/* Search */}
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      type="text"
                      placeholder="Zoek op naam of locatie..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>

                  {/* Filter Selects */}
                  <div className="flex flex-wrap gap-3">
                    <select
                      value={selectedDenomination}
                      onChange={(e) => setSelectedDenomination(e.target.value as Denomination | '')}
                      className="px-3 py-2 bg-background border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="">Alle stromingen</option>
                      {Object.entries(denominationLabels).map(([value, label]) => (
                        <option key={value} value={value}>{label}</option>
                      ))}
                    </select>

                    <select
                      value={selectedSize}
                      onChange={(e) => setSelectedSize(e.target.value as ChurchSize | '')}
                      className="px-3 py-2 bg-background border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="">Alle groottes</option>
                      {Object.entries(sizeLabels).map(([value, label]) => (
                        <option key={value} value={value}>{label}</option>
                      ))}
                    </select>

                    <select
                      value={selectedStyle}
                      onChange={(e) => setSelectedStyle(e.target.value as ServiceStyle | '')}
                      className="px-3 py-2 bg-background border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="">Alle stijlen</option>
                      {Object.entries(styleLabels).map(([value, label]) => (
                        <option key={value} value={value}>{label}</option>
                      ))}
                    </select>

                    {hasActiveFilters && (
                      <Button variant="ghost" size="sm" onClick={clearFilters}>
                        Wis filters
                      </Button>
                    )}
                  </div>
                </div>
              </div>

              {/* Results */}
              {filteredChurches.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredChurches.map(church => (
                    <ChurchCard key={church.id} church={church} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">
                    Geen kerken gevonden met deze filters.
                  </p>
                  <Button variant="outline" onClick={clearFilters} className="mt-4">
                    Wis filters
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </Layout>
  );
}
