const deleteHotel = async index => {
    try {
        const id = hoteis[index].hotel_id;

        const response = await fetch(`http://localhost:5000/hotel/${id}`, {
            method: "DELETE"
        });

        const json = await response.json();

        if (json.message === "Hotel deletado.") {
            hoteis.splice(index, 1);
            renderTable(hoteis);
        }
    } catch (error) {
        console.log(error);
    }
}