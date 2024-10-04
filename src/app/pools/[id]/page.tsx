import { Avatar } from '@/components/avatar'
import { Badge } from '@/components/badge'
import { Button } from '@/components/button'
import { DescriptionDetails, DescriptionList, DescriptionTerm } from '@/components/description-list'
import { Divider } from '@/components/divider'
import { Heading, Subheading } from '@/components/heading'
import { Link } from '@/components/link'
import { getPool } from '@/data'
import { BanknotesIcon, CalendarIcon, ChevronLeftIcon, CreditCardIcon } from '@heroicons/react/16/solid'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { RefundOrder } from './refund'

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  let pool = await getPool(params.id)

  return {
    title: pool && `Pool #${pool.id}`,
  }
}

export default async function Pool({ params }: { params: { id: string } }) {
  let pool = await getPool(params.id)

  if (!pool) {
    notFound()
  }

  return (
    <>
      <div className="max-lg:hidden">
        <Link href="/pools" className="inline-flex items-center gap-2 text-sm/6 text-zinc-500 dark:text-zinc-400">
          <ChevronLeftIcon className="size-4 fill-zinc-400 dark:fill-zinc-500" />
          Pools
        </Link>
      </div>
      <div className="mt-4 lg:mt-8">
        <div className="flex items-center gap-4">
          <Heading>Pool #{pool.id}</Heading>
          <Badge color="lime">Successful</Badge>
        </div>
        <div className="isolate mt-2.5 flex flex-wrap justify-between gap-x-6 gap-y-4">
          <div className="flex flex-wrap gap-x-10 gap-y-4 py-1.5">
            <span className="flex items-center gap-3 text-base/6 text-zinc-950 sm:text-sm/6 dark:text-white">
              <BanknotesIcon className="size-4 shrink-0 fill-zinc-400 dark:fill-zinc-500" />
              <span>US{pool.amount.usd}</span>
            </span>
            <span className="flex items-center gap-3 text-base/6 text-zinc-950 sm:text-sm/6 dark:text-white">
              <CreditCardIcon className="size-4 shrink-0 fill-zinc-400 dark:fill-zinc-500" />
              <span className="inline-flex gap-3">
                {pool.payment.card.type}{' '}
                <span>
                  <span aria-hidden="true">••••</span> {pool.payment.card.number}
                </span>
              </span>
            </span>
            <span className="flex items-center gap-3 text-base/6 text-zinc-950 sm:text-sm/6 dark:text-white">
              <CalendarIcon className="size-4 shrink-0 fill-zinc-400 dark:fill-zinc-500" />
              <span>{pool.date}</span>
            </span>
          </div>
          <div className="flex gap-4">
            <RefundOrder outline amount={pool.amount.usd}>
              Refund
            </RefundOrder>
            <Button>Resend Invoice</Button>
          </div>
        </div>
      </div>
      <div className="mt-12">
        <Subheading>Summary</Subheading>
        <Divider className="mt-4" />
        <DescriptionList>
          <DescriptionTerm>Customer</DescriptionTerm>
          <DescriptionDetails>{pool.customer.name}</DescriptionDetails>
          <DescriptionTerm>Event</DescriptionTerm>
          <DescriptionDetails>
            <Link href={pool.event.url} className="flex items-center gap-2">
              <Avatar src={pool.event.thumbUrl} className="size-6" />
              <span>{pool.event.name}</span>
            </Link>
          </DescriptionDetails>
          <DescriptionTerm>Amount</DescriptionTerm>
          <DescriptionDetails>US{pool.amount.usd}</DescriptionDetails>
          <DescriptionTerm>Amount after exchange rate</DescriptionTerm>
          <DescriptionDetails>
            US{pool.amount.usd} &rarr; CA{pool.amount.cad}
          </DescriptionDetails>
          <DescriptionTerm>Fee</DescriptionTerm>
          <DescriptionDetails>CA{pool.amount.fee}</DescriptionDetails>
          <DescriptionTerm>Net</DescriptionTerm>
          <DescriptionDetails>CA{pool.amount.net}</DescriptionDetails>
        </DescriptionList>
      </div>
      <div className="mt-12">
        <Subheading>Payment method</Subheading>
        <Divider className="mt-4" />
        <DescriptionList>
          <DescriptionTerm>Transaction ID</DescriptionTerm>
          <DescriptionDetails>{pool.payment.transactionId}</DescriptionDetails>
          <DescriptionTerm>Card number</DescriptionTerm>
          <DescriptionDetails>•••• {pool.payment.card.number}</DescriptionDetails>
          <DescriptionTerm>Card type</DescriptionTerm>
          <DescriptionDetails>{pool.payment.card.type}</DescriptionDetails>
          <DescriptionTerm>Card expiry</DescriptionTerm>
          <DescriptionDetails>{pool.payment.card.expiry}</DescriptionDetails>
          <DescriptionTerm>Owner</DescriptionTerm>
          <DescriptionDetails>{pool.customer.name}</DescriptionDetails>
          <DescriptionTerm>Email address</DescriptionTerm>
          <DescriptionDetails>{pool.customer.email}</DescriptionDetails>
          <DescriptionTerm>Address</DescriptionTerm>
          <DescriptionDetails>{pool.customer.address}</DescriptionDetails>
          <DescriptionTerm>Country</DescriptionTerm>
          <DescriptionDetails>
            <span className="inline-flex gap-3">
              <img src={pool.customer.countryFlagUrl} alt={pool.customer.country} />
              {pool.customer.country}
            </span>
          </DescriptionDetails>
          <DescriptionTerm>CVC</DescriptionTerm>
          <DescriptionDetails>
            <Badge color="lime">Passed successfully</Badge>
          </DescriptionDetails>
        </DescriptionList>
      </div>
    </>
  )
}
