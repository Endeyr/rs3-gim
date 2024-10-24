'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { CHART_COLORS, MONTH_NAMES } from '@/lib/const';
import type { MonthlyXpGainI } from '@/types/xpData';
import { useMemo } from 'react';
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';

export interface XpChartPropsI {
  chartData: MonthlyXpGainI[];

  chartConfig: ChartConfig;
  chartTitle: string;
  chartDescription: string;
  chartFooterDescription: string;
}

export interface ProcessedMonthDataI {
  month: string;
  timestamp: number;
  [key: string]: string | number;
}

const XpChart = ({
  chartData,
  chartConfig,
  chartTitle,
  chartDescription,
  chartFooterDescription,
}: XpChartPropsI) => {
  const { processedData, skillNames, chartFooterDate } = useMemo(() => {
    const skills = chartData.map((skill) => skill.skillName);
    const data = chartData.reduce<ProcessedMonthDataI[]>((acc, skill) => {
      skill.monthData.forEach((month, index) => {
        const date = new Date(month.timestamp);
        const monthStr = date.toLocaleString('default', { month: 'short' });

        if (!acc[index]) {
          acc[index] = {
            month: monthStr,
            timestamp: month.timestamp,
          };
        }

        acc[index][skill.skillName] = month.xpGain;
      });
      return acc;
    }, []);
    // Trim data to include only months between the first and last non-zero XP month
    const firstNonZeroIndex = data.findIndex((month) =>
      skills.some((skill) => month[skill] && month[skill] !== 0)
    );

    const lastNonZeroIndex = data
      .slice()
      .reverse()
      .findIndex((month) =>
        skills.some((skill) => month[skill] && month[skill] !== 0)
      );

    const adjustedLastNonZeroIndex = data.length - 1 - lastNonZeroIndex;

    // Keep the first and last 0 XP month to make the chart curve
    const trimmedData =
      firstNonZeroIndex === -1 || adjustedLastNonZeroIndex === -1
        ? []
        : data.slice(firstNonZeroIndex - 1, adjustedLastNonZeroIndex + 2);

    let footerDate = '';
    const firstDataPoint = trimmedData[0];
    const lastDataPoint = trimmedData[trimmedData.length - 1];

    if (firstDataPoint?.timestamp && lastDataPoint?.timestamp) {
      const firstMonth = new Date(firstDataPoint.timestamp);
      const lastMonth = new Date(lastDataPoint.timestamp);
      footerDate = `${MONTH_NAMES[firstMonth.getMonth()]} - ${
        MONTH_NAMES[lastMonth.getMonth()]
      }`;
    }

    return {
      processedData: trimmedData,
      skillNames: skills,
      chartFooterDate: footerDate,
    };
  }, [chartData]);

  const memoizedChartConfig = useMemo(() => chartConfig, [chartConfig]);

  const formatYAxis = (value: number): string => {
    if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
    return value.toString();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{chartTitle}</CardTitle>
        <CardDescription>{chartDescription}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          className='h-[80dvh] min-h-[600px] w-full'
          config={memoizedChartConfig}
        >
          <AreaChart
            accessibilityLayer
            data={processedData}
            margin={{ right: 12, left: 12 }}
            aria-labelledby='chart-description'
          >
            <CartesianGrid strokeDasharray='3 3' vertical={false} />
            <XAxis
              dataKey='month'
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickCount={3}
              tickFormatter={formatYAxis}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  indicator='dot'
                  className='w-full max-w-[90vw] md:max-w-[600px]'
                />
              }
            />
            <ChartLegend
              content={
                <ChartLegendContent className='grid h-full w-full grid-cols-5' />
              }
            />
            {skillNames.map((skillName, index) => (
              <Area
                key={skillName}
                dataKey={skillName}
                type='monotone'
                fill={CHART_COLORS[index % CHART_COLORS.length]}
                fillOpacity={0.4}
                stroke={CHART_COLORS[index % CHART_COLORS.length]}
                stackId='1'
              />
            ))}
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className='flex w-full items-start gap-2 text-sm'>
          <div className='grid gap-2'>
            <div className='flex items-center gap-2 font-medium leading-none'>
              {chartFooterDescription}
            </div>
            <div className='flex items-center gap-2 leading-none text-muted-foreground'>
              {chartFooterDate}
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};
export default XpChart;
