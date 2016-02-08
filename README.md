# Operation Toasty
A whole-house thermostat, which will hopefully keep me toasty warm.

# development notes
* use mocha-as-promised (if such a thing exists)
  * see what the failures/stack traces look like

# thoughts/ideas/sketch
* software
  * features
    * manage temperature control
      * based on room occupancy (PIR)
      * based on historical preferences (learning stuff here)
        * historical tmeperature for this time for this day of week
        * historical tmeperature for this time for all days of the week
      * based on minimums
      * based on manual override
  * how
    * get data from sensors
      * use mqtt?
      * discover devices via dns-sd
        * poll devices?
      * keep track of time of last value sent per sensor
        * so we can alert/notify of failing sensors
      * keep track of signal strength
      * sensors are dumb and don't know where they are
        * software associates MAC/id with position/meaning
          * 55:3f:12:ac:55 == "living room"
    * DB schema is calendar-like (?)
      * temperature settings have start/end
      * how to overlay manual override on top of schedule?
    * record temperatures for "machine learning"
      * let manual overrides help define/adjust schedule somehow?
  * schema
    * likely
      * sensors
        * id
        * identifier (opaque)
        * name (user-friendly)
        * sensor_type_id
      * sensor_values
        * id
        * sensor_id
        * sample_timestamp
      * sensor_types
        * id
        * name
          * heat
          * humidity
          * movement
    * maybe?
      * zones
        * id
        * name
      * sensors_zones
        * id
        * zone_id
        * sensor_id
      * zone_goals (end user would like whole-house average to be at least X, any room to be at least Y, assorted rooms to have at least temp Z)
        * id
        * zone_id
        * min_value
        * max_value
      * schedules
* hardware
  * main node
    * raspi2
    * touch screen
    * 4 channel relay board (likely only need 3)
      * fan
      * heat
      * a/c
  * sensor nodes
    * esp8266?
    * digistump oak?
    * relays?
      * to control space heaters, for example
  * sensors
    * temp/humidity
      * DHT22
      * HIH 6130/6131/6120/6121
        * http://www.digikey.com/product-detail/en/HIH6131-021-001/480-3652-6-ND/2704706
      * DS18B20
      * MCP9808
    * PIR
    * light sensor?
