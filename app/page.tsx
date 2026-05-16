export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <section className="bg-white px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <nav className="mb-16 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-black">
                <span className="text-slate-900">Freight</span>
                <span className="text-green-600">Bench</span>
              </h1>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
                Benchmark. Analyze. Optimize.
              </p>
            </div>

            <div className="hidden gap-6 text-sm font-semibold md:flex">
              <a href="/tools" className="hover:text-green-700">Free Tools</a>
              <a href="#platform" className="hover:text-green-700">Platform</a>
              <a href="#contact" className="hover:text-green-700">Contact</a>
            </div>
          </nav>

          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="mb-4 inline-block rounded-full bg-green-50 px-4 py-2 text-sm font-bold text-green-700">
                Freight intelligence tools for smarter logistics decisions
              </p>

              <h2 className="text-5xl font-black leading-tight tracking-tight md:text-6xl">
                Benchmark Your Freight Decisions
              </h2>

              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
                Free logistics calculators and freight optimization tools designed to help businesses estimate cost,
                improve planning, and reduce operational inefficiencies.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <a
                  href="/tools"
                  className="rounded-2xl bg-slate-900 px-7 py-4 text-center font-bold text-white hover:bg-slate-800"
                >
                  Try Free Tools
                </a>
                <a
                  href="#platform"
                  className="rounded-2xl border border-slate-300 bg-white px-7 py-4 text-center font-bold text-slate-900 hover:border-green-600 hover:text-green-700"
                >
                  Explore Platform
                </a>
              </div>
            </div>

            <div className="rounded-[2rem] bg-slate-950 p-6 text-white shadow-2xl">
              <p className="text-sm font-bold text-green-400">FreightBench Dashboard</p>
              <h3 className="mt-2 text-2xl font-black">Shipment Benchmark View</h3>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <Metric title="Container Utilization" value="87%" />
                <Metric title="Chargeable Weight" value="2,840 kg" />
                <Metric title="Estimated Saving" value="12.5%" />
                <Metric title="Risk Level" value="Medium" />
              </div>

              <div className="mt-6 rounded-3xl bg-white/10 p-5">
                <div className="flex justify-between">
                  <p className="font-bold">Optimization Score</p>
                  <p className="font-black text-green-400">78/100</p>
                </div>
                <div className="mt-4 h-3 rounded-full bg-white/20">
                  <div className="h-3 w-[78%] rounded-full bg-green-500" />
                </div>
                <p className="mt-4 text-sm text-slate-300">
                  Your container is well utilized, but air freight chargeable weight may need review.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="tools" className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-black uppercase tracking-[0.25em] text-green-700">Free Tools</p>
            <h2 className="mt-3 text-4xl font-black">Start with practical freight calculators</h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              Use free tools to calculate, compare, and understand common freight decision points.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <ToolCard
              title="Container Load Calculator"
              tag="Most Popular"
              description="Estimate container requirement, utilization, and cost per unit using multi-SKU cargo inputs."
            />
            <ToolCard
              title="Chargeable Weight Calculator"
              tag="Air Freight"
              description="Calculate gross, volumetric, and chargeable weight for air freight shipments."
            />
            <ToolCard
              title="Incoterms Decision Tool"
              tag="Trade Terms"
              description="Select practical Incoterms based on buyer, seller, customs, freight, and risk responsibility."
            />
            <ToolCard
              title="CBM Calculator"
              tag="Coming Soon"
              description="Quickly calculate shipment CBM by carton size, quantity, and package configuration."
            />
            <ToolCard
              title="Freight Cost Estimator"
              tag="Coming Soon"
              description="Estimate basic freight cost using weight, rate, mode, and expected shipment volume."
            />
            <ToolCard
              title="Pallet Loading Calculator"
              tag="Coming Soon"
              description="Check how many cartons fit on a pallet and identify packaging optimization opportunities."
            />
          </div>
        </div>
      </section>

      <section id="platform" className="bg-slate-950 px-6 py-20 text-white">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-black uppercase tracking-[0.25em] text-green-400">Platform Vision</p>
          <h2 className="mt-3 text-4xl font-black">More than calculators</h2>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
            FreightBench is designed to evolve into a freight intelligence platform for benchmarking quotes,
            analyzing shipment profiles, comparing routing options, and improving cost decisions.
          </p>

          <div className="mt-10 grid gap-4 md:grid-cols-4">
            <Feature text="Quote benchmarking" />
            <Feature text="Freight cost analysis" />
            <Feature text="Container optimization" />
            <Feature text="Decision dashboards" />
          </div>
        </div>
      </section>

      <section id="contact" className="bg-white px-6 py-20">
        <div className="mx-auto max-w-7xl rounded-[2rem] bg-slate-900 p-10 text-white">
          <h2 className="text-4xl font-black">Start free. Upgrade when planning gets serious.</h2>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
            Users can run limited free calculations, then upgrade for unlimited usage, Excel uploads, PDF exports,
            saved projects, and advanced optimization reports.
          </p>

          <button className="mt-8 rounded-2xl bg-green-500 px-7 py-4 font-black text-white hover:bg-green-600">
            Join Early Access
          </button>
        </div>
      </section>

      <footer className="bg-slate-950 px-6 py-8 text-white">
        <div className="mx-auto max-w-7xl">
          <p className="text-2xl font-black">
            Freight<span className="text-green-400">Bench</span>
          </p>
          <p className="mt-2 text-sm text-slate-400">
            © 2026 FreightBench. Freight intelligence and optimization tools.
          </p>
        </div>
      </footer>
    </main>
  );
}

function Metric({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-3xl bg-white/10 p-5">
      <p className="text-sm text-slate-300">{title}</p>
      <p className="mt-2 text-2xl font-black text-white">{value}</p>
    </div>
  );
}

function ToolCard({ title, tag, description }: { title: string; tag: string; description: string }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-green-300 hover:shadow-xl">
      <div className="mb-5 flex items-center justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-lg font-black text-white">
          F<span className="text-green-400">B</span>
        </div>
        <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-bold text-green-700">{tag}</span>
      </div>

      <h3 className="text-xl font-black">{title}</h3>
      <p className="mt-3 min-h-[84px] leading-7 text-slate-600">{description}</p>

      <a
  href={
    title === "Container Load Calculator"
      ? "/tools/container-load-calculator"
      : title === "Chargeable Weight Calculator"
      ? "/tools/chargeable-weight-calculator"
      : title === "Incoterms Decision Tool"
      ? "/tools/incoterms-decision-tool"
      : "#"
  }
  className="mt-6 block w-full rounded-2xl bg-slate-50 px-5 py-4 text-center font-bold text-slate-900 hover:bg-slate-900 hover:text-white"
>
  Open Tool
</a>
    </div>
  );
}

function Feature({ text }: { text: string }) {
  return (
    <div className="rounded-2xl bg-white/10 p-4 font-bold text-slate-100">
      <span className="mr-2 text-green-400">✓</span>
      {text}
    </div>
  );
}