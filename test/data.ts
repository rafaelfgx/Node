export default class Data {
    static readonly id = "000000000000000000000000";
    static readonly customerWithoutId = { name: "Name" };
    static readonly customer = { id: "111111111111111111111111", ...Data.customerWithoutId };
}
