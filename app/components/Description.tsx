const Description = () => {
  return (
    <div className="max-w-3xl mx-auto text-center space-y-4">
      <p className="text-lg text-slate-100/90">
        Mars Photo Intelligence pairs NASA&apos;s rover feeds with analytics, storytelling, and exploratory tools.
        Surface missions become case studies in computer vision, data visualization, and resilient interface design.
      </p>
      <div className="grid grid-cols-1 gap-3 text-left sm:grid-cols-2">
        {[
          {
            title: "Mission telemetry",
            detail: "Multi-rover, multi-camera ingestion with caching, enrichment, and filtering."
          },
          {
            title: "Insight overlays",
            detail: "Quality scoring, landing-site context, and trend summaries for every capture."
          },
          {
            title: "Human stories",
            detail: "Narrative guides highlight science targets, anomalies, and engineering feats."
          },
          {
            title: "Production mindset",
            detail: "TypeScript, modular architecture, and deployment-ready configurations."
          }
        ].map((item) => (
          <div key={item.title} className="rounded-xl border border-white/10 bg-white/5 p-4">
            <p className="text-sm uppercase tracking-wide text-amber-300">{item.title}</p>
            <p className="text-base text-slate-100">{item.detail}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Description;
