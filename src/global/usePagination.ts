export interface Pagination {
    pageSize: number
    pageIndex: number
    totalPages?: number
    totalCount?: number

}

export const usePagination = (pageSize = 8, pageIndex = 1, totalCount = 1) => {

    const pagination = {
        totalCount,
        pageIndex,
        pageSize,
        get totalPages() {
            return Math.ceil(this.totalCount / this.pageSize);
        },
    };


    const paginate = <T>(array: T[]): T[] => {
        pagination.totalCount = array.length;

        return array.slice((pagination.pageIndex - 1) * pagination.pageSize, pagination.pageIndex * pagination.pageSize);
    }

    return { pagination, paginate }
}