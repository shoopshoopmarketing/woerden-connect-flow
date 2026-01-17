import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import { nl } from 'date-fns/locale';
import { Layout } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { getNewsById } from '@/data/news';

export default function NewsDetail() {
  const { id } = useParams<{ id: string }>();
  const item = getNewsById(id || '');

  if (!item) {
    return (
      <Layout>
        <div className="container-page section-padding text-center">
          <h1 className="font-serif text-2xl text-foreground mb-4">Artikel niet gevonden</h1>
          <Link to="/nieuws"><Button variant="outline">Terug naar nieuws</Button></Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <article className="section-padding">
        <div className="container-page max-w-3xl">
          <Link to="/nieuws" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-6">
            <ArrowLeft className="w-4 h-4" /> Terug naar nieuws
          </Link>

          {item.image && (
            <img src={item.image} alt={item.title} className="w-full aspect-video object-cover rounded-xl mb-6" />
          )}

          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
            <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {format(item.date, 'd MMMM yyyy', { locale: nl })}</span>
            {item.author && <span>Door {item.author}</span>}
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl font-medium text-foreground mb-6">{item.title}</h1>

          <div className="prose prose-lg max-w-none">
            {item.content.split('\n\n').map((p, i) => <p key={i} className="text-foreground leading-relaxed mb-4">{p}</p>)}
          </div>
        </div>
      </article>
    </Layout>
  );
}
