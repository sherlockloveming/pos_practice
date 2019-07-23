const addButton = document.querySelector('[data-alpha-pos="add-drink"]')
const posFunc=new Pos()
const orderLists = document.querySelector('[data-order-list]')
const checkoutButton=document.querySelector('[data-checkout-button="checkout"]')

function Drink (name,sugar,ice){
   this.name=name
   this.sugar=sugar
   this.ice=ice
}

Drink.prototype.price=function(){
   switch (this.name) {
      case 'Black Tea':
      case 'Oolong Tea':
      case 'Milk Tea':
      case 'Green Tea':
        return 30
      case 'Bubble Milk Tea':
      case 'Lemon Green Tea':
        return 50
      case 'Black Tea Latte':
      case 'Matcha Latte':
        return 55
      default:
        alert('Not on the current menu!')
    }
}

function Pos(){
}

Pos.prototype.getValue=function(input){
   let selected=''
   document.querySelectorAll(`[name=${input}]`).forEach(function(item){
      if (item.checked){
         selected=item.value
      }
   })
   return selected
}

Pos.prototype.deleteDrink=function(chosen){
   chosen.remove()
}

Pos.prototype.checkout=function(){
   let total=0
   document.querySelectorAll('[data-drink-price]').forEach(function(drink) {
      total+=Number(drink.textContent)
    })
    return total
}

Pos.prototype.clearOrders=function(chosen){
   chosen.querySelectorAll('.card').forEach(function(card){
      card.remove()
   })
}
Pos.prototype.addDrink=function(drink){
   let orderListsCard = `
   <div class="card mb-3">
   <div class="card-body pt-3 pr-3">
     <div class="text-right">
       <span data-delete-icon=”delete-drink-icon“>×</span>
     </div>
     <h6 class="card-title mb-1">${drink.name}</h6>
     <div class="card-text">${drink.ice}</div>
     <div class="card-text">${drink.sugar}</div>
   </div>
   <div class="card-footer text-right py-2">
     <div class="card-text text-muted">$ <span data-drink-price>${drink.price()}</span></div>
   </div>
 </div>
 `
 orderLists.insertAdjacentHTML('afterbegin', orderListsCard)
}


addButton.addEventListener('click', ()=>{
   const drinkName=posFunc.getValue('drink')
   const ice=posFunc.getValue('ice')
   const sugar=posFunc.getValue('sugar')
   console.log(`${drinkName}, ${ice}, ${sugar}`)

   if (!drinkName) {
      alert('Please choose at least one item.')
      return
    }
   const drink=new Drink(drinkName,sugar,ice)
   drink.price()

   posFunc.addDrink(drink)
 })

orderLists.addEventListener('click', (event)=>{
   let isDeleteButton = event.target.matches('[data-delete-icon=”delete-drink-icon“]')
   if (!isDeleteButton) {
    return
  }
  posFunc.deleteDrink(event.target.parentElement.parentElement.parentElement)
 })

 checkoutButton.addEventListener('click',()=>{
    posFunc.checkout()
    alert(`Total amount of drinks：$${posFunc.checkout()}`)
    posFunc.clearOrders(orderLists)
 })