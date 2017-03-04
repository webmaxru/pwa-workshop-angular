export function CustomListeners () {
  return (worker) => new CustomListenersImpl(worker)
}

export class CustomListenersImpl {

  setup (ops) {
    self.addEventListener('notificationclick', function (event) {
      console.log('On notification click: ', event)
      event.notification.close()

      if (event.action == 'opentweet') {
        console.log('Performing action opentweet')

        event.waitUntil(
          clients.openWindow(event.notification.data).then(function (windowClient) {
            // do something with the windowClient.
          })
        )
      } else {
        console.log('Performing default click action')

        // This looks to see if the current is already open and
        // focuses if it is
        event.waitUntil(clients.matchAll({
          includeUncontrolled: true,
          type: 'window'
        }).then(function (clientList) {
          for (var i = 0; i < clientList.length; i++) {
            var client = clientList[i]
            if (client.url == '/' && 'focus' in client)
              return client.focus()
          }
          if (clients.openWindow)
            return clients.openWindow('/')
        }))
      }
    })

    self.addEventListener('notificationclose', function (event) {
      console.log('On notification close')
    })
  }

}
