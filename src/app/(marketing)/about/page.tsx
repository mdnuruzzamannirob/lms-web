import type { Metadata } from "next";
import Image from "next/image";
import {
  BookOpen,
  Users,
  ShieldCheck,
  BarChart3,
  Goal,
  Sparkles,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";

// ─── Metadata ─────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "About",
  description: "Learn about LibraryMS and our mission.",
};

// ─── Types ────────────────────────────────────────────────────────────────────

interface Value {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface Milestone {
  year: string;
  title: string;
  description: string;
  image: string;
}

interface ImpactStat {
  label: string;
  value: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const VALUES: Value[] = [
  {
    icon: BookOpen,
    title: "Library-first",
    description:
      "Every feature is designed around real library workflows and daily staff operations.",
  },
  {
    icon: Users,
    title: "Member-centric",
    description:
      "We help institutions deliver a smooth borrowing experience for every member.",
  },
  {
    icon: ShieldCheck,
    title: "Secure by default",
    description:
      "Authentication, validation, and strict role-based access are built into the core.",
  },
  {
    icon: BarChart3,
    title: "Insight-driven",
    description:
      "Actionable reports and analytics help teams make better operational decisions.",
  },
  {
    icon: Goal,
    title: "Our mission",
    description:
      "Empower libraries with reliable software so staff can focus more on learners, readers, and communities.",
  },
  {
    icon: Sparkles,
    title: "What we value",
    description:
      "Clarity, reliability, and measurable impact across day-to-day library workflows.",
  },
];

const MILESTONES: Milestone[] = [
  {
    year: "2024",
    title: "Foundation",
    description: "Started with a focused mission: simplify library operations.",
    image:
      "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=600&q=80",
  },
  {
    year: "2025",
    title: "Core Platform",
    description:
      "Launched core circulation, member, and fine management modules.",
    image:
      "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=600&q=80",
  },
  {
    year: "2026",
    title: "Scale & Insights",
    description:
      "Expanded analytics, automation, and payment workflows for larger institutions.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80",
  },
];

const IMPACT_STATS: ImpactStat[] = [
  { label: "Libraries using LibraryMS", value: "120+" },
  { label: "Catalog records managed", value: "2.1M+" },
  { label: "Borrow transactions processed", value: "8.5M+" },
  { label: "Average setup time", value: "< 3 days" },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-3">
      {children}
    </p>
  );
}

function SectionHeading({
  as: Tag = "h2",
  children,
}: {
  as?: "h1" | "h2";
  children: React.ReactNode;
}) {
  return (
    <Tag className="font-serif text-3xl sm:text-4xl font-bold leading-tight tracking-tight text-foreground mb-4">
      {children}
    </Tag>
  );
}

function ValueCard({
  icon: Icon,
  title,
  description,
  index,
}: Value & { index: number }) {
  return (
    <article className="relative p-6 bg-card border-r border-b border-border transition-colors hover:bg-muted last-of-type:border-b-0 [&:nth-child(3n)]:border-r-0 [&:nth-child(n+4)]:border-b-0">
      <span
        aria-hidden="true"
        className="absolute top-4 right-5 font-serif text-4xl font-bold leading-none text-border select-none pointer-events-none"
      >
        {String(index + 1).padStart(2, "0")}
      </span>
      <div className="size-9 flex items-center justify-center rounded-md border border-border text-primary mb-4">
        <Icon size={15} />
      </div>
      <h3 className="text-sm font-semibold text-foreground mb-1">{title}</h3>
      <p className="text-xs leading-relaxed text-muted-foreground">
        {description}
      </p>
    </article>
  );
}

function MilestoneCard({ year, title, description, image }: Milestone) {
  return (
    <article className="rounded-lg border border-border bg-card overflow-hidden transition-shadow hover:shadow-md">
      <div className="relative h-36 overflow-hidden">
        <Image
          src={image}
          alt={`${title} — ${year}`}
          fill
          className="object-cover transition-transform duration-500 hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
      <div className="p-5">
        <p className="text-[0.65rem] font-semibold tracking-[0.18em] uppercase text-primary mb-1">
          {year}
        </p>
        <h3 className="font-serif text-base font-semibold text-card-foreground mb-1">
          {title}
        </h3>
        <p className="text-xs leading-relaxed text-muted-foreground">
          {description}
        </p>
      </div>
    </article>
  );
}

function ImpactCard({ label, value }: ImpactStat) {
  return (
    <article className="relative px-6 py-9 text-center bg-card border-r border-border last:border-r-0 transition-colors hover:bg-muted group">
      <p className="font-serif text-3xl sm:text-4xl font-bold text-foreground leading-none mb-2">
        {value}
      </p>
      <p className="text-[0.7rem] font-medium text-muted-foreground uppercase tracking-wide leading-snug">
        {label}
      </p>
      <span
        aria-hidden="true"
        className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] w-0 bg-primary transition-all duration-300 group-hover:w-1/2"
      />
    </article>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AboutPage() {
  return (
    <>
      {/* ── Hero ───────────────────────────────────────────────────────────── */}
      <section className="app-container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center py-16 md:py-20">
          {/* Copy */}
          <div>
            <p className="flex items-center gap-3 text-[0.7rem] font-semibold tracking-[0.2em] uppercase text-primary mb-6 before:block before:w-7 before:h-px before:bg-primary before:shrink-0">
              About LibraryMS
            </p>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-[4rem] font-bold leading-[1.07] tracking-tight text-foreground mb-6">
              Modern tools for
              <br />
              <em className="not-italic italic text-primary">timeless</em>{" "}
              institutions
            </h1>
            <p className="text-base leading-7 text-muted-foreground max-w-[42ch] mb-8">
              LibraryMS helps institutions modernize book circulation, member
              management, and reporting in one unified platform built for the
              people who run libraries every day.
            </p>
            <a
              href="#mission"
              className="inline-flex items-center gap-2 text-[0.78rem] font-semibold tracking-widest uppercase text-foreground border-b border-foreground pb-0.5 no-underline transition-[gap] duration-200 hover:gap-4"
            >
              Explore our story <ArrowRight size={13} />
            </a>
          </div>

          {/* Image */}
          <div className="relative rounded-xl overflow-hidden h-[340px] sm:h-[420px] border border-border">
            <Image
              src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=900&q=80"
              alt="Library interior with rows of books"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            {/* Badge — primary coloured */}
            <div className="absolute bottom-5 left-5 bg-primary/10 border border-primary/25 backdrop-blur-md rounded-lg px-4 py-3">
              <p className="font-serif text-2xl font-bold leading-none text-primary">
                120+
              </p>
              <p className="text-[0.62rem] font-semibold tracking-widest uppercase text-primary opacity-80 mt-1">
                Libraries worldwide
              </p>
            </div>
          </div>
        </div>
      </section>

      <hr className="border-t border-border" />

      {/* ── Mission ────────────────────────────────────────────────────────── */}
      <section id="mission" className="app-container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center py-16 md:py-20">
          {/* Images collage */}
          <div className="grid grid-cols-2 gap-2" aria-hidden="true">
            <div className="col-span-2 relative h-48 rounded-lg overflow-hidden border border-border">
              <Image
                src="https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=800&q=80"
                alt="Library shelves"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="relative h-40 rounded-lg overflow-hidden border border-border">
              <Image
                src="https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600&q=80"
                alt="Open book on a desk"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>
            <div className="relative h-40 rounded-lg overflow-hidden border border-border">
              <Image
                src="https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600&q=80"
                alt="Person reading"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>
          </div>

          {/* Copy */}
          <div>
            <SectionEyebrow>Our Purpose</SectionEyebrow>
            <SectionHeading>
              Empower staff.
              <br />
              <em className="not-italic italic text-primary">Serve</em>{" "}
              communities.
            </SectionHeading>
            <p className="text-sm leading-7 text-muted-foreground max-w-[44ch]">
              Libraries are the backbone of knowledge communities. LibraryMS
              exists so that staff can spend less time on administrative
              overhead and more time connecting readers with the right resources
              — creating lasting impact for learners and communities alike.
            </p>
          </div>
        </div>
      </section>

      <hr className="border-t border-border" />

      {/* ── Values ─────────────────────────────────────────────────────────── */}
      <section className="app-container py-12 md:py-16">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <SectionHeading>
            What we <em className="not-italic italic text-primary">stand</em>{" "}
            for
          </SectionHeading>
          <p className="text-sm leading-7 text-muted-foreground max-w-[38ch] sm:flex-shrink-0">
            Six principles guide every product decision, every feature shipped,
            and every institution we partner with.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 rounded-lg border border-border overflow-hidden">
          {VALUES.map((value, i) => (
            <ValueCard key={value.title} {...value} index={i} />
          ))}
        </div>
      </section>

      <hr className="border-t border-border" />

      {/* ── Journey ────────────────────────────────────────────────────────── */}
      <section className="app-container py-12 md:py-16">
        <SectionEyebrow>Timeline</SectionEyebrow>
        <SectionHeading>
          Our <em className="not-italic italic text-primary">journey</em> so far
        </SectionHeading>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-2">
          {MILESTONES.map((m) => (
            <MilestoneCard key={m.year} {...m} />
          ))}
        </div>
      </section>

      <hr className="border-t border-border" />

      {/* ── Impact ─────────────────────────────────────────────────────────── */}
      <section className="app-container py-12 md:py-16">
        <SectionEyebrow>By the numbers</SectionEyebrow>
        <SectionHeading>
          Operational <em className="not-italic italic text-primary">impact</em>
        </SectionHeading>
        <div className="grid grid-cols-2 lg:grid-cols-4 rounded-lg border border-border overflow-hidden mt-2">
          {IMPACT_STATS.map((stat) => (
            <ImpactCard key={stat.label} {...stat} />
          ))}
        </div>
      </section>

      <hr className="border-t border-border" />

      {/* ── Team ───────────────────────────────────────────────────────────── */}
      <section className="app-container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center py-16 md:py-20">
          {/* Images collage */}
          <div className="hidden md:grid grid-cols-2 gap-2" aria-hidden="true">
            <div className="col-span-2 relative h-48 rounded-lg overflow-hidden border border-border">
              <Image
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=900&q=80"
                alt="Team collaborating"
                fill
                className="object-cover"
                sizes="50vw"
              />
            </div>
            <div className="relative h-40 rounded-lg overflow-hidden border border-border">
              <Image
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80"
                alt="Team member"
                fill
                className="object-cover"
                sizes="25vw"
              />
            </div>
            <div className="relative h-40 rounded-lg overflow-hidden border border-border">
              <Image
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&q=80"
                alt="Team member"
                fill
                className="object-cover"
                sizes="25vw"
              />
            </div>
          </div>

          {/* Copy */}
          <div>
            <SectionEyebrow>The people</SectionEyebrow>
            <SectionHeading>
              Built by people
              <br />
              who <em className="not-italic italic text-primary">care</em>
            </SectionHeading>
            <p className="text-sm leading-7 text-muted-foreground max-w-[44ch]">
              Our team combines software engineering expertise with deep
              knowledge of how libraries actually operate — from cataloging to
              community programs.
            </p>
            <div className="w-10 h-px bg-primary my-6" aria-hidden="true" />
            <ul className="flex flex-col gap-2">
              {[
                "Deep domain expertise in library operations",
                "Committed to long-term institutional relationships",
                "Responsive, human support at every stage",
                "Continuous iteration based on real staff feedback",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2.5 text-sm text-muted-foreground"
                >
                  <span
                    aria-hidden="true"
                    className="size-1.5 rounded-full bg-primary shrink-0"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
