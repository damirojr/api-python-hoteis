const addButton = document.querySelector("#add");
const addModal = new bootstrap.Modal(document.getElementById('exampleModal'), {
    keyboard: false
})

let isModalVisible = false;

const nameInput = document.querySelector("#modal-nome");
const estrelasInput = document.querySelector("#modal-estrelas");
const cidadeInput = document.querySelector("#modal-cidade");
const diariaInput = document.querySelector("#modal-diaria");

addButton.addEventListener("click", async () => {
    addModal.toggle()
})

const resetForm = () => {
    nameInput.value = ""
    estrelasInput.value = ""
    cidadeInput.value = ""
    diariaInput.value = ""
}

const addHotelApi = async hotel => {
    return fetch("http://localhost:5000/hotel/new", {
        method: "POST",
        body: JSON.stringify(hotel),
        headers: {"Content-type": "application/json; charset=UTF-8"}
    })
}

const updateHotelApi = async hotel => {
    hotel.hotel_id = hoteis[hotelIndex].hotel_id;

    return fetch(`http://localhost:5000/hotel/${hotel.hotel_id}`, {
        method: "PUT",
        body: JSON.stringify(hotel),
        headers: {"Content-type": "application/json; charset=UTF-8"}
    })
}

const saveHotel = async () => {
    const hotel = {
        nome: nameInput.value,
        estrelas: estrelasInput.value,
        cidade: cidadeInput.value,
        diaria: diariaInput.value,
    }

    try {
        let apiResponse;

        if (hotelIndex !== null) {
            apiResponse = await updateHotelApi(hotel)
        } else {
            apiResponse = await addHotelApi(hotel)
        }

        const json = await apiResponse.json();

        if (json.hotel_id) {
            if (hotelIndex !== null) {
                updateHotel(hotel)
            } else {
                addHotel(hotel)
            }

            resetForm()
            addModal.hide()

            hotelIndex = null;
        } else {
            throw new Error("Something went wrong adding this hotel :(")
        }
    } catch (error) {
        console.log(error)
    }
}