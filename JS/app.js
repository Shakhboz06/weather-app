window.onload = () => {
    let longtitude
    let latitude

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            longtitude = position.coords.longitude
            latitude = position.coords.latitude
            let temp_decription = document.querySelector('.temperature_description')
            let temp_degree = document.querySelector('.degree')
            let location = document.querySelector('.location h1')
            let humidity_i = document.querySelector('.humidity')

            const api = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Samarkand%20Uzbekistan?unitGroup=metric&key=Q4VZCYH5FCP3N7CUMW6VR437E&include=fcst%2Ccurrent`
            
            fetch(api)
                .then((response) => {
                    return response.json()
                })
                .then((data) => {
                    console.log(data)
                    const { temp, icon,humidity} = data.currentConditions

                    location.innerText = data.timezone
                    temp_decription.innerText = data.description
                    temp_degree.innerText = temp
                    humidity_i.innerText = `Humidity rate  ${humidity}%`

                    reload_icons(icon,document.querySelector('.icon'))
                })
                .catch((error) =>{
                    console.log(error)
                })
        })

    }

    let reload_icons = (icons,icon_pos) =>{
        let skycons = new Skycons({color: "white"})
        let currentIcon = icons.replace(/-/g,"_").toUpperCase()
        skycons.play()
        return skycons.set(icon_pos, Skycons[currentIcon])
    }
}