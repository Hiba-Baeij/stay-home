import { Shop } from '@/api/shop/dto';
import { ShopApi } from '@/api/shop/endpoints';
import { AppDispatch } from '@/store';
import { shopActions } from '@/store/shop';
import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
export default function shopDetails() {
    let { id } = useParams();
    const dispatch = useDispatch<AppDispatch>()

    const { isLoading } = useQuery({
        queryKey: ["shopDetails"],
        queryFn: () => ShopApi.getShopDetails(id as string),
        onSuccess: (data: { response: Shop }) => {
            dispatch(shopActions.setShopDto(data.response))
        },
    })
    return (
        <div>{id}</div>
    )
}

