import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { z } from 'zod';
import { Lock, Mail, UserPlus, LogIn } from 'lucide-react';

const authSchema = z.object({
  email: z.string().email('Voer een geldig e-mailadres in'),
  password: z.string().min(6, 'Wachtwoord moet minimaal 6 tekens bevatten'),
});

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { user, signIn, signUp, isLoading } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (user && !isLoading) {
      navigate('/');
    }
  }, [user, isLoading, navigate]);

  const validateForm = () => {
    try {
      authSchema.parse({ email, password });
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: { email?: string; password?: string } = {};
        error.errors.forEach((err) => {
          if (err.path[0] === 'email') fieldErrors.email = err.message;
          if (err.path[0] === 'password') fieldErrors.password = err.message;
        });
        setErrors(fieldErrors);
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);

    try {
      if (isLogin) {
        const { error } = await signIn(email, password);
        if (error) {
          if (error.message.includes('Invalid login credentials')) {
            toast({
              title: 'Inloggen mislukt',
              description: 'E-mailadres of wachtwoord is onjuist.',
              variant: 'destructive',
            });
          } else {
            toast({
              title: 'Fout bij inloggen',
              description: error.message,
              variant: 'destructive',
            });
          }
        } else {
          toast({
            title: 'Welkom terug!',
            description: 'Je bent succesvol ingelogd.',
          });
          navigate('/');
        }
      } else {
        const { error } = await signUp(email, password);
        if (error) {
          if (error.message.includes('already registered')) {
            toast({
              title: 'Account bestaat al',
              description: 'Dit e-mailadres is al geregistreerd. Probeer in te loggen.',
              variant: 'destructive',
            });
          } else {
            toast({
              title: 'Fout bij registratie',
              description: error.message,
              variant: 'destructive',
            });
          }
        } else {
          toast({
            title: 'Account aangemaakt!',
            description: 'Je bent nu ingelogd.',
          });
          navigate('/');
        }
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <section className="section-padding">
          <div className="container-page max-w-md text-center">
            <p className="text-muted-foreground">Laden...</p>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="section-padding">
        <div className="container-page max-w-md">
          <div className="bg-card border border-border rounded-2xl p-8 shadow-sm">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                {isLogin ? (
                  <LogIn className="w-8 h-8 text-primary" />
                ) : (
                  <UserPlus className="w-8 h-8 text-primary" />
                )}
              </div>
              <h1 className="font-serif text-2xl font-medium text-foreground">
                {isLogin ? 'Inloggen' : 'Account aanmaken'}
              </h1>
              <p className="text-sm text-muted-foreground mt-2">
                {isLogin 
                  ? 'Log in om activiteiten te beheren' 
                  : 'Maak een account aan om activiteiten in te dienen'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  E-mailadres
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="jouw@email.nl"
                  className={errors.email ? 'border-destructive' : ''}
                  disabled={isSubmitting}
                />
                {errors.email && (
                  <p className="text-sm text-destructive mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <Label htmlFor="password" className="flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  Wachtwoord
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className={errors.password ? 'border-destructive' : ''}
                  disabled={isSubmitting}
                />
                {errors.password && (
                  <p className="text-sm text-destructive mt-1">{errors.password}</p>
                )}
              </div>

              <Button 
                type="submit" 
                size="lg" 
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting 
                  ? 'Even geduld...' 
                  : isLogin ? 'Inloggen' : 'Account aanmaken'}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <button
                type="button"
                onClick={() => {
                  setIsLogin(!isLogin);
                  setErrors({});
                }}
                className="text-sm text-primary hover:underline"
              >
                {isLogin 
                  ? 'Nog geen account? Registreer je hier' 
                  : 'Al een account? Log hier in'}
              </button>
            </div>
          </div>

          <p className="text-xs text-muted-foreground text-center mt-6">
            Dit inlogportaal is bedoeld voor beheerders en organisaties 
            die activiteiten willen indienen.
          </p>
        </div>
      </section>
    </Layout>
  );
}
