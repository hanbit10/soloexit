// components/life-diamond.tsx

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

const stats = [
  { label: "Health", value: 90, emoji: "💪" },
  { label: "Food", value: 82, emoji: "❤️" },
  { label: "Skin", value: 88, emoji: "✨" },
  { label: "Intelligence", value: 74, emoji: "🧠" },
  { label: "Wealth", value: 60, emoji: "💰" },
  { label: "Order", value: 78, emoji: "📅" },
  { label: "Social", value: 70, emoji: "🤝" },
  { label: "Mind", value: 84, emoji: "😊" },
];

const CENTER = 180;
const RADIUS = 120;

function polarToCartesian(angle: number, value: number) {
  const r = (value / 100) * RADIUS;
  const rad = ((angle - 90) * Math.PI) / 180;

  return {
    x: CENTER + r * Math.cos(rad),
    y: CENTER + r * Math.sin(rad),
  };
}

export default function EightFigure() {
  const polygon = stats
    .map((_, i) => {
      const angle = (360 / stats.length) * i;
      const p = polarToCartesian(angle, stats[i].value);
      return `${p.x},${p.y}`;
    })
    .join(" ");

  return (
    <Card className="max-w-5xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Your Stats</CardTitle>
      </CardHeader>

      <CardContent className="grid gap-8 lg:grid-cols-2">
        <svg viewBox="0 0 360 360" className="w-full max-w-md mx-auto">
          {/* Grid */}

          {[25, 50, 75, 100].map((ring) => (
            <polygon
              key={ring}
              fill="none"
              stroke="hsl(var(--border))"
              strokeWidth={1}
              points={stats
                .map((_, i) => {
                  const angle = (360 / stats.length) * i;
                  const p = polarToCartesian(angle, ring);
                  return `${p.x},${p.y}`;
                })
                .join(" ")}
            />
          ))}

          {/* Lines */}

          {stats.map((_, i) => {
            const angle = (360 / stats.length) * i;
            const p = polarToCartesian(angle, 100);

            return <line key={i} x1={CENTER} y1={CENTER} x2={p.x} y2={p.y} stroke="hsl(var(--border))" />;
          })}

          {/* Filled Polygon */}

          <polygon points={polygon} className="fill-primary/30 stroke-primary" strokeWidth={3} />

          {/* Dots */}

          {stats.map((item, i) => {
            const angle = (360 / stats.length) * i;
            const p = polarToCartesian(angle, item.value);

            return <circle key={i} cx={p.x} cy={p.y} r={5} className="fill-primary" />;
          })}

          {/* Labels */}

          {stats.map((item, i) => {
            const angle = (360 / stats.length) * i;
            const p = polarToCartesian(angle, 115);

            return (
              <text key={i} x={p.x} y={p.y} textAnchor="middle" dominantBaseline="middle" className="fill-foreground text-[10px]">
                {item.emoji} {item.label}
              </text>
            );
          })}
        </svg>

        {/* Stats */}

        <div className="space-y-4">
          {stats.map((item) => (
            <div key={item.label} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>
                  {item.emoji} {item.label}
                </span>

                <span>{item.value}%</span>
              </div>

              <div className="h-2 rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-primary transition-all"
                  style={{
                    width: `${item.value}%`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
