let xy = [{ x: 2, y: 9.5 }, { x: 4, y: 8.0 }, { x: 6, y: 10.5 }, { x: 8, y: 39.5 }, { x: 10, y: 72.5 }];

export function LinearSpine(xy, x) {
    let point = [...xy];
    let f = [];

    for (let i = 1; i < point.length; i++) {
        const fi = point[i - 1].y + (((point[i].y - point[i - 1].y) / (point[i].x - point[i - 1].x)) * (x - point[i - 1].x));
        f.push(fi);
    }

    for (let i = 0; i < point.length - 1; i++) {
        if (x >= point[i].x && x <= point[i + 1].x) {
            return f[i];
        }
    }

}
console.log(LinearSpine(xy, 4.5));