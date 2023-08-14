import { Box, Skeleton } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
export default function card() {
    const [arrayList, setArrayList] = useState(['', '', '', ''])
    const keysArray = arrayList.map(() => ({
        key: Math.random().toString(36).substr(2, 9), // Generate a random alphanumeric key
        value: ''
    }));

    return (
        <Box sx={{ width: '100%', marginTop: '4rem' }}>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
                {
                    keysArray.map((item) =>

                        <Box sx={{ height: '370px' }} key={item.key}>

                            <Skeleton variant="rectangular" sx={{ borderRadius: '30px' }} width='100%' height={230} />

                            <Box sx={{ pt: 0.5 }}>
                                <Skeleton />
                                <Skeleton width="60%" />
                            </Box>
                            <Box sx={{ pt: 0.5, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Skeleton height={40} width='100%' />
                                <Skeleton height={40} width='100%' />
                            </Box>

                        </Box>


                    )

                }

            </div>
        </Box>


    )
}
