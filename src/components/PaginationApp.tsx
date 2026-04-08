import { pokeApiBaseUrl } from "#/config/pokeApiUrl";
import type { Dispatch, SetStateAction } from "react";
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

  setUrl,
}: {
  previous: string | null;
  next: string | null;
  setUrl: Dispatch<SetStateAction<string>>;
}) {
  return (
    <Pagination>
      <PaginationContent>
        {previous && (
          <PaginationItem>
            <PaginationPrevious onClick={() => setUrl(previous)} />
          </PaginationItem>
        )}
        <PaginationItem>
          <PaginationLink onClick={() => setUrl(pokeApiBaseUrl)}>
            1
          </PaginationLink>
        </PaginationItem>

        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        {next && (
          <PaginationItem>
            <PaginationNext onClick={() => setUrl(next)} />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}
