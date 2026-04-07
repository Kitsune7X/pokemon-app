import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/8bit/pagination";

export default function PaginationApp({
  previous,
  next,
}: {
  previous: string | null;
  next: string | null;
}) {
  return (
    <Pagination>
      <PaginationContent>
        {previous && (
          <PaginationItem>
            <PaginationPrevious href={previous} />
          </PaginationItem>
        )}
        <PaginationItem>
          <PaginationLink href="/">1</PaginationLink>
        </PaginationItem>

        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        {next && (
          <PaginationItem>
            <PaginationNext href={next} />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}

// TODO: Make numbered pagination work
