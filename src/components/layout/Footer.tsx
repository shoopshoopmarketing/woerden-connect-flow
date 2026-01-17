import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-card border-t border-border mt-auto">
      <div className="container-page py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className="font-serif text-lg font-medium text-foreground mb-3">
              Geloof & Cultuur Woerden
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Een initiatief van de Raad van Kerken Woerden om activiteiten op het 
              gebied van geloof, zingeving, cultuur en ontmoeting zichtbaar te maken.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-medium text-foreground mb-3">Snelle links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/activiteiten" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Activiteiten bekijken
                </Link>
              </li>
              <li>
                <Link to="/aanmelden" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Activiteit aanmelden
                </Link>
              </li>
              <li>
                <Link to="/nieuws" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Nieuws & Verhalen
                </Link>
              </li>
              <li>
                <Link to="/over" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Over dit platform
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-medium text-foreground mb-3">Contact</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Raad van Kerken Woerden
            </p>
            <a 
              href="https://www.kerkeninwoerden.nl" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm text-primary hover:underline"
            >
              www.kerkeninwoerden.nl
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Raad van Kerken Woerden. Een platform voor verbinding.
          </p>
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            Gemaakt met <Heart className="w-3 h-3 text-primary" /> in Woerden
          </p>
        </div>
      </div>
    </footer>
  );
}
