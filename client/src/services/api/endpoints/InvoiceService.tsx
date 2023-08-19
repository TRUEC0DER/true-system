import instanceAxios from "../axios";

const endpoints = {
    getProducts: () => instanceAxios.get("/invoice/products/"),
    create: (product_id: number, nickname: string) => instanceAxios.post("/invoice/create/", {
        product_id, nickname
    })
}

export default endpoints