// Not imported anywhere at runtime. Scraped page content (legal pages,
// membership, price-match, verified-peptides, wholesale, contact, ...) is
// stored in the database and injected via dangerouslySetInnerHTML — it lives
// outside this source tree, so Tailwind's build-time class scanner never
// sees the utility classes it uses and silently generates no CSS for them.
// Listing every class literal here, inside a file Tailwind does scan, is
// what makes it actually compile the rules those pages depend on.
export const SCRAPED_TAILWIND_SAFELIST = [
  "bg-accent", "bg-background", "bg-white", "block", "border", "border-y",
  "container", "divide-y", "first:mt-0", "flex", "flex-1", "flex-col",
  "flex-shrink-0", "flex-wrap", "focus:ring-2", "focus:ring-offset-1",
  "font-bold", "font-display", "font-mono",
  "font-normal", "font-semibold", "gap-1.5", "gap-2", "gap-3", "gap-4",
  "gap-5", "gap-8", "grid", "h-11", "h-5", "h-7", "hover:opacity-90",
  "hover:text-foreground", "hover:underline", "inline-flex", "items-center",
  "items-start", "items-stretch", "justify-center", "leading-6",
  "leading-relaxed", "leading-snug", "lg:grid-cols-4",
  "max-sm:!border-[color:var(--line)]", "max-sm:!border-b",
  "max-sm:!border-r-0", "max-sm:!gap-[10px]", "max-sm:!gap-[6px]",
  "max-sm:!gap-[8px]", "max-sm:!grid-cols-1",
  "max-sm:!grid-cols-[20px_30px_minmax(0,1fr)_auto]",
  "max-sm:!grid-cols-[38px_minmax(0,1fr)_auto]",
  "max-sm:!grid-cols-[minmax(0,1fr)_22px]", "max-sm:!hidden",
  "max-sm:!px-[12px]", "max-sm:last:!border-b-0", "max-w-2xl", "max-w-3xl",
  "max-w-5xl", "max-w-[760px]", "max-w-md", "mb-1.5", "md:grid-cols-2",
  "md:grid-cols-3", "md:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)]",
  "md:items-start", "min-h-[60vh]", "mt-0.5", "mt-1", "mt-10", "mt-12",
  "mt-2", "mt-3", "mt-4", "mt-5", "mt-6", "mt-8", "mx-auto", "not-italic",
  "outline-none", "p-4", "p-6", "px-2.5", "px-3", "px-4", "px-5", "py-0.5",
  "py-12", "py-2", "py-2.5", "py-24", "py-3.5", "py-4", "py-8",
  "rounded-2xl", "rounded-[10px]", "rounded-full", "rounded-lg", "rounded-md",
  "rounded-xl", "scroll-mt-24", "self-start", "shrink-0", "sm:px-5",
  "sm:px-6", "sm:py-16", "sm:py-4", "sm:text-[14px]", "space-y-2",
  "space-y-3", "space-y-6", "text-2xl", "text-3xl", "text-4xl",
  "text-[11.5px]", "text-[11px]", "text-[12.5px]", "text-[12px]",
  "text-[13.5px]", "text-[13px]", "text-[15px]", "text-accent",
  "text-center", "text-foreground", "text-lg", "text-muted-foreground",
  "text-sm", "text-white", "text-xl", "text-xs", "tracking-[0.08em]",
  "tracking-wide", "transition-opacity", "underline", "uppercase", "w-5",
  "w-7", "w-full",
];
