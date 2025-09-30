new Vue({
    el: '#app',
    data:{
        somoni:0,
        //курсы валюты
        usdRate:0.11,
        euroRate:0.09
    },
    computed:{
        dollars(){
            return(this.somoni*this.usdRate).toFixed(2);
        },
        euros(){
            return(this.somoni*this.euroRate).toFixed(2);
        }
    }

});