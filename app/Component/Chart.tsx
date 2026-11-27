import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Line,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export interface ChartProps {
  data: any[];
  color?: any;
  total?: number;
}

export const DiagramCharts = ({ data, color }: ChartProps) => {
  return (
    <div style={{ width: "100%", height: 350 }}>
      <ResponsiveContainer>
        <AreaChart
          data={data}
          margin={{ top: 5, right: 10, left: -30, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="name"
            tick={{ fontSize: 12, fill: "#ffffff" }}
            stroke="#ffffff"
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 12, fill: "#ffffff" }}
            stroke="#ffffff"
            width={70}
            axisLine={false}
            tickLine={false}
            domain={[0, 3000]}
          />
          <Tooltip />

          <Line
            type="monotone"
            dataKey="Users"
            stroke="#38bdf8"
            strokeWidth={7}
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="NewUsers"
            stroke="#a3e635"
            strokeWidth={7}
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="ActiveUsers"
            stroke="#fbbf24"
            strokeWidth={7}
            dot={false}
          />
          <defs>
            <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#4ade80" stopOpacity={0.25} />
              <stop offset="95%" stopColor="#ffffff" stopOpacity={0.0} />
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey="Users"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorUsers)"
            tooltipType="none"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export const PieCharts = ({ data, color, total }: ChartProps) => {
  return (
    <div style={{ width: "50%", height: 300 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={110}
            paddingAngle={2}
            dataKey="value"
          >
            {data.map((entry: any, index: number) => (
              <Cell key={`cell-${index}`} fill={color[index % color.length]} />
            ))}
          </Pie>
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="central"
            className="text-2xl font-semibold fill-text"
          >
            {total}
          </text>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
