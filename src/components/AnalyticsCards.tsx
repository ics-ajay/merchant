type Analytics = {
  totalRevealed: number;
  totalRedeemed: number;
  redemptionRate: number;
};

export default function AnalyticsCards({
  totalRevealed,
  totalRedeemed,
  redemptionRate,
}: Analytics) {
  return (
    <div className="grid grid-cols-3 gap-6">
      <Card title="Codes Revealed" value={totalRevealed} />
      <Card title="Codes Redeemed" value={totalRedeemed} />
      <Card title="Redemption Rate" value={`${redemptionRate}%`} />
    </div>
  );
}

function Card({ title, value }: { title: string; value: string | number }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <p className="text-gray-500 text-sm">{title}</p>
      <h2 className="text-3xl font-semibold mt-2">{value}</h2>
    </div>
  );
}
