'use client'

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import {
	ChartConfig,
	ChartContainer,
	ChartLegend,
	ChartLegendContent,
	ChartTooltip,
	ChartTooltipContent,
} from '@/components/ui/chart'
import { useMemo } from 'react'
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts'

export const description = 'An area chart with axes'

export const exampleChartData = [
	{ month: 'January', desktop: 186, mobile: 80 },
	{ month: 'February', desktop: 305, mobile: 200 },
	{ month: 'March', desktop: 237, mobile: 120 },
	{ month: 'April', desktop: 73, mobile: 190 },
	{ month: 'May', desktop: 209, mobile: 130 },
	{ month: 'June', desktop: 214, mobile: 140 },
]

export const exampleChartConfig = {
	desktop: {
		label: 'Desktop',
		color: 'hsl(var(--chart-1))',
	},
	mobile: {
		label: 'Mobile',
		color: 'hsl(var(--chart-2))',
	},
} satisfies ChartConfig

export interface XpChartPropsI {
	chartData: {
		month: string
		desktop: number
		mobile: number
	}[]

	chartConfig: {
		desktop: {
			label: string
			color: string
		}
		mobile: {
			label: string
			color: string
		}
	}
	chartTitle: string
	chartDescription: string
	chartFooterDescription: string
	chartFooterDate: string
}

const XpChart = ({
	chartData,
	chartConfig,
	chartTitle,
	chartDescription,
	chartFooterDescription,
	chartFooterDate,
}: XpChartPropsI) => {
	const memoizedChartData = useMemo(() => chartData, [chartData])
	const memoizedChartConfig = useMemo(() => chartConfig, [chartConfig])

	return (
		<Card>
			<CardHeader>
				<CardTitle>{chartTitle}</CardTitle>
				<CardDescription>{chartDescription}</CardDescription>
			</CardHeader>
			<CardContent>
				<ChartContainer
					className="min-h-[200px] w-full"
					config={memoizedChartConfig}
				>
					<AreaChart
						accessibilityLayer
						data={memoizedChartData}
						margin={{
							left: -20,
							right: 12,
						}}
						aria-labelledby="chart-description"
					>
						<CartesianGrid vertical={false} />
						<XAxis
							dataKey="month"
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
						/>
						<ChartTooltip cursor={false} content={<ChartTooltipContent />} />
						<ChartLegend content={<ChartLegendContent />} />
						<Area
							dataKey="mobile"
							type="natural"
							fill="var(--color-mobile)"
							fillOpacity={0.4}
							stroke="var(--color-mobile)"
							stackId="a"
						/>
						<Area
							dataKey="desktop"
							type="natural"
							fill="var(--color-desktop)"
							fillOpacity={0.4}
							stroke="var(--color-desktop)"
							stackId="a"
						/>
					</AreaChart>
				</ChartContainer>
			</CardContent>
			<CardFooter>
				<div className="flex w-full items-start gap-2 text-sm">
					<div className="grid gap-2">
						<div className="flex items-center gap-2 font-medium leading-none">
							{chartFooterDescription}
						</div>
						<div className="flex items-center gap-2 leading-none text-muted-foreground">
							{chartFooterDate}
						</div>
					</div>
				</div>
			</CardFooter>
		</Card>
	)
}
export default XpChart
