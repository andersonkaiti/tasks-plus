import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from '@/components/ui/pagination'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { usePagination } from '@/hooks/use-pagination'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import { parseAsInteger, useQueryStates } from 'nuqs'

type PaginationProps = {
  currentPage?: number
  totalPages: number
  paginationItemsToDisplay?: number
}

export function Paginator({
  totalPages,
  paginationItemsToDisplay = 5,
}: PaginationProps) {
  const [{ page, limit }, setQuery] = useQueryStates({
    page: parseAsInteger.withDefault(1),
    limit: parseAsInteger.withDefault(10),
  })

  const { pages, showLeftEllipsis, showRightEllipsis } = usePagination({
    currentPage: page,
    totalPages,
    paginationItemsToDisplay,
  })

  const handlePageChange = (newPage: number) => {
    if (newPage !== page && newPage >= 1 && newPage <= totalPages) {
      setQuery({
        page: newPage,
      })
    }
  }

  const handleLimitChange = (value: string) => {
    const parsedLimit = Number(value)
    if (!isNaN(parsedLimit)) {
      setQuery({ limit: parsedLimit, page: 1 })
    }
  }

  return (
    <div className="flex items-center justify-between gap-3">
      <p
        className="flex-1 text-sm whitespace-nowrap text-muted-foreground"
        aria-live="polite"
      >
        Page <span className="text-foreground">{page}</span> of{' '}
        <span className="text-foreground">{totalPages}</span>
      </p>

      <div className="grow">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationLink
                type="button"
                className="aria-disabled:pointer-events-none aria-disabled:opacity-50"
                aria-label="Go to previous page"
                aria-disabled={page === 1 ? true : undefined}
                role={page === 1 ? 'link' : undefined}
                onClick={() => handlePageChange(page - 1)}
                tabIndex={page === 1 ? -1 : 0}
              >
                <ChevronLeftIcon size={16} aria-hidden="true" />
              </PaginationLink>
            </PaginationItem>

            {showLeftEllipsis && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}

            {pages.map((pageNum) => (
              <PaginationItem key={pageNum}>
                <PaginationLink
                  type="button"
                  isActive={pageNum === page}
                  onClick={() => handlePageChange(pageNum)}
                  tabIndex={pageNum === page ? -1 : 0}
                >
                  {pageNum}
                </PaginationLink>
              </PaginationItem>
            ))}

            {showRightEllipsis && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}

            <PaginationItem>
              <PaginationLink
                type="button"
                className="aria-disabled:pointer-events-none aria-disabled:opacity-50"
                aria-label="Go to next page"
                aria-disabled={page === totalPages ? true : undefined}
                role={page === totalPages ? 'link' : undefined}
                onClick={() => handlePageChange(page + 1)}
                tabIndex={page === totalPages ? -1 : 0}
              >
                <ChevronRightIcon size={16} aria-hidden="true" />
              </PaginationLink>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>

      <div className="flex flex-1 justify-end">
        <Select
          value={String(limit)}
          aria-label="Results per page"
          onValueChange={handleLimitChange}
        >
          <SelectTrigger
            id="results-per-page"
            className="w-fit whitespace-nowrap"
          >
            <SelectValue placeholder="Select number of results" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="10">10 / page</SelectItem>
            <SelectItem value="20">20 / page</SelectItem>
            <SelectItem value="50">50 / page</SelectItem>
            <SelectItem value="100">100 / page</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
