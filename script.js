$(document).ready(function() {

// Start your code from here

let animals = [
    "butterfly", "dog", "cat", "rabbit", "skunk", "goldfish",
    "bird", "ferret", "turtle", "sugar glider", "chinchilla",
    "hedgehog", "hermit crab", "gerbil", "pygmy goat", "chicken",
    "capybara", "teacup pig", "serval", "salamander", "frog"
  ];


  function populateButtons(array){
    $("#animal-buttons").empty();

array.forEach(element => {
    
    var a = $("<button>");
    a.text(element)
    a.addClass("animal-button")
    a.attr("data-type",element)
    $("#animal-buttons").append(a);
});
}

// La logica del click de cada boton para hacer la llamda al API
$("#animal-buttons").on("click", ".animal-button", function() {
    //Obtiene del atributo el nombre
    let animalselected = $(this).attr("data-type")
    let numeroimagenes = 40
    var queryURL = `https://api.giphy.com/v1/gifs/search?q=${animalselected}&api_key=YeLqKUnqTWqU7YPVxM6oO0aYufsJmzjo&limit=${numeroimagenes}`

    $("#animals").empty();
    $.ajax({
        url:queryURL,
        method: "GET",
        success: (function(respuesta){
        //Obtener y pegar las 40 imágenes y GIFs por sus URLs buscando en la API 
        for(let i = 0; i < numeroimagenes; i++){
            $("#animals").append(`<p class = "rating"> Rating: ${respuesta.data[i].rating} <br> <img class = "animal-image" data-state = "still" data-still = "${respuesta.data[i].images.fixed_height_still.url}" data-animate = "${respuesta.data[i].images.fixed_height.url}" src = "${respuesta.data[i].images.fixed_height_still.url}"> </p>`)
        }
      })
    })
})


// La lógica del click de cada imagen para "intercambiar las urls"
$("#animals").on("click", ".animal-image", function(){

    //Buscar el atributo state y cambiarlo por la URL y estado de animado y viceversa
    if(($(this).attr("data-state"))  === "still"){
        $(this).attr("src", $(this).attr("data-animate"))
        $(this).attr("data-state", "animate");
    }else{
        $(this).attr("src", $(this).attr("data-still"))
        $(this).attr("data-state", "still");
    }

})


// La lógica del formulario para agregar mas botones a la lista
$("#add-animal").on("click", function(e) {
    e.preventDefault();
  //Para quitar espacios después del último caracter para prevención de errores
  let newelement = $("#animal-input").val().trim()
  //Agregar elemento y regenerar botones
  animals.push(newelement)
  populateButtons(animals);
})


populateButtons(animals);
});
