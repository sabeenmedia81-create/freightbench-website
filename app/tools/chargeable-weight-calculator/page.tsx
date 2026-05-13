"use client";

import { useMemo, useRef, useState } from "react";
import * as XLSX from "xlsx";

type CargoLine = {
  id: number;
  description: string;
  length: string;
  width: string;
  height: string;
  pieces: string;
  grossWeight: string;
  stackable: "Yes" | "No";
};

const initialLines: CargoLine[] = [
  {
    id: 1,
    description: "Box Type A",
    length: "",
    width: "",
    height: "",
    pieces: "1",
    grossWeight: "",
    stackable: "Yes",
  },
];

export default function ChargeableWeightCalculator() {
  const [lines, setLines] = useState<CargoLine[]>(initialLines);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const results = useMemo(() => {
    const calculatedLines = lines.map((line) => {
      const l = Number(line.length) || 0;
      const w = Number(line.width) || 0;
      const h = Number(line.height) || 0;
      const p = Number(line.pieces) || 0;
      const gw = Number(line.grossWeight) || 0;

      const volumetricWeight = (l * w * h * p) / 6000;

      return {
        ...line,
        volumetricWeight,
        grossWeightNumber: gw,
        piecesNumber: p,
      };
    });

    const totalVolumetricWeight = calculatedLines.reduce(
      (sum, line) => sum + line.volumetricWeight,
      0
    );

    const totalGrossWeight = calculatedLines.reduce(
      (sum, line) => sum + line.grossWeightNumber,
      0
    );

    const totalPieces = calculatedLines.reduce(
      (sum, line) => sum + line.piecesNumber,
      0
    );

    const chargeableWeight = Math.max(
      totalVolumetricWeight,
      totalGrossWeight
    );

    const basis =
      totalVolumetricWeight > totalGrossWeight
        ? "Volumetric Weight"
        : "Gross Weight";

    const hasNonStackable = calculatedLines.some(
      (line) => line.stackable === "No"
    );

    return {
      calculatedLines,
      totalVolumetricWeight,
      totalGrossWeight,
      totalPieces,
      chargeableWeight,
      basis,
      hasNonStackable,
    };
  }, [lines]);

  function updateLine(id: number, field: keyof CargoLine, value: string) {
    setLines((current) =>
      current.map((line) =>
        line.id === id ? { ...line, [field]: value } : line
      )
    );
  }

  function addLine() {
    setLines((current) => [
      ...current,
      {
        id: Date.now(),
        description: `Box Type ${current.length + 1}`,
        length: "",
        width: "",
        height: "",
        pieces: "1",
        grossWeight: "",
        stackable: "Yes",
      },
    ]);
  }

  function removeLine(id: number) {
    setLines((current) => current.filter((line) => line.id !== id));
  }

  function downloadTemplate() {
    const template = [
      {
        Description: "Carton A",
        Length_cm: 50,
        Width_cm: 40,
        Height_cm: 35,
        Pieces: 10,
        Gross_Weight_kg: 250,
        Stackable: "Yes",
      },
    ];

    const worksheet = XLSX.utils.json_to_sheet(template);

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Chargeable Weight Template"
    );

    XLSX.writeFile(workbook, "FreightBench_Chargeable_Weight_Template.xlsx");
  }

  function handleFileUpload(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = (e) => {
      const data = e.target?.result;

      const workbook = XLSX.read(data, { type: "binary" });

      const sheetName = workbook.SheetNames[0];

      const worksheet = workbook.Sheets[sheetName];

      const jsonData = XLSX.utils.sheet_to_json<any>(worksheet);

      const importedLines: CargoLine[] = jsonData.map(
        (row: any, index: number) => ({
          id: Date.now() + index,
          description: row.Description?.toString() || "",
          length: row.Length_cm?.toString() || "",
          width: row.Width_cm?.toString() || "",
          height: row.Height_cm?.toString() || "",
          pieces: row.Pieces?.toString() || "1",
          grossWeight:
            row.Gross_Weight_kg?.toString() || "",
          stackable:
            row.Stackable === "No" ? "No" : "Yes",
        })
      );

      if (importedLines.length > 0) {
        setLines(importedLines);
      }
    };

    reader.readAsBinaryString(file);
  }

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-16 text-slate-900">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <p className="mb-4 inline-block rounded-full bg-green-100 px-4 py-2 text-sm font-bold text-green-700">
            FreightBench Smart Tool
          </p>

          <h1 className="text-4xl font-black md:text-5xl">
            Air Freight Chargeable Weight Calculator
          </h1>

          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-slate-600">
            Professional logistics calculator supporting multiple cargo
            lines and Excel upload.
          </p>
        </div>

        <div className="mb-8 flex flex-wrap gap-4">
          <button
            onClick={downloadTemplate}
            className="rounded-2xl bg-green-600 px-5 py-3 font-bold text-white hover:bg-green-700"
          >
            Download Excel Template
          </button>

          <button
            onClick={() => fileInputRef.current?.click()}
            className="rounded-2xl bg-blue-600 px-5 py-3 font-bold text-white hover:bg-blue-700"
          >
            Upload Excel File
          </button>

          <input
            type="file"
            accept=".xlsx,.xls"
            ref={fileInputRef}
            onChange={handleFileUpload}
            className="hidden"
          />
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <section className="rounded-3xl bg-white p-6 shadow-xl lg:col-span-2">
            <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-2xl font-black">Cargo Lines</h2>
              </div>

              <button
                onClick={addLine}
                className="rounded-2xl bg-slate-900 px-5 py-3 font-bold text-white hover:bg-slate-800"
              >
                + Add Box Type
              </button>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-200">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-100 text-slate-600">
                  <tr>
                    <th className="p-2">Description</th>
                    <th className="p-2">L cm</th>
                    <th className="p-2">W cm</th>
                    <th className="p-2">H cm</th>
                    <th className="p-2">Pieces</th>
                    <th className="p-2">Gross kg</th>
                    <th className="p-2">Stackable</th>
                    <th className="p-2">Vol. kg</th>
                    <th className="p-2"></th>
                  </tr>
                </thead>

                <tbody>
                  {results.calculatedLines.map((line) => (
                    <tr key={line.id} className="border-t border-slate-200">
                      <td className="p-2">
                        <input
                          value={line.description}
                          onChange={(e) =>
                            updateLine(
                              line.id,
                              "description",
                              e.target.value
                            )
                          }
                          className="w-full rounded-xl border border-slate-300 px-3 py-2"
                        />
                      </td>

                      <TableInput
                        value={line.length}
                        onChange={(value) =>
                          updateLine(line.id, "length", value)
                        }
                      />

                      <TableInput
                        value={line.width}
                        onChange={(value) =>
                          updateLine(line.id, "width", value)
                        }
                      />

                      <TableInput
                        value={line.height}
                        onChange={(value) =>
                          updateLine(line.id, "height", value)
                        }
                      />

                      <TableInput
                        value={line.pieces}
                        onChange={(value) =>
                          updateLine(line.id, "pieces", value)
                        }
                      />

                      <TableInput
                        value={line.grossWeight}
                        onChange={(value) =>
                          updateLine(
                            line.id,
                            "grossWeight",
                            value
                          )
                        }
                      />

                      <td className="p-3">
                        <select
                          value={line.stackable}
                          onChange={(e) =>
                            updateLine(
                              line.id,
                              "stackable",
                              e.target.value
                            )
                          }
                          className="rounded-xl border border-slate-300 px-2 py-2"
                        >
                          <option>Yes</option>
                          <option>No</option>
                        </select>
                      </td>

                      <td className="p-3 font-black text-green-700">
                        {line.volumetricWeight.toFixed(2)}
                      </td>

                      <td className="p-2">
                        {lines.length > 1 && (
                          <button
                            onClick={() =>
                              removeLine(line.id)
                            }
                            className="rounded-xl bg-red-50 px-3 py-2 font-bold text-red-700 hover:bg-red-100"
                          >
                            Remove
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {results.hasNonStackable && (
              <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-amber-900">
                <p className="font-black">
                  Non-stackable cargo advisory
                </p>

                <p className="mt-2 leading-7">
                  Non-stackable cargo may attract higher
                  handling costs, occupied-space charging,
                  and airline uplift restrictions.
                </p>
              </div>
            )}
          </section>

          <section className="rounded-3xl bg-slate-900 p-6 text-white shadow-xl">
            <h2 className="mb-6 text-2xl font-black">
              FreightBench Analysis
            </h2>

            <Result
              title="Total Pieces"
              value={results.totalPieces.toLocaleString()}
            />

            <Result
              title="Total Gross Weight"
              value={`${results.totalGrossWeight.toFixed(
                2
              )} kg`}
            />

            <Result
              title="Total Volumetric Weight"
              value={`${results.totalVolumetricWeight.toFixed(
                2
              )} kg`}
            />

            <Result
              title="Final Chargeable Weight"
              value={`${results.chargeableWeight.toFixed(
                2
              )} kg`}
              highlight
            />

            <Result
              title="Charging Basis"
              value={results.basis}
            />
          </section>
        </div>
      </div>
    </main>
  );
}

function TableInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <td className="p-2">
      <input
        type="number"
        min="0"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-20 rounded-xl border border-slate-300 px-2 py-2"
      />
    </td>
  );
}

function Result({
  title,
  value,
  highlight = false,
}: {
  title: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`mb-5 rounded-2xl p-5 ${
        highlight ? "bg-green-500/20" : "bg-white/10"
      }`}
    >
      <p className="text-sm text-slate-300">{title}</p>

      <p
        className={`mt-2 text-2xl font-black ${
          highlight
            ? "text-green-400"
            : "text-white"
        }`}
      >
        {value}
      </p>
    </div>
  );
}