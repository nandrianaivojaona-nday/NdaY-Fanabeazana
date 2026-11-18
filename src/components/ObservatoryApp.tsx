import { useMemo, useState } from "react";
import { Download, Search } from "lucide-react";
import {
  COUNCIL_STAKEHOLDERS,
  REGIONAL_OBSERVATORY_DATA,
} from "../data/marshallPlanData";

export function ObservatoryApp() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState<
    "region" | "enrollmentPct" | "baselineDropoutRiskPct" | "solarOfflineReadyPct"
  >("baselineDropoutRiskPct");
  const [sortAsc, setSortAsc] = useState(false);

  // Predictive Analytics Policy Levers
  const [solarHubExpansion, setSolarHubExpansion] = useState(30); // +0..50%
  const [smsParentReach, setSmsParentReach] = useState(40); // +0..60%
  const [teacherIncentivePct, setTeacherIncentivePct] = useState(25); // +0..40%
  const [cycloneShockActive, setCycloneShockActive] = useState(false);

  const simulatedRows = useMemo(() => {
    return REGIONAL_OBSERVATORY_DATA.map((row) => {
      const solarReduction = solarHubExpansion * 0.06;
      const smsReduction = smsParentReach * 0.05;
      const teacherReduction = teacherIncentivePct * 0.07;
      const shockPenalty = cycloneShockActive
        ? row.region === "Atsinanana" ||
          row.region === "Sava" ||
          row.region === "Atsimo-Andrefana"
          ? 4.8
          : 1.9
        : 0;

      // Offline solar hubs mitigate cyclone school disruption by keeping cached learning active
      const solarBuffer = cycloneShockActive ? solarHubExpansion * 0.04 : 0;

      const projectedDropoutRisk = Math.max(
        2.5,
        Number(
          (
            row.baselineDropoutRiskPct -
            solarReduction -
            smsReduction -
            teacherReduction +
            shockPenalty -
            solarBuffer
          ).toFixed(1)
        )
      );

      const projectedSolarReady = Math.min(
        100,
        Math.round(row.solarOfflineReadyPct + solarHubExpansion * 0.75)
      );

      const projectedDeployment = Math.min(
        100,
        Number((row.teacherDeploymentPct + teacherIncentivePct * 0.35).toFixed(1))
      );

      return {
        ...row,
        projectedDropoutRisk,
        projectedSolarReady,
        projectedDeployment,
      };
    });
  }, [solarHubExpansion, smsParentReach, teacherIncentivePct, cycloneShockActive]);

  const filteredRows = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    const list = simulatedRows.filter((r) =>
      q ? r.region.toLowerCase().includes(q) : true
    );
    return [...list].sort((a, b) => {
      const valA = a[sortField];
      const valB = b[sortField];
      if (typeof valA === "string" && typeof valB === "string") {
        return sortAsc ? valA.localeCompare(valB) : valB.localeCompare(valA);
      }
      return sortAsc
        ? Number(valA) - Number(valB)
        : Number(valB) - Number(valA);
    });
  }, [simulatedRows, searchQuery, sortField, sortAsc]);

  const nationalAverages = useMemo(() => {
    const count = simulatedRows.length;
    const avgEnrollment =
      simulatedRows.reduce((acc, r) => acc + r.enrollmentPct, 0) / count;
    const avgBaselineRisk =
      simulatedRows.reduce((acc, r) => acc + r.baselineDropoutRiskPct, 0) / count;
    const avgProjectedRisk =
      simulatedRows.reduce((acc, r) => acc + r.projectedDropoutRisk, 0) / count;
    const avgSolar =
      simulatedRows.reduce((acc, r) => acc + r.projectedSolarReady, 0) / count;
    return {
      avgEnrollment: avgEnrollment.toFixed(1),
      avgBaselineRisk: avgBaselineRisk.toFixed(1),
      avgProjectedRisk: avgProjectedRisk.toFixed(1),
      avgSolar: Math.round(avgSolar),
    };
  }, [simulatedRows]);

  const handleSort = (
    field:
      | "region"
      | "enrollmentPct"
      | "baselineDropoutRiskPct"
      | "solarOfflineReadyPct"
  ) => {
    if (sortField === field) {
      setSortAsc((prev) => !prev);
    } else {
      setSortField(field);
      setSortAsc(false);
    }
  };

  const handleDownloadCsv = () => {
    const headers = [
      "Region",
      "TargetFokontanyHubs",
      "SolarOfflineReadyPct",
      "ProjectedSolarReadyPct",
      "EnrollmentPct",
      "BaselineDropoutRiskPct",
      "ProjectedDropoutRiskPct",
      "GenderParityIndex",
      "TeacherDeploymentPct",
      "BudgetExecutionPct",
    ];
    const rows = filteredRows.map((r) =>
      [
        r.region,
        r.fokontanyHubsTarget,
        r.solarOfflineReadyPct,
        r.projectedSolarReady,
        r.enrollmentPct,
        r.baselineDropoutRiskPct,
        r.projectedDropoutRisk,
        r.genderParityIndex,
        r.projectedDeployment,
        r.budgetExecutionPct,
      ].join(",")
    );
    const csv = [headers.join(","), ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "NdaY-Fanabeazana-Open-Education-Observatory.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="mx-auto max-w-7xl space-y-10 px-4 py-10 sm:px-6 lg:px-8">
      {/* Header & Top Metrics */}
      <section className="border-b border-slate-200 pb-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-medium text-slate-500">
              Strategic Objective 05 · Modernize Educational Governance &amp; Open Data
            </p>
            <h1 className="font-editorial mt-1 text-3xl font-semibold text-slate-900">
              Digital Education Observatory &amp; Predictive Analytics
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-600">
              Real-time planning model combining regional school indicators, predictive crisis
              simulation, and anonymized open statistics under the National Human Development
              Council.
            </p>
          </div>

          <button
            type="button"
            onClick={handleDownloadCsv}
            className="inline-flex cursor-pointer items-center gap-2 rounded-md border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-800 hover:bg-slate-50 whitespace-nowrap shrink-0 self-start sm:self-auto"
          >
            <Download className="h-3.5 w-3.5" aria-hidden="true" />
            Export Open Data CSV
          </button>
        </div>

        <dl className="mt-8 grid grid-cols-2 gap-6 border-t border-slate-200 pt-6 sm:grid-cols-4">
          <div>
            <dt className="text-xs text-slate-500">Mean Regional Enrollment</dt>
            <dd className="mt-1 font-mono text-2xl font-medium text-slate-900 tabular-nums">
              {nationalAverages.avgEnrollment}%
            </dd>
          </div>
          <div>
            <dt className="text-xs text-slate-500">Baseline Dropout Risk</dt>
            <dd className="mt-1 font-mono text-2xl font-medium text-amber-700 tabular-nums">
              {nationalAverages.avgBaselineRisk}%
            </dd>
          </div>
          <div>
            <dt className="text-xs text-slate-500">Projected Risk (With Levers)</dt>
            <dd className="mt-1 font-mono text-2xl font-medium text-emerald-700 tabular-nums">
              {nationalAverages.avgProjectedRisk}%
            </dd>
          </div>
          <div>
            <dt className="text-xs text-slate-500">Projected Solar/Offline Hubs</dt>
            <dd className="mt-1 font-mono text-2xl font-medium text-blue-900 tabular-nums">
              {nationalAverages.avgSolar}%
            </dd>
          </div>
        </dl>
      </section>

      {/* Predictive Analytics Policy Simulator + Open Data Table */}
      <section className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Predictive Levers */}
        <div className="space-y-5 rounded-lg border border-slate-200 bg-white p-6 lg:col-span-4">
          <div className="border-b border-slate-200 pb-3">
            <h2 className="font-editorial text-xl font-semibold text-slate-900">
              Predictive Intervention Simulator
            </h2>
            <p className="mt-1 text-xs text-slate-600">
              Simulate preventive interventions before dropout, staffing, or disaster crises emerge.
            </p>
          </div>

          <div>
            <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
              <label htmlFor="lever-solar">Solar &amp; Offline Hub Rollout</label>
              <span className="font-mono text-blue-900 tabular-nums">+{solarHubExpansion}%</span>
            </div>
            <input
              id="lever-solar"
              type="range"
              min={0}
              max={50}
              value={solarHubExpansion}
              onChange={(e) => setSolarHubExpansion(Number(e.target.value))}
              className="mt-2 w-full accent-blue-900"
            />
          </div>

          <div>
            <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
              <label htmlFor="lever-sms">Parent Academy SMS / Radio Reach</label>
              <span className="font-mono text-blue-900 tabular-nums">+{smsParentReach}%</span>
            </div>
            <input
              id="lever-sms"
              type="range"
              min={0}
              max={60}
              value={smsParentReach}
              onChange={(e) => setSmsParentReach(Number(e.target.value))}
              className="mt-2 w-full accent-blue-900"
            />
          </div>

          <div>
            <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
              <label htmlFor="lever-teacher">Rural Teacher Deployment &amp; Housing</label>
              <span className="font-mono text-blue-900 tabular-nums">
                +{teacherIncentivePct}%
              </span>
            </div>
            <input
              id="lever-teacher"
              type="range"
              min={0}
              max={40}
              value={teacherIncentivePct}
              onChange={(e) => setTeacherIncentivePct(Number(e.target.value))}
              className="mt-2 w-full accent-blue-900"
            />
          </div>

          <div className="border-t border-slate-200 pt-4">
            <label className="flex cursor-pointer items-start gap-3">
              <input
                type="checkbox"
                checked={cycloneShockActive}
                onChange={(e) => setCycloneShockActive(e.target.checked)}
                className="mt-0.5 h-4 w-4 rounded border-slate-300 accent-blue-900"
              />
              <span className="text-xs leading-relaxed text-slate-700">
                <strong>Simulate Coastal Cyclone / Infrastructure Disruption:</strong> Tests
                whether offline solar hub caching buffers learning continuity in Atsinanana, Sava,
                and Atsimo-Andrefana.
              </span>
            </label>
          </div>
        </div>

        {/* Regional Data Table */}
        <div className="rounded-lg border border-slate-200 bg-white p-6 lg:col-span-8">
          <div className="flex flex-col gap-3 border-b border-slate-200 pb-4 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="font-editorial text-xl font-semibold text-slate-900">
              Regional Indicators &amp; Projected Outcomes
            </h2>
            <div className="relative w-full sm:w-60">
              <Search
                className="pointer-events-none absolute top-2.5 left-3 h-4 w-4 text-slate-400"
                aria-hidden="true"
              />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter region..."
                aria-label="Filter regions"
                className="w-full rounded-md border border-slate-300 py-1.5 pr-3 pl-9 text-xs text-slate-900 focus:border-blue-900 focus:outline-none"
              />
            </div>
          </div>

          <div className="mt-4 overflow-x-auto">
            <table className="w-full border-collapse text-left text-xs">
              <thead className="border-b border-slate-200 bg-slate-50 font-semibold text-slate-600">
                <tr>
                  <th className="px-3 py-3">
                    <button
                      type="button"
                      onClick={() => handleSort("region")}
                      className="cursor-pointer hover:text-slate-900"
                    >
                      Region
                    </button>
                  </th>
                  <th className="px-3 py-3 text-right">Hubs Target</th>
                  <th className="px-3 py-3 text-right">
                    <button
                      type="button"
                      onClick={() => handleSort("enrollmentPct")}
                      className="cursor-pointer hover:text-slate-900"
                    >
                      Enrollment
                    </button>
                  </th>
                  <th className="px-3 py-3 text-right">
                    <button
                      type="button"
                      onClick={() => handleSort("solarOfflineReadyPct")}
                      className="cursor-pointer hover:text-slate-900"
                    >
                      Solar Ready (Proj.)
                    </button>
                  </th>
                  <th className="px-3 py-3 text-right">Gender Parity</th>
                  <th className="px-3 py-3 text-right">
                    <button
                      type="button"
                      onClick={() => handleSort("baselineDropoutRiskPct")}
                      className="cursor-pointer hover:text-slate-900"
                    >
                      Dropout Risk (Base → Proj.)
                    </button>
                  </th>
                  <th className="px-3 py-3 text-right">Budget Exec.</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredRows.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-3 py-8 text-center text-slate-500">
                      No regions match &ldquo;{searchQuery}&rdquo;.
                    </td>
                  </tr>
                ) : (
                  filteredRows.map((row) => (
                    <tr key={row.region} className="hover:bg-slate-50">
                      <td className="px-3 py-3 font-semibold text-slate-900">{row.region}</td>
                      <td className="px-3 py-3 text-right font-mono text-slate-700 tabular-nums">
                        {row.fokontanyHubsTarget}
                      </td>
                      <td className="px-3 py-3 text-right font-mono text-slate-700 tabular-nums">
                        {row.enrollmentPct.toFixed(1)}%
                      </td>
                      <td className="px-3 py-3 text-right font-mono text-blue-900 tabular-nums">
                        {row.projectedSolarReady}%
                      </td>
                      <td className="px-3 py-3 text-right font-mono text-slate-700 tabular-nums">
                        {row.genderParityIndex.toFixed(2)}
                      </td>
                      <td className="px-3 py-3 text-right font-mono tabular-nums">
                        <span className="text-amber-700">
                          {row.baselineDropoutRiskPct.toFixed(1)}%
                        </span>
                        <span className="mx-1 text-slate-400">→</span>
                        <span className="font-semibold text-emerald-700">
                          {row.projectedDropoutRisk.toFixed(1)}%
                        </span>
                      </td>
                      <td className="px-3 py-3 text-right font-mono text-slate-700 tabular-nums">
                        {row.budgetExecutionPct.toFixed(1)}%
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* National Human Development Council (13 Stakeholders) */}
      <section className="rounded-lg border border-slate-200 bg-white p-6">
        <div className="border-b border-slate-200 pb-4">
          <p className="text-xs font-medium text-slate-500">
            Federated Institutional Governance · Multi-Stakeholder Mandate
          </p>
          <h2 className="font-editorial mt-1 text-2xl font-semibold text-slate-900">
            National Human Development Council
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            Human development is treated as a shared national priority across 13 public, academic,
            civic, faith, and private institutions rather than a single ministry.
          </p>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {COUNCIL_STAKEHOLDERS.map((seat, idx) => (
            <div key={seat.sector} className="rounded-md border border-slate-200 bg-slate-50 p-4">
              <p className="font-mono text-xs text-slate-400 tabular-nums">
                Seat {String(idx + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-1 text-sm font-semibold text-slate-900">{seat.sector}</h3>
              <p className="mt-1 text-xs leading-relaxed text-slate-600">{seat.role}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
