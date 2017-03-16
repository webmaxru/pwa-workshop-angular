export function CustomListeners () {
  return (worker) => new CustomListenersImpl(worker)
}

export class CustomListenersImpl {

  setup (ops) {}

  constructor () {}

}
