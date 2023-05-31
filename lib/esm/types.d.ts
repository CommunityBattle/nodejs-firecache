type Order = {
    by: string;
    direction: string;
};
type O = Order[];
type Query = {
    field: string;
    operator: string;
    value: string;
    order: O;
    limit: number;
};
type Q = Query[];
export { Query, Q, Order, O };
export default Q;
