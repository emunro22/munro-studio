// Renders a post's `body` array — each item is a plain string (paragraph),
// { h: "..." } for a subheading, { list: ["...", ...] } for a bullet list,
// or { quote: "..." } for a pull-quote.
export default function BlogPostBody({ body }) {
  return (
    <div className="prose-blog">
      {body.map((block, i) => {
        if (typeof block === "string") {
          return (
            <p key={i} className="text-sm md:text-base text-ink-soft leading-relaxed font-light mb-5">
              {block}
            </p>
          );
        }
        if (block.h) {
          return (
            <h2 key={i} className="font-display text-xl md:text-2xl font-black text-ink mt-10 mb-4 leading-tight">
              {block.h}
            </h2>
          );
        }
        if (block.list) {
          return (
            <ul key={i} className="space-y-2 mb-5 pl-1">
              {block.list.map((item, j) => (
                <li key={j} className="flex items-start gap-2.5 text-sm md:text-base text-ink-soft font-light leading-relaxed">
                  <span className="text-highlight flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-highlight" />
                  {item}
                </li>
              ))}
            </ul>
          );
        }
        if (block.quote) {
          return (
            <blockquote key={i} className="border-l-2 border-highlight pl-5 my-7 text-base md:text-lg text-ink font-medium italic leading-relaxed">
              {block.quote}
            </blockquote>
          );
        }
        return null;
      })}
    </div>
  );
}
