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
    },

    createUniqueId: () => {
        const idArr = [];
        for(let i=11;i>0;i--) {
            if(i>7) {
                let num = Math.floor(Math.random() * 9);
                idArr.push(num)
            } else {
                let r = Math.floor(Math.random() * 26);
                let letter = String.fromCharCode(97 + r);
                idArr.push(letter)
            }
        }
        return idArr.join('');
      }
}