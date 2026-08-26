export type PaginationItemType = number | 'dots-start' | 'dots-end';

export interface UsePaginationProps {
  totalPages: number;
  page: number;
  siblingCount?: number;
  boundaryCount?: number;
}

const range = (start: number, end: number): number[] => {
  const length = end - start + 1;
  return Array.from({ length }, (_, idx) => idx + start);
};

export const usePagination = ({
  totalPages,
  page,
  siblingCount = 1,
  boundaryCount = 1,
}: UsePaginationProps): PaginationItemType[] => {
  const totalNumbers = siblingCount * 2 + boundaryCount * 2 + 2;

  if (totalPages <= totalNumbers) {
    return range(1, totalPages);
  }

  const leftSiblingIndex = Math.max(page - siblingCount, boundaryCount + 1);
  const rightSiblingIndex = Math.min(
    page + siblingCount,
    totalPages - boundaryCount,
  );

  const shouldShowLeftDots = leftSiblingIndex > boundaryCount + 1;
  const shouldShowRightDots = rightSiblingIndex < totalPages - boundaryCount;

  const firstPages = range(1, boundaryCount);
  const lastPages = range(totalPages - boundaryCount + 1, totalPages);

  if (!shouldShowLeftDots && shouldShowRightDots) {
    const leftRange = range(
      1,
      Math.max(page + siblingCount, boundaryCount + siblingCount + 1),
    );
    return [...leftRange, 'dots-end', ...lastPages];
  }

  if (shouldShowLeftDots && !shouldShowRightDots) {
    const rightRange = range(
      Math.min(page - siblingCount, totalPages - boundaryCount - siblingCount),
      totalPages,
    );
    return [...firstPages, 'dots-start', ...rightRange];
  }

  if (shouldShowLeftDots && shouldShowRightDots) {
    const middleRange = range(leftSiblingIndex, rightSiblingIndex);
    return [
      ...firstPages,
      'dots-start',
      ...middleRange,
      'dots-end',
      ...lastPages,
    ];
  }

  return range(1, totalPages);
};
