import { Avatar } from '@/components/avatar'
import { Button } from '@/components/button'
import { Heading } from '@/components/heading'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/table'
import { getPools } from '@/data'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pools',
}

export default async function Pools() {
  let pools = await getPools()

  return (
    <>
      <div className="flex items-end justify-between gap-4">
        <Heading>Pools</Heading>
        <Button className="-my-0.5">Create pool</Button>
      </div>
      <Table className="mt-8 [--gutter:theme(spacing.6)] lg:[--gutter:theme(spacing.10)]">
        <TableHead>
          <TableRow>
            <TableHeader>Pool number</TableHeader>
            <TableHeader>Event date</TableHeader>
            <TableHeader>Pool Owner</TableHeader>
            <TableHeader>Event</TableHeader>
            <TableHeader className="text-right">Amount</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {pools.map((pool) => (
            <TableRow key={pool.id} href={pool.url} title={`Pool #${pool.id}`}>
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
