import { Layout } from '@/components/layout';
import { ExternalLink, Church } from 'lucide-react';
import logo from '@/assets/logo-raad-van-kerken.png';
import { organizations } from '@/data/organizations';

export default function About() {
  return (
    <Layout>
      <section className="section-padding">
        <div className="container-page max-w-3xl">
          <h1 className="font-serif text-3xl sm:text-4xl font-medium text-foreground mb-6">Over dit platform</h1>

          <div className="flex items-center gap-4 mb-8 p-6 bg-card rounded-xl border border-border">
            <img src={logo} alt="Raad van Kerken Woerden" className="h-16 w-auto" />
            <div>
              <p className="font-medium text-foreground">Een initiatief van</p>
              <p className="text-lg text-primary">Raad van Kerken Woerden</p>
            </div>
          </div>

          <div className="prose prose-lg max-w-none space-y-6">
            <p className="text-foreground leading-relaxed text-lg">
              Dit platform brengt activiteiten op het gebied van geloof, zingeving, cultuur en ontmoeting in Woerden samen. Zo maken we zichtbaar wat er allemaal te doen is in onze stad.
            </p>
            
            <div className="bg-primary/10 rounded-xl p-6 my-8 border-l-4 border-primary">
              <p className="text-foreground font-medium text-lg italic">
                "Er zijn voor iedereen in Woerden en omgeving"
              </p>
              <p className="text-muted-foreground mt-2">
                – Missie Raad van Kerken Woerden
              </p>
            </div>

            <p className="text-foreground leading-relaxed">
              De Raad van Kerken Woerden is een samenwerkingsverband van kerken in Woerden, Harmelen, Kamerik, Kanis en Zegveld. Wij willen het christelijk geloof op een laagdrempelige en dienende manier zichtbaar maken in onze samenleving.
            </p>
            
            <div className="bg-terracotta-light rounded-xl p-6 my-8">
              <h3 className="font-serif text-xl font-medium text-foreground mb-3">Wat dit platform wél is:</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>✓ Een open overzicht van activiteiten</li>
                <li>✓ Een plek waar initiatieven zichtbaar worden</li>
                <li>✓ Toegankelijk voor alle inwoners van Woerden</li>
              </ul>
            </div>

            <div className="bg-muted rounded-xl p-6 my-8">
              <h3 className="font-serif text-xl font-medium text-foreground mb-3">Wat dit platform niet is:</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>✗ Geen sociale media</li>
                <li>✗ Geen commercieel platform</li>
                <li>✗ Geen exclusieve kerkwebsite</li>
              </ul>
            </div>

            <p className="text-foreground leading-relaxed text-lg font-medium">
              Iedereen is welkom. Of je nu christen bent of niet, jong of oud, nieuw in Woerden of al jaren inwoner – dit platform is er voor jou.
            </p>
          </div>

          {/* Participating churches */}
          <div className="mt-12 pt-8 border-t border-border">
            <h2 className="font-serif text-2xl font-medium text-foreground mb-6 flex items-center gap-3">
              <Church className="w-6 h-6 text-primary" />
              Deelnemende kerken
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {organizations.filter(org => org.id !== 'rvk').map(org => (
                <div key={org.id} className="bg-card border border-border rounded-lg p-4">
                  <p className="font-medium text-foreground">{org.name}</p>
                  {org.description && (
                    <p className="text-sm text-muted-foreground mt-1">{org.description}</p>
                  )}
                  {org.website && (
                    <a 
                      href={org.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm text-primary hover:underline mt-2 inline-flex items-center gap-1"
                    >
                      Website <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-border">
            <a href="https://www.kerkeninwoerden.nl" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-primary hover:underline">
              Bezoek kerkeninwoerden.nl <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
}
