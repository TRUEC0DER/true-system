import React, {useEffect, useState} from 'react';
import Input from "@/components/interface/Input";
import "@/styles/pages/Purchase.scss"
import Button from "@/components/interface/Button";
import api from "@/services/api";
import {useFetching} from "@/hooks/useFetching";

type FormData = {
    nickname: string;
    product: string;
};

type Products = {
    id: number;
    name: string;
    info: string;
    price: string;
}[]

const Purchase = () => {
    const [products, setProducts] = useState<Products>()
    const productsOptions: any = []

    const [fetchProducts, isLoadingProducts, errorFetchProducts]: any = useFetching(async () => {
        const res = await api.invoiceService.getProducts()
        setProducts(res.data)
    })

    const [form, setForm] = useState({
        nickname: "",
        product: ""
    })

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        if (form.nickname === "") return alert("You didn't enter a nickname")
        await api.invoiceService.create(Number(form.product), form.nickname).then((item) => window.location = item.data).catch(() => {
            return alert('Selected product already been purchased for this nickname')
        })
    }

    useEffect(() => {
        fetchProducts()
    }, [])

    products?.map(item => {
        productsOptions.push({
            value: item.id,
            title: `${item.name} (${item.price}₽)`
        })
    })

    return (
        <div className="purchase">
            <div className="content">
                <h2>Purchase of products</h2>
                <div className="product-cards">
                    {isLoadingProducts && <p>Loading...</p>}
                    {errorFetchProducts && <p>An error occurred while loading</p>}
                    {products?.map(item => {
                        return (
                            <div className="block">
                                <p className="price">{item.price} ₽</p>
                                <p className="p-big"><b>{item.name}</b></p>
                                <p>{item.info}</p>
                                <Input placeholder="Nickname" color="primary" onChange={(e) => setForm({
                                    product: item.id.toString(),
                                    nickname: e.target.value
                                })}/>
                                <Button type="submit" color="secondary" onClick={handleSubmit}>Purchase</Button>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    );
};

export default Purchase;