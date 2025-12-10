import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { SalesEntry } from "@/data/sales";

export type ChartType = "bar" | "line" | "pie";

type SalesChartProps = {
  data: SalesEntry[];
  year: string;
  chartType: ChartType;
  threshold: number;
};

const barColor = "#0284c7";
const lineColor = "#0ea5e9";
const pieColors = ["#0ea5e9", "#38bdf8", "#22c55e", "#f59e0b", "#6366f1", "#ec4899"];

const formatCurrency = (value: number) => `$${value.toLocaleString()}`;

export function SalesChart({ data, year, chartType, threshold }: SalesChartProps) {
  const tooltipFormatter = (value: number) => [formatCurrency(value), "Sales"];

  if (!data.length) {
    return (
      <div className="flex h-72 w-full items-center justify-center rounded-xl border border-dashed border-slate-200 text-sm text-slate-500">
        No data matches the current filters.
      </div>
    );
  }

  const commonProps = {
    margin: { top: 10, right: 20, left: 0, bottom: 0 },
  };

  const renderBar = () => (
    <BarChart data={data} {...commonProps}>
      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
      <XAxis dataKey="month" stroke="#475569" />
      <YAxis stroke="#475569" tickFormatter={(value) => `$${value / 1000}k`} width={60} />
      <Tooltip
        formatter={tooltipFormatter}
        labelFormatter={(label) => `${label} ${year}`}
        contentStyle={{ borderRadius: 12, borderColor: "#e2e8f0" }}
      />
      <Legend />
      <ReferenceLine y={threshold} stroke="#f97316" strokeDasharray="4 4" label="Threshold" />
      <Bar dataKey="sales" fill={barColor} name="Sales" radius={[6, 6, 0, 0]} />
    </BarChart>
  );

  const renderLine = () => (
    <LineChart data={data} {...commonProps}>
      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
      <XAxis dataKey="month" stroke="#475569" />
      <YAxis stroke="#475569" tickFormatter={(value) => `$${value / 1000}k`} width={60} />
      <Tooltip
        formatter={tooltipFormatter}
        labelFormatter={(label) => `${label} ${year}`}
        contentStyle={{ borderRadius: 12, borderColor: "#e2e8f0" }}
      />
      <Legend />
      <ReferenceLine y={threshold} stroke="#f97316" strokeDasharray="4 4" label="Threshold" />
      <Line
        type="monotone"
        dataKey="sales"
        stroke={lineColor}
        strokeWidth={3}
        dot={{ r: 4, fill: "#fff", stroke: lineColor, strokeWidth: 2 }}
        activeDot={{ r: 6 }}
        name="Sales"
      />
    </LineChart>
  );

  const renderPie = () => (
    <PieChart>
      <Tooltip formatter={tooltipFormatter} />
      <Legend />
      <Pie
        data={data}
        dataKey="sales"
        nameKey="month"
        cx="50%"
        cy="50%"
        outerRadius={90}
        innerRadius={50}
        paddingAngle={3}
        label={({ name, percent }) => `${name ?? "—"} ${((percent ?? 0) * 100).toFixed(0)}%`}
      >
        {data.map((entry, index) => (
          <Cell key={entry.month} fill={pieColors[index % pieColors.length]} />
        ))}
      </Pie>
    </PieChart>
  );

  const renderChart = () => {
    if (chartType === "bar") return renderBar();
    if (chartType === "line") return renderLine();
    return renderPie();
  };

  return (
    <div className="h-80 w-full">
      <ResponsiveContainer width="100%" height="100%">
        {renderChart()}
      </ResponsiveContainer>
    </div>
  );
}

