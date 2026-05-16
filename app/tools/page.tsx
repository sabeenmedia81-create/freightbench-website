import Link from "next/link";

const tools = [
  {
    title: "Air Freight Chargeable Weight Calculator",
    description:
      "Calculate volumetric weight, gross weight, and final chargeable weight with Excel upload support.",
    href: "/tools/chargeable-weight-calculator",
    status: "Live",
  },
  {
    title: "Container Load Calculator",
    description:
      "Optimize container utilization and estimate loading efficiency for shipments.",
    href: "/tools/container-load-calculator",
    status: "Coming Soon",
  },
  {
    title: "Incoterms Decision Tool",
    description:
      "Compare Incoterms responsibilities, freight ownership, customs obligations, and risk transfer.",
    href: "/tools/incoterms-decision-tool",
    status: "Coming Soon",
  },
  {
    title: "CBM Calculator",
    description:
      "Calculate shipment cubic volume and logistics planning dimensions.",
    href: "#",
    status: "Planned",
  },
  {
    title: "Air vs Sea Cost Analyzer",
    description:
      "Compare transit time, estimated freight cost, and shipment efficiency.",
    href: "#",
    status: "Planned",
  },
  {
    title: "Duty & VAT Estimator",
    description:
      "Estimate import duties and VAT impact across logistics scenarios.",
    href: "#",
    status: "Planned",
  },
];

export default function ToolsPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-16 text-slate-900">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <p className="mb-4 inline-block rounded-full bg-green-100 px-4 py-2 text-sm font-bold text-green-700">
            FreightBench Smart Logistics Platform
          </p>

          <h1 className="text-5xl font-black md:text-6xl">
            FreightBench Tools Hub
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-600">
            Professional logistics calculators and supply chain intelligence
            tools designed to support freight optimization, shipment planning,
            operational visibility, and smarter logistics decisions.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {tools.map((tool) => (
            <div
              key={tool.title}
              className="rounded-3xl bg-white p-7 shadow-xl transition hover:-translate-y-1 hover:shadow-2xl"
            >
              <div className="mb-5 flex items-center justify-between">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-black ${
                    tool.status === "Live"
                      ? "bg-green-100 text-green-700"
                      : tool.status === "Coming Soon"
                      ? "bg-amber-100 text-amber-700"
                      : "bg-slate-200 text-slate-700"
                  }`}
                >
                  {tool.status}
                </span>
              </div>

              <h2 className="text-2xl font-black leading-tight">
                {tool.title}
              </h2>

              <p className="mt-4 leading-7 text-slate-600">
                {tool.description}
              </p>

              <div className="mt-8">
                {tool.status === "Live" ? (
                  <Link
                    href={tool.href}
                    className="inline-flex rounded-2xl bg-slate-900 px-5 py-3 font-bold text-white transition hover:bg-slate-800"
                  >
                    Open Tool
                  </Link>
                ) : (
                  <button
                    disabled
                    className="cursor-not-allowed rounded-2xl bg-slate-200 px-5 py-3 font-bold text-slate-500"
                  >
                    {tool.status}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 rounded-3xl bg-slate-900 p-10 text-white shadow-2xl">
          <h2 className="text-3xl font-black">
            FreightBench Platform Vision
          </h2>

          <p className="mt-5 max-w-4xl text-lg leading-8 text-slate-300">
            FreightBench is being developed as a logistics intelligence platform
            combining smart freight calculators, benchmarking tools, shipment
            analytics, and operational optimization utilities for supply chain
            professionals worldwide.
          </p>
        </div>
      </div>
    </main>
  );
}