
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  trend?: string;
  trendValue?: string;
  alert?: string;
}

const StatCard = ({ title, value, trend, trendValue, alert }: StatCardProps) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-gray-500">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {trend && (
          <p className="text-xs text-green-600 flex items-center mt-1">
            <TrendingUp className="h-3 w-3 mr-1" />
            {trendValue}
          </p>
        )}
        {alert && <p className="text-xs text-amber-600 flex items-center mt-1">{alert}</p>}
      </CardContent>
    </Card>
  );
};

export default StatCard;
