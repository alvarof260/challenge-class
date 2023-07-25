class TicketManager {
  #profitBasePrice;
  constructor() {
    this.events = [];
    this.#profitBasePrice = 0.15;
  }
  addEvent(artist, city, price, capacity = 50, date = new Date().toLocaleDateString(), participants = []) {
    const priceWithProfit = this.addTaxes(price)
    let id = this.getNextID()
    this.events.push({id, artist, city, priceWithProfit, capacity, date, participants });
  }
  getEvents() {
    return this.events;
  }
  getNextID(){
    if(this.events.length === 0) return 1
    return this.events[this.events.length - 1].id + 1
  }
  addTaxes(price){
    return price + (price * this.#profitBasePrice)
  }
  addUsers(idEvent,idUser){
    if(this.existEvent(idEvent) && !this.isRegister(idUser)){
        const event = this.events.find(el=> el.id === idEvent)
        event.participants.push(idUser)
    }
  }
  isRegister(idUser){
    return this.events.some(el=> el.participants.find(elem=> elem) === idUser)
  }
  existEvent(idEvent){
    return this.events.find(el=>el.id === idEvent)
  }
  eventTour(idEvent, newCity, newDate){
    let event = this.events.find(el=>el.id === idEvent)
    event.city = newCity
    event.date = newDate
    event.participants = []
    this.addEvent(event.artist, event.city, event.priceWithProfit, event.capacity, event.date, event.participants)
  }
}

/* const show = new TicketManager();
show.addEvent("Duki", "Ezeiza", 10, 200, '2/8/2023');
show.addEvent("Duki", "Ezeiza", 40, 100, '5/8/2023');
show.addEvent("Duki", "Ezeiza", 20, 400, '29/8/2023');
show.addUsers(2,'Jose Fernandez')
show.eventTour(3, "Berlin", "28/9/2023")
console.log(show.events) */
