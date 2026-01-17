import { Layout } from '@/components/layout';
import { ExternalLink } from 'lucide-react';
import logo from '@/assets/logo-raad-van-kerken.png';

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
            <p className="text-foreground leading-relaxed">
              Dit platform brengt activiteiten op het gebied van geloof, zingeving, cultuur en ontmoeting in Woerden samen. Zo maken we zichtbaar wat er allemaal te doen is in onze stad.
            </p>
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

            <p className="text-foreground leading-relaxed">
              Iedereen is welkom. Of je nu christen bent of niet, jong of oud, nieuw in Woerden of al jaren inwoner – dit platform is er voor jou.
            </p>
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
