export function keyedList(list: any[]) {
    return list.map((o: any) => ({
        key: o.payload.key,
        ...o.payload.val(),
    }));
}
