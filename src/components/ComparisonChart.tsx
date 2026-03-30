import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from "recharts";
import type { Shoe } from "../types/shoe";

interface ComparisonChartProps {
  shoes: Shoe[];
}

const metrics: Array<{ key: keyof Shoe; label: string }> = [
  { key: "traction", label: "Traction" },
  { key: "cushioning", label: "Cushioning" },
  { key: "support", label: "Support" },
  { key: "stability", label: "Stability" },
  { key: "weightScore", label: "Weight" },
  { key: "breathability", label: "Breathability" },
  { key: "outdoorDurability", label: "Outdoor" },
  { key: "retroStyleScore", label: "Era" }
];

const colors = ["#4c8d35", "#e9622e", "#165dff"];

export function ComparisonChart({ shoes }: ComparisonChartProps) {
  const data = metrics.map((metric) => {
    const row: Record<string, number | string> = { metric: metric.label };
    shoes.forEach((shoe) => {
      row[shoe.name] = Number(shoe[metric.key]);
    });
    return row;
  });

  return (
    <div className="h-[360px] w-full rounded-xl border border-slate-200 bg-white p-3">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data} outerRadius="75%">
          <PolarGrid />
          <PolarAngleAxis dataKey="metric" />
          <PolarRadiusAxis domain={[0, 10]} />
          {shoes.map((shoe, index) => (
            <Radar
              key={shoe.id}
              name={shoe.name}
              dataKey={shoe.name}
              stroke={colors[index % colors.length]}
              fill={colors[index % colors.length]}
              fillOpacity={0.2}
            />
          ))}
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
