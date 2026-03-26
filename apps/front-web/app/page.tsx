import Link from "next/link";
import { Button } from "@repo/ui";
import { Navbar } from "../components/layouts/navbar";
import { Footer } from "../components/layouts/footer";
import { Section } from "../components/layouts/page-container";
import { FeatureCard } from "../components/features/feature-card";
import { StepCard } from "../components/features/step-card";
import { Gamepad2, Sparkles, Heart, Camera, ArrowRight } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 pt-16">
        {/* Background effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="size-[600px] rounded-full bg-primary/10 blur-3xl" />
          </div>
          <div className="absolute left-1/4 top-1/3 size-96 rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 size-96 rounded-full bg-primary/5 blur-3xl" />
        </div>

        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm text-primary">
            <Sparkles className="size-4" />
            <span>A new way to date</span>
          </div>

          <h1 className="mb-6 font-display text-5xl font-bold tracking-tight text-balance md:text-7xl">
            Play. Connect.{" "}
            <span className="bg-gradient-to-r from-primary to-pink-400 bg-clip-text text-transparent">
              Fall in Love.
            </span>
          </h1>

          <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-muted-foreground text-balance md:text-xl">
            FrontXO is a game-based dating platform where meaningful connections
            happen through gameplay. Play chess, complete challenges, and
            discover your perfect match.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" className="group px-8" asChild>
              <Link href="/signup">
                Get Started
                <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/login">Log In</Link>
            </Button>
          </div>

          <div className="mt-16 flex items-center justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="size-2 rounded-full bg-green-500" />
              <span>10K+ Active Players</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="size-2 rounded-full bg-primary" />
              <span>5K+ Matches Made</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <Section id="features" className="bg-muted/30">
        <div className="mb-12 text-center">
          <h2 className="mb-4 font-display text-3xl font-bold md:text-4xl">
            Why FrontXO?
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Skip the awkward small talk. Build real connections through shared
            experiences and playful competition.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <FeatureCard
            icon={Gamepad2}
            title="Play Games Together"
            description="Start with chess and unlock more games as you connect. Every move tells a story."
          />
          <FeatureCard
            icon={Sparkles}
            title="Fun Challenges"
            description="Complete interactive challenges to unlock new ways to communicate and connect."
          />
          <FeatureCard
            icon={Heart}
            title="Send Compliments"
            description="Express appreciation through thoughtful compliments earned by playing together."
          />
          <FeatureCard
            icon={Camera}
            title="Share Moments"
            description="Unlock photo sharing and voice notes as your connection deepens."
          />
        </div>
      </Section>

      {/* How It Works Section */}
      <Section id="how-it-works">
        <div className="mb-16 text-center">
          <h2 className="mb-4 font-display text-3xl font-bold md:text-4xl">
            How It Works
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Three simple steps to find your player two
          </p>
        </div>

        <div className="relative">
          {/* Connection line */}
          <div className="absolute left-1/2 top-8 hidden h-0.5 w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-primary/30 to-transparent lg:block" />

          <div className="grid gap-12 md:grid-cols-3">
            <StepCard
              step={1}
              title="Join"
              description="Create your profile and tell us about your gaming preferences and interests."
            />
            <StepCard
              step={2}
              title="Play"
              description="Get matched and start playing games together. No pressure, just fun."
            />
            <StepCard
              step={3}
              title="Connect"
              description="Unlock new ways to communicate as you progress through connection stages."
            />
          </div>
        </div>
      </Section>

      {/* CTA Section */}
      <Section className="bg-muted/30">
        <div className="relative overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/10 via-background to-primary/5 p-8 text-center md:p-16">
          <div className="absolute -left-24 -top-24 size-48 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute -bottom-24 -right-24 size-48 rounded-full bg-primary/10 blur-3xl" />

          <div className="relative z-10">
            <h2 className="mb-4 font-display text-3xl font-bold md:text-4xl">
              Ready to play?
            </h2>
            <p className="mx-auto mb-8 max-w-xl text-muted-foreground">
              Join thousands of players finding meaningful connections through
              the joy of gaming.
            </p>
            <Button size="lg" className="px-8" asChild>
              <Link href="/signup">
                Start Your Journey
                <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </Section>

      <Footer />
    </div>
  );
}
