# MMM-Blitzer

Module to display radar traps around

Based on atudo.net api / blitzer.de

After i found the blitzer.de HACS integration for HomeAssistant by [@timniklas](https://github.com/timniklas) i also wanted something simular for MagicMirror²
So he did the api stuff and i just had to look through it. Thanks for this.

------------

## Installation

Download this into your modules folder

For example:

cd ~/MagicMirror/modules

git clone https://github.com/yourdawi/MMM-Blitzer

------------

## Config

Add to config

```javascript
{
			module: "MMM-Blitzer",
			position: "top_right",
			config: {
				latitude: 52.5200, 
				longitude: 13.4050, 
				radius: 10 // in km
			}
		}
```
