/* MagicMirror Module: MMM-Blitzer
 * By Dawi
 * MIT Licensed.
 */

Module.register("MMM-Blitzer", {
    defaults: {
        latitude: 52.5200,
        longitude: 13.4050, 
        radius: 10, 
        updateInterval: 10 * 60 * 1000,
    },

    start: function() {
        this.loaded = false;
        this.getData();
        this.scheduleUpdate();
    },

    getData: function() {
        const url = `https://cdn2.atudo.net/api/4.0/pois.php?type=ts,0,1,2,3,4,5,6&box=${this.config.latitude - 0.1},${this.config.longitude - 0.1},${this.config.latitude + 0.1},${this.config.longitude + 0.1}&z=18`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                this.processData(data.pois);
            })
            .catch(error => {
                console.error("Error fetching data: ", error);
            });
    },

    processData: function(data) {
        this.blitzer = data.map(blitzer => ({
            type: blitzer.type,
            street: blitzer.address ? blitzer.address.street : "Unknown",
            max_speed: blitzer.vmax ? blitzer.vmax : "Unknown"
        }));
        this.loaded = true;
        this.updateDom();
    },

    scheduleUpdate: function() {
        setInterval(() => {
            this.getData();
        }, this.config.updateInterval);
    },

    getDom: function() {
        const wrapper = document.createElement("div");
        if (!this.loaded) {
            wrapper.innerHTML = "Loading...";
            return wrapper;
        }

        const header = document.createElement("div");
        header.style.display = "flex";
        header.style.alignItems = "center";
        header.style.justifyContent = "flex-end";

        const alertText = document.createElement("div");
        alertText.innerHTML = "<h2>Blitzer!</h2>";
        header.appendChild(alertText);

        wrapper.appendChild(header);

        const list = document.createElement("ul");
        list.style.textAlign = "right";
        list.style.listStyleType = "none"; 
        this.blitzer.forEach(blitzer => {
            const listItem = document.createElement("li");
            listItem.innerHTML = `${blitzer.street}, ${blitzer.max_speed} km/h`;
            list.appendChild(listItem);
        });
        wrapper.appendChild(list);
        return wrapper;
    }
});
