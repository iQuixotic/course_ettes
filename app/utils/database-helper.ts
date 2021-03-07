export default {
    snakeToCamel: (arg: Array<string>) => {
        arg.forEach(el => {
            let arr = [];
            let n = el.split("_");
            
            n.forEach(el => {
                arr.push(el[0].toUpperCase() + el.slice(1));
            });
            let x = arr.join('');
            return x.charAt(0).toLowerCase() + x.slice(1);
        })
        
    }
}