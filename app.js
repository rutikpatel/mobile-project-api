import fetch from 'node-fetch';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();

app.use(bodyParser.json());
app.use(cors());

const AUTOCOMPLETE_API_URL = "https://maps.googleapis.com/maps/api/place/autocomplete/json";
const PLACE_DETAIL_API_URL =
    "https://maps.googleapis.com/maps/api/place/details/json";
const DIRECTION_API_URL = "https://maps.googleapis.com/maps/api/directions/json";
const token = "AIzaSyDaoWjKXa_gVe58W5pX8-JPcuxKT9nyce0";

app.get("/name/:name", async (req, res) => {
    const { name } = req.params;
    const request = await fetch(
        AUTOCOMPLETE_API_URL + `?input=${name}&key=${token}`
    );
    const response = await request.json();
    res.status(200).send(response)
})

app.get("/place/:id", async (req, res) => {
    const { id } = req.params;
    const request = await fetch(
        PLACE_DETAIL_API_URL + `?place_id=${id}&key=${token}`
    )
    const response = await request.json();
    res.status(200).send(response);
})

app.get("/directions/:origin/:destination", async (req, res) => {
    const { origin, destination } = req.params;
    console.log(origin, destination);
    const request = await fetch(
        DIRECTION_API_URL + `?origin=${origin}&destination=${destination}&key=${token}`
    );
    const response = await request.json();
    res.status(200).send(response);
})

app.listen(4000, async () => {
    console.log('listening')
})