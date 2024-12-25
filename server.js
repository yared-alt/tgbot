import TelegramBot from "node-telegram-bot-api";
import pkg from "dotenv";
import axios from "axios";

const dotenv = pkg;
dotenv.config();
const token = process.env.Token;
const key = process.env.key;

const bot = new TelegramBot(token, { polling: true })

bot.on("message", (msg) => {
    const chat_id = msg.chat.id;
    const country = msg.text;

    const fetching = async () => {

        try {
            const res = await axios.get(`https://api.weatherapi.com/v1/current.json?key=${key}&q=${country}&aqi=no`)
            const data = res.data;
            console.log(data);
            const city = data.location.name;
            const country_region = data.location.country;
            const celucius = data.current.temp_c;
            const fharanite = data.current.temp_f;
            const humidity = data.current.humidity;
            const cloud = data.current.cloud;
            const wind_speed = data.current.gust_kph;



            const Temprature=`Temprature : ${celucius}°c`;
            const City=`City : ${city}`;
            const Country=`Country : ${country_region}`;
            const TEmprature_Farranite=`Temprature in degree fharanite : ${fharanite}°F`;
            const Humidity=`Humidity : ${humidity}`;
            const Cloud=cloud <= 35 ?` Mostly clear sky` : cloud >35 && cloud <=75 ? `Clear sky with cloud` :cloud > 75? `very cloudy`:`very clear sky`;
            const Wind_speed=`Wind speed: ${wind_speed}kmh`;
            

            bot.sendMessage(chat_id,    ` ${City}\n 
                ${Country}\n
                 ${Temprature} \n
                  ${Humidity} \n
                   ${Wind_speed} \n
                    Cloud: ${Cloud} \n
                     ${TEmprature_Farranite} \n`);


        } catch (error) {
          console.error(error);
            bot.sendMessage(chat_id,`please enter valid city name or city \"${msg.text}"\ is not found!`)

        }
    }
    bot.sendMessage(chat_id, `${msg.text}`);

    fetching();


});
