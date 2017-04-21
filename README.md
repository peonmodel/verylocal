# VeryLocal

user enter website -> ask for location -> else pinpoint location -> else browse
with location, find collection of stalls nearby, subscribe to stalls, subscribe to food collection
show some menu listing

menu listing have featured menu by default, 1 / 2 row only
then below is google map & map controls
map controls i.e. search radius, filter options, pinpoint/alter location
map shows location, nearby restaurant & food options

menu listing have filter options, accordion (initially hidden)
options are like veg, healthy, price etc etc

menu listing are cards for food
cards contains info important
name, image, price, where (metres/no. of steps)
buttons have "more info" (expand card, drop pin on location)
additional info includes 
which stall, and where (drop pin), nutrition values, price, add-ons, rating etc

```
================================================== nav bar
== |--------menu listing  ------------------|  
== |     |              |           |       |
== |     |              |           |       |
== |----------------------------------------|
== |
== |         map                            |
== |  map controls
==
nav bar
```


# ***TODO NOW!***
- fix location & map
```js
navigator.geolocation.getCurrentPosition(function(position){
  // position = new Geoposition({ coords, timestamp })
  // coords = { accuracy, altitude, altitudeAccuracy, heading, latitude, longitude, speed }
}, (err) => {
  // err = PositionError({ code, message: 'User denied Geolocation' })
})
// optional watchPosition() same params
```

# TODO
- login component (mostly copy from games room)
  - form data need to have state
  - error management etc
  - server-side login connection package, again mostly copy from games room
  - need add url history for tagging tracking
- navigation by food court -> stalls
- food menu listing
- food component
- composable food component & calculator -> for economic rice

- make responsive

- management portal
- update menu & prices
- profile page

- location-based map

- advert on both signup

# INTERMEDIATE
- telegram update upload component
- payment system
- adverts
- table seating map
- native app
- jsonld attributes for SEO

# FUTURE
- migrate to apollo, graphql & sql (currently no pub/sub equivalent)
- relational db seems more standard, but mongodb is good for prototyping
- service worker web push notification
