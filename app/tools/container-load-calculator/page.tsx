"use client";

import { useState } from "react";

export default function ContainerLoadCalculator() {
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [qty, setQty] = useState("");

  const containerCBM = 67.7;

  const cartonCBM =
    (Number(length) / 100) *
    (Number(width) / 100) *
    (Number(height) / 100);

  const totalCBM = cartonCBM * Number(qty);

  const utilization = ((totalCBM / containerCBM) * 100).toFixed(1);

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-16">
      <div className="mx-auto max-w-4xl">
        <div className="mb-10">
          <h1 className="text-4xl font-black text-slate-900">
            Container Load Calculator
          </h1>

          <p className="mt-4 text-lg text-slate-600">
            Estimate shipment CBM and approximate 40HC container utilization.
          </p>
        </div>

        <div className="rounded-3xl bg-white p-8 shadow-xl">
          <div className="grid gap-6 md:grid-cols-2">
            <InputField
              label="Carton Length (cm)"
              value={length}
              onChange={setLength}
            />

            <InputField
              label="Carton Width (cm)"
              value={width}
              onChange={setWidth}
            />

            <InputField
              label="Carton Height (cm)"
              value={height}
              onChange={setHeight}
            />

            <InputField
              label="Quantity"
              value={qty}
              onChange={setQty}
            />
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <ResultCard
              title="Carton CBM"
              value={cartonCBM ? cartonCBM.toFixed(3) : "0"}
            />

            <ResultCard
              title="Total Shipment CBM"
              value={totalCBM ? totalCBM.toFixed(2) : "0"}
            />

            <ResultCard
              title="40HC Utilization"
              value={utilization ? `${utilization}%` : "0%"}
            />
          </div>

          <div className="mt-10 rounded-2xl bg-green-50 p-5">
            <p className="font-bold text-green-800">
              Standard 40HC container capacity used:
            </p>

            <p className="mt-2 text-green-700">
              Approx. 67.7 CBM
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

function InputField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label className="mb-2 block font-bold text-slate-700">
        {label}
      </label>

      <input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-2xl border border-slate-300 px-4 py-4 outline-none focus:border-green-500"
      />
    </div>
  );
}

function ResultCard({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-3xl bg-slate-900 p-6 text-white">
      <p className="text-sm text-slate-300">{title}</p>

      <p className="mt-3 text-3xl font-black text-green-400">
        {value}
      </p>
    </div>
  );
}