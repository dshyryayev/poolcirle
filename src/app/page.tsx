import { Avatar } from '@/components/avatar'
import { Badge } from '@/components/badge'
import { Divider } from '@/components/divider'
import { Heading, Subheading } from '@/components/heading'
import { Select } from '@/components/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/table'
import { getRecentPools } from '@/data'


export default async function Home() {
  let pools = await getRecentPools()

  return (
    <>
      <Heading>Good afternoon, Michael</Heading>
      <div className="mt-8 flex items-end justify-between">
        <Subheading>Overview</Subheading>
        <div>
          <Select name="period">
            <option value="last_week">Last week</option>
            <option value="last_two">Last two weeks</option>
            <option value="last_month">Last month</option>
            <option value="last_quarter">Last quarter</option>
          </Select>
        </div>
      </div>
      <Subheading className="mt-14">Recent pools</Subheading>
      <Table className="mt-4 [--gutter:theme(spacing.6)] lg:[--gutter:theme(spacing.10)]">
        <TableHead>
          <TableRow>
            <TableHeader>Pool number</TableHeader>
            <TableHeader>Event date</TableHeader>
            <TableHeader>Customer</TableHeader>
            <TableHeader>Event</TableHeader>
            <TableHeader className="text-right">Amount</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {pools.map((pool) => (
            <TableRow key={pool.id} href={pool.url} title={`Order #${pool.id}`}>
              <TableCell>{pool.id}</TableCell>
              <TableCell className="text-zinc-500">{pool.date}</TableCell>
              <TableCell>{pool.customer.name}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Avatar src={pool.event.thumbUrl} className="size-6" />
                  <span>{pool.event.name}</span>
                </div>
              </TableCell>
              <TableCell className="text-right">US{pool.amount.usd}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}
