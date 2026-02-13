import AnalyticsCards from "@/src/components/AnalyticsCards";

export default async function DashboardPage() {
  // Later this will come from your API
  const analytics = {
    totalRevealed: 1200,
    totalRedeemed: 340,
    redemptionRate: 28.3,
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Redemption Analytics</h1>

      <AnalyticsCards
        totalRevealed={analytics.totalRevealed}
        totalRedeemed={analytics.totalRedeemed}
        redemptionRate={analytics.redemptionRate}
      />
    </div>
  );
}
