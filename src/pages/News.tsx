import { Layout } from '@/components/layout';
import { NewsCard } from '@/components/NewsCard';
import { getRecentNews } from '@/data/news';

export default function News() {
  const news = getRecentNews();

  return (
    <Layout>
      <section className="section-padding">
        <div className="container-page">
          <h1 className="font-serif text-3xl sm:text-4xl font-medium text-foreground mb-2">Nieuws & Verhalen</h1>
          <p className="text-muted-foreground mb-8">Verhalen, terugblikken en nieuws uit de Woerdense gemeenschap.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.map(item => <NewsCard key={item.id} item={item} />)}
          </div>
        </div>
      </section>
    </Layout>
  );
}
