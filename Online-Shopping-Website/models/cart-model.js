class Cart{
    constructor(items=[],totalQuantity=0,totalPrice=0){
        this.items=items;
        this.totalQuantity=totalQuantity;
        this.totalPrice=totalPrice;
    }

    addItem(product){
        this.totalQuantity++;
        this.totalPrice+=(+product.price);
        for (let index = 0; index < this.items.length; index++) {
            const item=this.items[index];

            if(item.product.id.toString()===product.id.toString()){
                item.quantity++;
                item.totalPrice+=(+item.product.price);
                return;
            }
            
        }
        this.items.push({
            product:product,
            quantity:1,
            totalPrice:+product.price
        })

    }

    updateItem(productId,newQuantity){
        
        for(let i=0;i<this.items.length;i++){
            const item=this.items[i];

            if(item.product.id.toString()===productId.toString()){
                
                if(newQuantity<=0){
                    this.items.splice(i,1);
                    this.totalPrice-=(+item.totalPrice);
                    this.totalQuantity-=item.quantity;

                    return 0;
                }else{
                    this.totalQuantity+=newQuantity-item.quantity;
                    
                    this.totalPrice+=(newQuantity-item.quantity)*item.product.price;
                    


                    item.quantity=newQuantity;
                    item.totalPrice=newQuantity*item.product.price;

                    return +item.totalPrice.toFixed(2);
                }
            }
        }
    }
    
}



module.exports=Cart;