import { Layout } from '@/components/layout';

export default function Agenda() {
  return (
    <Layout>
      <section className="section-padding">
        <div className="container-page">
          <h1 className="font-serif text-3xl sm:text-4xl font-medium text-foreground mb-2">
            Agenda
          </h1>
          <p className="text-muted-foreground mb-8">
            Bekijk alle geplande activiteiten in onze agenda.
          </p>
          <div className="w-full overflow-x-auto rounded-xl border border-border bg-card">
            <iframe
              src="https://calendar.google.com/calendar/embed?src=website%40pknwoerden.nl&ctz=Europe%2FAmsterdam"
              style={{ border: 0 }}
              width="100%"
              height="600"
              frameBorder="0"
              scrolling="no"
              title="Google Agenda PKN Woerden"
              className="w-full min-w-[800px]"
            />
          </div>
        </div>
      </section>
    </Layout>
  );
}
