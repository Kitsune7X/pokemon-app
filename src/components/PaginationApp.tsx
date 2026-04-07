import { useQueryClient } from "@tanstack/react-query";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/8bit/pagination";
import { pokemonsQueryOptions } from "#/utils/pokemon.functions";

export default function PaginationApp({
  previous,
  next,
}: {
  previous: string | null;
  next: string | null;
}) {
  const queryClient = useQueryClient();

  return (
    <Pagination>
      <PaginationContent>
        {previous && (
          <PaginationItem>
            <PaginationPrevious
              onClick={() =>
                queryClient.fetchQuery(pokemonsQueryOptions(`${previous}`))
              }
            />
          </PaginationItem>
        )}
        <PaginationItem>
          <PaginationLink>1</PaginationLink>
        </PaginationItem>

        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        {next && (
          <PaginationItem>
            <PaginationNext
              onClick={() =>
                queryClient.fetchQuery(pokemonsQueryOptions(`${next}`))
              }
            />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}

// TODO: Make numbered pagination work
