import { Box, Skeleton } from '@mui/material'
import React, { useEffect, useState } from 'react'

export default function card() {
    const [arrayList, setArrayList] = useState(['', '', '', ''])


    return (
        <Box sx={{ width: '100%', marginTop: '4rem' }}>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
                {
                    arrayList.map(() =>

                        <Box sx={{ height: '370px' }}>

                            <Skeleton variant="rectangular" sx={{ borderRadius: '30px' }} width={340} height={230} />

                            <Box sx={{ pt: 0.5 }}>
                                <Skeleton />
                                <Skeleton width="60%" />
                            </Box>
                            <Box sx={{ pt: 0.5, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Skeleton height={40} width={230} />
                                <Skeleton height={40} width={60} />
                            </Box>

                        </Box>


                    )

                }

            </div>
        </Box>


    )
}
