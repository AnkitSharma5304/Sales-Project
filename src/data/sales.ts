export type SalesEntry = {
  month: string;
  sales: number;
};

export const salesByYear: Record<string, SalesEntry[]> = {
  "2024": [
    { month: "Jan", sales: 18240 },
    { month: "Feb", sales: 17680 },
    { month: "Mar", sales: 19120 },
    { month: "Apr", sales: 20510 },
    { month: "May", sales: 21440 },
    { month: "Jun", sales: 20890 },
    { month: "Jul", sales: 22110 },
    { month: "Aug", sales: 21550 },
    { month: "Sep", sales: 20780 },
    { month: "Oct", sales: 21970 },
    { month: "Nov", sales: 22840 },
    { month: "Dec", sales: 24210 },
  ],
  "2023": [
    { month: "Jan", sales: 15430 },
    { month: "Feb", sales: 14980 },
    { month: "Mar", sales: 16250 },
    { month: "Apr", sales: 17110 },
    { month: "May", sales: 17940 },
    { month: "Jun", sales: 17220 },
    { month: "Jul", sales: 18190 },
    { month: "Aug", sales: 17740 },
    { month: "Sep", sales: 16980 },
    { month: "Oct", sales: 18510 },
    { month: "Nov", sales: 19220 },
    { month: "Dec", sales: 20440 },
  ],
  "2022": [
    { month: "Jan", sales: 13210 },
    { month: "Feb", sales: 12840 },
    { month: "Mar", sales: 13670 },
    { month: "Apr", sales: 14190 },
    { month: "May", sales: 14850 },
    { month: "Jun", sales: 14440 },
    { month: "Jul", sales: 15010 },
    { month: "Aug", sales: 14930 },
    { month: "Sep", sales: 14320 },
    { month: "Oct", sales: 15280 },
    { month: "Nov", sales: 16110 },
    { month: "Dec", sales: 17290 },
  ],
};

export const years = Object.keys(salesByYear).sort((a, b) => Number(b) - Number(a));

