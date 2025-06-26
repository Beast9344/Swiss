"use client";

import { useState, useEffect } from 'react';
import { ArrowRight, ShieldCheck, BadgePercent, Zap, Users, Star, BarChart, TrendingUp, Clock, Trophy, MessageCircle, CheckCircle, Play } from 'lucide-react';
import { GameCard } from '@/components/game-card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useData } from '@/context/DataContext';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const testimonials = [
  {
    name: "Marco Weber",
    club: "FC Basel Fan",
    text: "Swiss made it so easy to get tickets for the derby! No stress, fair prices, instant delivery.",
    rating: 5
  },
  {
    name: "Sarah Müller",
    club: "Young Boys Supporter",
    text: "Sold my season ticket through Swiss when I couldn't attend. Quick, secure, and hassle-free!",
    rating: 5
  },
  {
    name: "Thomas Schneider",
    club: "FC Zurich Fan",
    text: "Finally, a platform that puts fans first. The transparency is refreshing in this industry.",
    rating: 5
  }
];

const stats = [
  { number: "50K+", label: "Happy Fans", icon: Users },
  { number: "10K+", label: "Tickets Sold", icon: Trophy },
  { number: "99.9%", label: "Success Rate", icon: CheckCircle },
  { number: "24/7", label: "Support", icon: Clock }
];

interface FloatingCardProps {
  children: React.ReactNode;
  delay?: number;
}

function FloatingCard({ children, delay = 0 }: FloatingCardProps) {
  return (
    <div 
      className="animate-float"
      style={{ animationDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
}

type Particle = {
  key: string;
  left: string;
  top: string;
  animationDelay: string;
  animationDuration: string;
  className: string;
};

export default function Home() {
  const { games } = useData();
  const [selectedClub, setSelectedClub] = useState<string | null>(null);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [heroParticles, setHeroParticles] = useState<Particle[]>([]);
  const [testimonialParticles, setTestimonialParticles] = useState<Particle[]>([]);
  const [ctaParticles, setCtaParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);

    // Generate particles for hero section
    setHeroParticles(
      [...Array(20)].map((_, i) => ({
        key: `hero-${i}`,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 5}s`,
        animationDuration: `${3 + Math.random() * 4}s`,
        className: "absolute w-2 h-2 bg-primary/30 rounded-full animate-float",
      }))
    );

    // Generate particles for testimonials section
    setTestimonialParticles(
      [...Array(10)].map((_, i) => ({
        key: `testimonial-${i}`,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 3}s`,
        animationDuration: `${4 + Math.random() * 2}s`,
        className: "absolute w-1 h-1 bg-primary/20 rounded-full animate-float",
      }))
    );
    
    // Generate particles for CTA section
    setCtaParticles(
      [...Array(15)].map((_, i) => ({
        key: `cta-${i}`,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 4}s`,
        animationDuration: `${3 + Math.random() * 3}s`,
        className: "absolute w-2 h-2 bg-primary/30 rounded-full animate-float",
      }))
    );

    return () => clearInterval(interval);
  }, []);

  const allClubs = Array.from(new Set(games.flatMap(game => [game.teamA, game.teamB]))).sort();

  const futureGames = games.filter(game => {
    const isFuture = new Date(game.date) > new Date();
    if (!selectedClub) {
      return isFuture;
    }
    return isFuture && (game.teamA === selectedClub || game.teamB === selectedClub);
  });

  const features = [
    {
      icon: ShieldCheck,
      title: '100% Trusted & Secure',
      description: 'Every transaction is encrypted and verified, ensuring your tickets and payments are always safe.',
    },
    {
      icon: BadgePercent,
      title: 'Best Price Guarantee',
      description: 'We connect fans directly, cutting out middlemen to offer you the most competitive prices on the market.',
    },
    {
      icon: Zap,
      title: 'Instant Ticket Delivery',
      description: 'Your tickets are delivered digitally to your account the moment your purchase is confirmed.',
    },
  ];

  const whyChooseUsPoints = [
    {
      icon: Users,
      title: "Fan-to-Fan Marketplace",
      description: "Built by fans, for fans. We've created a community where real supporters can buy and sell tickets with confidence."
    },
    {
      icon: Star,
      title: "Seamless Experience",
      description: "From Browse games to receiving your digital ticket, our platform is designed to be intuitive and hassle-free."
    },
    {
      icon: BarChart,
      title: "Fair & Transparent",
      description: "No hidden fees. The price you see is the price you pay. We believe in an honest marketplace for everyone."
    }
  ];

  return (
    <div className="bg-background text-foreground overflow-hidden">
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.3); }
          50% { box-shadow: 0 0 40px rgba(59, 130, 246, 0.6); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }
        .bg-grid {
          background-image: 
            linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px);
          background-size: 50px 50px;
        }
      `}</style>

      {/* Hero Section */}
      <section className="relative w-full py-20 md:py-32 lg:py-40 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <Image
            src="/images/hero.jpg"
            alt="Stadium background"
            fill
            className="object-cover brightness-[.3] z-0"
            priority
            data-ai-hint="stadium soccer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent z-10"></div>
          <div className="absolute inset-0 bg-grid opacity-30"></div>
        </div>
        
        {/* Floating particles */}
        <div className="absolute inset-0">
          {heroParticles.map((p) => (
            <div
              key={p.key}
              className={p.className}
              style={{
                left: p.left,
                top: p.top,
                animationDelay: p.animationDelay,
                animationDuration: p.animationDuration,
              }}
            />
          ))}
        </div>

        <div className="relative container mx-auto px-4 md:px-6 text-center z-20">
          <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold text-primary tracking-tighter mb-4 uppercase">
            Swiss: Get Your Seat and Game on!
          </h1>
          <div className="max-w-4xl mx-auto text-lg md:text-xl lg:text-2xl text-foreground/90 mb-8 space-y-2">
            <p className="animate-fade-in-up" style={{animationDelay: '0.2s'}}>Do you want to attend a game but it is sold out? We got you covered!</p>
            <p className="animate-fade-in-up" style={{animationDelay: '0.4s'}}>Resell or buy tickets here.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in-up" style={{animationDelay: '0.6s'}}>
            <Button asChild size="lg" className="text-lg">
              <Link href="/buy">
                Buy a Ticket
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-lg">
              <Link href="/sell">
                Sell a Ticket
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-slate-900/50 backdrop-blur-sm border-y border-primary/20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <FloatingCard key={index} delay={index * 0.2}>
                  <div className="text-center group">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4 group-hover:bg-primary/20 transition-all duration-300 animate-pulse-glow">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.number}</div>
                    <div className="text-muted-foreground">{stat.label}</div>
                  </div>
                </FloatingCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-10"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold text-primary mb-4">Why We're Different</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Experience the future of ticket trading with cutting-edge security and fan-first features</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <FloatingCard key={index} delay={index * 0.3}>
                  <div className="group relative bg-slate-800/30 backdrop-blur-sm border border-primary/20 rounded-2xl p-8 transition-all duration-500 hover:bg-slate-800/50 hover:border-primary/40 hover:scale-105 hover:shadow-2xl hover:shadow-primary/20">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
                    <div className="relative z-10 text-center">
                      <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-full mb-6 group-hover:bg-primary/20 transition-all duration-300 animate-pulse-glow">
                        <Icon className="h-10 w-10 text-primary" />
                      </div>
                      <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-primary transition-colors duration-300">{feature.title}</h3>
                      <p className="text-muted-foreground group-hover:text-foreground/80 transition-colors duration-300">{feature.description}</p>
                    </div>
                  </div>
                </FloatingCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* Games Section */}
      <section className="py-16 md:py-24 bg-background relative">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-7xl font-bold text-center mb-8 text-muted-foreground/30 tracking-widest uppercase">
              GAMES ON THE HORIZON
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mb-8"></div>
          </div>
          
          <div className="max-w-sm mx-auto mb-16">
            <Label htmlFor="club-select" className="text-center block mb-4 font-medium text-lg">Choose your club to see their matches</Label>
            <Select onValueChange={(value) => setSelectedClub(value === 'all' ? null : value)}>
              <SelectTrigger id="club-select" className="w-full bg-slate-800/50 border border-primary/30 text-white focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300">
                <SelectValue placeholder="All Clubs" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Clubs</SelectItem>
                {allClubs.map(club => (
                  <SelectItem key={club} value={club}>{club}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {futureGames.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {futureGames.map((game, index) => (
                <FloatingCard key={game.id} delay={index * 0.2}>
                  <GameCard game={game} />
                </FloatingCard>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground mt-8 text-xl">No upcoming games match your selection.</p>
          )}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-24 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0">
          {testimonialParticles.map((p) => (
            <div
              key={p.key}
              className={p.className}
              style={{
                left: p.left,
                top: p.top,
                animationDelay: p.animationDelay,
                animationDuration: p.animationDuration,
              }}
            />
          ))}
        </div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold text-primary mb-4">What Fans Say</h2>
            <p className="text-xl text-muted-foreground">Real experiences from real football fans</p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="relative bg-slate-800/30 backdrop-blur-sm border border-primary/20 rounded-2xl p-8 md:p-12 animate-pulse-glow">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl"></div>
              <div className="relative z-10 text-center">
                <div className="flex justify-center mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-6 w-6 text-yellow-400 fill-current" />
                  ))}
                </div>
                <blockquote className="text-xl md:text-2xl text-white mb-6 italic leading-relaxed">
                  "{testimonials[currentTestimonial].text}"
                </blockquote>
                <div className="text-primary font-bold text-lg">{testimonials[currentTestimonial].name}</div>
                <div className="text-muted-foreground">{testimonials[currentTestimonial].club}</div>
              </div>
            </div>
            
            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimonial 
                      ? 'bg-primary shadow-lg shadow-primary/50' 
                      : 'bg-primary/30 hover:bg-primary/50'
                  }`}
                  onClick={() => setCurrentTestimonial(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 md:py-24 bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-10"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl md:text-6xl font-bold text-primary uppercase">Why Choose Swiss?</h2>
              <p className="text-xl text-muted-foreground leading-relaxed">
                We're more than just a ticket platform; we're a community dedicated to making sure every fan gets a fair chance to see their favorite teams live. Experience the difference with a service built on trust, transparency, and a passion for the game.
              </p>
              <div className="space-y-8 pt-4">
                {whyChooseUsPoints.map((point, index) => {
                  const Icon = point.icon;
                  return (
                    <FloatingCard key={index} delay={index * 0.2}>
                      <div className="flex items-start gap-6 group">
                        <div className="flex-shrink-0 p-4 bg-primary/10 text-primary rounded-xl group-hover:bg-primary/20 transition-all duration-300 animate-pulse-glow">
                          <Icon className="h-8 w-8" />
                        </div>
                        <div>
                          <h3 className="font-bold text-xl text-foreground mb-2 group-hover:text-primary transition-colors duration-300">{point.title}</h3>
                          <p className="text-muted-foreground text-lg leading-relaxed">{point.description}</p>
                        </div>
                      </div>
                    </FloatingCard>
                  );
                })}
              </div>
            </div>
            <FloatingCard delay={0.5}>
              <div className="relative h-96 lg:h-[600px] rounded-3xl overflow-hidden shadow-2xl shadow-primary/20 group">
                <Image
                  src="https://placehold.co/600x800.png"
                  alt="Fans cheering in a stadium"
                  fill
                  className="object-cover transform transition-transform duration-700 group-hover:scale-110"
                  data-ai-hint="fans cheering"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute bottom-8 left-8 text-white z-10">
                  <h3 className="text-3xl font-bold mb-2">Unforgettable Moments</h3>
                  <p className="text-white/90 text-lg">Don't just watch the game. Be part of it.</p>
                </div>
                <div className="absolute top-8 right-8 w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-all duration-300">
                  <Play className="h-8 w-8 text-white ml-1" />
                </div>
              </div>
            </FloatingCard>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-primary/10"></div>
        <div className="absolute inset-0">
          {ctaParticles.map((p) => (
            <div
              key={p.key}
              className={p.className}
              style={{
                left: p.left,
                top: p.top,
                animationDelay: p.animationDelay,
                animationDuration: p.animationDuration,
              }}
            />
          ))}
        </div>
        
        <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-bold text-primary mb-6">
            Ready to Join the Action?
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
            Don't let sold-out games keep you from the stadium. Join thousands of fans who trust Swiss for their ticket needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button asChild size="lg" className="text-xl px-12 py-6">
              <Link href="/buy">
                Start Buying Tickets
                <ArrowRight className="ml-3 h-6 w-6" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-xl px-12 py-6">
               <Link href="/sell">
                List Your Tickets
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
