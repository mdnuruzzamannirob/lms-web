export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category:
    | "Product Updates"
    | "Library Operations"
    | "Security"
    | "Implementation Guides";
  date: string;
  readTime: string;
  author: string;
  coverTag: string;
  keyTakeaways: string[];
  sections: Array<{ heading: string; body: string }>;
};

export const blogPosts: BlogPost[] = [
  {
    slug: "modern-library-workflow-launch",
    title: "Launching a modern library workflow",
    excerpt:
      "How digital-first circulation, reservations, and reminders improve library operations and reduce manual follow-up.",
    category: "Product Updates",
    date: "March 12, 2026",
    readTime: "7 min read",
    author: "Product Team",
    coverTag: "Workflow",
    keyTakeaways: [
      "Centralized circulation reduces process fragmentation.",
      "Automated reminders improve return rates.",
      "Reservation queues improve fairness for high-demand titles.",
    ],
    sections: [
      {
        heading: "Why workflows break at scale",
        body: "When circulation logs, member records, and payment notes live in separate systems, libraries spend more time reconciling data than serving members. A unified flow ensures status changes are visible across modules immediately.",
      },
      {
        heading: "What changed in LibraryMS",
        body: "Borrow, return, overdue, and fine events now move through explicit statuses with reliable transitions. Staff can audit exactly what happened, who performed the action, and what the next expected step is.",
      },
      {
        heading: "Operational impact",
        body: "Teams report fewer manual errors, faster desk operations, and improved member satisfaction due to clearer communication and predictable timelines.",
      },
    ],
  },
  {
    slug: "overdue-recovery-design-principles",
    title: "Designing better overdue recovery",
    excerpt:
      "Practical strategies for balancing member experience with policy enforcement in overdue and fine flows.",
    category: "Library Operations",
    date: "February 21, 2026",
    readTime: "6 min read",
    author: "Operations Team",
    coverTag: "Operations",
    keyTakeaways: [
      "Reminder cadence matters more than reminder volume.",
      "Transparent fine policies reduce support burden.",
      "Self-service payment options close issues faster.",
    ],
    sections: [
      {
        heading: "Start with clear policy language",
        body: "Members should understand due dates, grace periods, and fine calculations before borrowing. Clear policy content at checkout and in reminders reduces future disputes.",
      },
      {
        heading: "Use staged communication",
        body: "Gentle reminders before due date, immediate overdue alerts, and weekly summaries create accountability without overwhelming members or staff.",
      },
      {
        heading: "Link recovery to measurable metrics",
        body: "Track overdue volume, average days overdue, fine recovery rate, and repeat-overdue patterns to evaluate if policies are effective.",
      },
    ],
  },
  {
    slug: "library-analytics-that-actually-matter",
    title: "Library analytics that actually matter",
    excerpt:
      "The metrics that reveal usage trends, inventory pressure, and service quality for library teams.",
    category: "Implementation Guides",
    date: "January 30, 2026",
    readTime: "8 min read",
    author: "Data Team",
    coverTag: "Analytics",
    keyTakeaways: [
      "High borrow velocity highlights replenishment opportunities.",
      "Inactive membership signals engagement gaps.",
      "Category-level distribution guides smarter acquisitions.",
    ],
    sections: [
      {
        heading: "Demand signals",
        body: "Borrow frequency by title and category highlights where demand exceeds supply. This helps budget decisions for additional copies and new acquisitions.",
      },
      {
        heading: "Member behavior patterns",
        body: "Active member cohorts and renewal activity reveal adoption trends and help shape outreach and retention strategies.",
      },
      {
        heading: "Revenue and operational health",
        body: "Fine collection trends and payment completion rates indicate process efficiency and the impact of policy or workflow changes.",
      },
    ],
  },
  {
    slug: "secure-auth-patterns-for-library-platforms",
    title: "Secure auth patterns for library platforms",
    excerpt:
      "A practical look at OTP, token lifecycle, and role-based protections in production library systems.",
    category: "Security",
    date: "January 14, 2026",
    readTime: "5 min read",
    author: "Security Team",
    coverTag: "Security",
    keyTakeaways: [
      "Short-lived access tokens limit risk exposure.",
      "OTP verification protects onboarding and recovery flows.",
      "RBAC should be enforced in middleware and service layers.",
    ],
    sections: [
      {
        heading: "Token strategy",
        body: "Pair short access tokens with secure refresh tokens in httpOnly cookies. Refresh only when needed and revoke on suspicious behavior.",
      },
      {
        heading: "OTP safeguards",
        body: "Use hashed OTP values with TTL-based expiry. Limit resend and verify attempts to reduce abuse risks.",
      },
      {
        heading: "Role boundaries",
        body: "Apply admin-only constraints consistently across endpoints to prevent accidental privilege escalation.",
      },
    ],
  },
];

export const faqItems = [
  {
    question: "How long does onboarding usually take?",
    answer:
      "Most libraries complete baseline setup in 1–3 days, depending on data quality and migration readiness.",
  },
  {
    question: "Can we migrate existing books and member records?",
    answer:
      "Yes. LibraryMS supports structured import workflows for catalogs, members, and circulation-related data.",
  },
  {
    question: "Do you support multi-branch libraries?",
    answer:
      "Yes. Multi-branch support is available in higher plans with centralized reporting and branch-level controls.",
  },
  {
    question: "Is online fine payment available?",
    answer:
      "Yes. Stripe-based online payments are supported, alongside manual cash/card payment recording.",
  },
  {
    question: "What kind of support is included?",
    answer:
      "All plans include support, with faster response and guided implementation for Growth and Enterprise plans.",
  },
  {
    question: "Can we customize policies and reminders?",
    answer:
      "Yes. Borrow durations, fine policies, reminder timing, and membership constraints are configurable.",
  },
];

export const pricingPlans = [
  {
    name: "Starter",
    monthly: 39,
    yearly: 31,
    description: "For small libraries beginning digital circulation.",
    badge: "Best for small teams",
    features: [
      "Up to 3,000 books",
      "Up to 800 members",
      "Core borrow/return workflow",
      "Email reminders",
      "Basic analytics",
    ],
    cta: "Start Starter",
  },
  {
    name: "Growth",
    monthly: 99,
    yearly: 79,
    description: "For libraries with growing circulation and reporting needs.",
    badge: "Most popular",
    features: [
      "Up to 30,000 books",
      "Up to 8,000 members",
      "Reservations and fines",
      "Advanced reports",
      "Priority support",
    ],
    cta: "Choose Growth",
    highlighted: true,
  },
  {
    name: "Enterprise",
    monthly: null,
    yearly: null,
    description: "For university systems and multi-branch institutions.",
    badge: "Custom scale",
    features: [
      "Unlimited catalog and members",
      "Multi-branch governance",
      "SSO and advanced security review",
      "Dedicated onboarding manager",
      "Custom integration support",
    ],
    cta: "Talk to sales",
  },
] as Array<{
  name: string;
  monthly: number | null;
  yearly: number | null;
  description: string;
  badge: string;
  features: string[];
  cta: string;
  highlighted?: boolean;
}>;
