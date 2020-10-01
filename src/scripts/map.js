ymaps.ready(init);
    function init(){
        var myMap = new ymaps.Map("map", {
            center: [56.468069, 84.960025],
            zoom: 15,
            controls:[]
        });
        myCollection = [
            [56.467363, 84.955188],
            [56.469769, 84.964960],
            [56.466131, 84.956250],
        ];
        var myGeoObjects = new ymaps.GeoObjectCollection({}, {

            draggable: false,
            iconLayout: 'default#image',
            iconImageHref: './image/marker.svg',
        });
        for (let i = 0; i < myCollection.length; i++) {
            myGeoObjects.add(new ymaps.Placemark(myCollection[i]));
          }
        myMap.geoObjects.add(myGeoObjects);

    }