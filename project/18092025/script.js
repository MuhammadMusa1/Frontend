new Vue ({
    el: '#app',
    data:{
        searchTerm: '',
        products:[
            {id:1, name:'Apple', price: 10000.00},
            {id:2, name:'Banana', price: 0.50},
            {id:3, name:'Cherry', price: 2.00},
            {id:4, name:'Date', price: 3.00},
            {id:5, name:'Elderberry', price: 1.50},
            {id:6, name:'Samsa', price: 5.00}
        ]
    },
    computed:{
        filteredProducts(){
         //Vus.js автоматический пересчитывает значение, когда searchTerm изменяется
         return this.products.filter(product =>{
            //Переобразуем оба значения в нижний регистр для поиска без учета регистра
             return product.name.toLowerCase().includes(this.searchTerm.toLowerCase());
         });
        }

        }
    
});