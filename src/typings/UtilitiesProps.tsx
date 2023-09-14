export interface ProfilePaginationProps {
  ispageLoaded: boolean;
  totalPages: number;
  currentPage: number;
  handlePageChange: (newPage: number) => void;
}
