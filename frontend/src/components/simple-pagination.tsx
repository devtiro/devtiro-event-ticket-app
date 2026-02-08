import { SpringBootPagination } from "@/domain/domain";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface SimplePaginationProps<T> {
  pagination: SpringBootPagination<T>;
  onPageChange: (page: number) => void;
}

export function SimplePagination<T>({
  pagination,
  onPageChange,
}: React.FC<SimplePaginationProps<T>>) {
  const currentPage = pagination.number;
  const totalPages = pagination.totalPages;

  return (
    <div className="flex gap-2 items-center">
      <Button
        size="sm"
        className="cursor-pointer"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={pagination.first}
      >
        <ChevronLeft className="h-4 w-4" />
        <span className="sr-only">Previous Page</span>
      </Button>
      <div className="text-sm">
        Page {currentPage + 1} of {totalPages}
      </div>
      <Button
        size="sm"
        className="cursor-pointer"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={pagination.last}
      >
        <ChevronRight className="h-4 w-4" />
        <span className="sr-only">Next Page</span>
      </Button>
    </div>
  );
}
