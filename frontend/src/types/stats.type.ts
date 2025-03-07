export interface Stats {
    totalOrders: number,
    totalSales: number,
    totalBooks: number,
    trendingBooks: number,
    monthlySales: MonthlySales
}

export interface MonthlySales {
    _id: string,
    totalSales: number,
    totalOrders: number
}