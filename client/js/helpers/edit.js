let hotelIndex = null;

const editHotel = (index) => {
    const hotel = hoteis[index];

    addModal.toggle()
    nameInput.value = hotel.nome
    estrelasInput.value = hotel.estrelas
    cidadeInput.value = hotel.cidade
    diariaInput.value = hotel.diaria

    hotelIndex = index
}