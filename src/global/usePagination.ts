// import { useState, useMemo } from 'react';
// export interface Pagination {
//     pageSize: number
//     pageIndex: number
//     totalPages?: number
//     totalCount?: number

// }
// export const usePagination = (pageSize = 8, pageIndex = 1, totalCount = 1) => {
//     const [pagination, setPagination] = useState<Pagination>({
//         totalCount,
//         pageIndex,
//         pageSize,
//         get totalPages() {
//             return Math.ceil(this.totalCount / this.pageSize);
//         },
//     });

//     const paginate = <T>(array: T[]): T[] => {
//         setPagination((prevPagination) => ({
//             ...prevPagination,
//             totalCount: array.length,
//         }));

//         return useMemo(
//             () =>
//                 array.slice(
//                     (pagination.pageIndex - 1) * pagination.pageSize,
//                     pagination.pageIndex * pagination.pageSize
//                 ),
//             [array, pagination.pageIndex, pagination.pageSize]
//         );
//     };

//     return { pagination, paginate, setPagination };
// };

import { useState, useMemo } from 'react';
export interface Pagination {
    pageSize: number
    pageIndex: number
    totalPages?: number
    totalCount?: number

}
const usePagination = (pageSize = 8, pageIndex = 1, totalCount = 1) => {
    const [pagination, setPagination] = useState<Pagination>({
        totalCount,
        pageIndex,
        pageSize,
        get totalPages() {
            return Math.ceil(this.totalCount / this.pageSize);
        },
    });

    const paginate = <T>(array: T[]): T[] => {
        setPagination((prevPagination) => ({
            ...prevPagination,
            totalCount: array.length,
        })
        );

        return useMemo(
            () =>
                array.slice(
                    (prevPagination.pageIndex - 1) * prevPagination.pageSize,
                    prevPagination.pageIndex * prevPagination.pageSize
                ),
            [array, prevPagination.pageIndex, prevPagination.pageSize]
        );
    };

    return { pagination, paginate };
};