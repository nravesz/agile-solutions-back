var express = require("express");
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());

const data = {
    "Ropa": {
        "Pantalón": {
            "Marca P 1": [300, 400, 500, 600],
            "Marca P 2": [200, 300, 400, 500]
        },
        "Remera": {
            "Marca R 1": [100, 500, 700, 200],
            "Marca R 2": [0, 400, 600, 100]
        }
    },
    "Comida": {
        "Cereales": {
            "Marca C 1": [200, 100, 600, 100],
            "Marca C 2": [100, 0, 500, 0]
        },
        "Frutas": {
            "Marca F 1": [500, 400, 300, 200],
            "Marca F 2": [400, 300, 200, 0]
        }
    }
}

// get all categories, products and brands
app.get("/api/options", (req, res) => {
    try {
        const options = {};
        for (let category in data) {
            options[category] = {};
            for (let product in data[category]) {
                const brands = []; 
                for (let brand in data[category][product]) {
                    brands.push(brand);
                }
                options[category][product] = brands;
            }
        }

        const response = {
            status: "success",
            data: {
                options: options
            }
        }
        console.log(response);
        return res.json(response);
    } catch (error) {
        return res.json({
            status: "error",
            message: `${error.message}`
        });
    }
})

// get the sales' month list
app.get("/api/sales", (req, res) => {
    try {
        const category = req.body.category;
        const product = req.body.product;
        const brand = req.body.brand;

        const sales = data[category][product][brand];

        if (sales != undefined) {
            let response = {
                status: "success",
                data: {
                    sales: sales
                }
            }

            console.log("GET: ", response);
            return res.json(response)
        } else {
            let response = {
                status: "failed",
                message: "No data"
            }

            console.log("GET error: ", response);
            res.json(response)
        }
    } catch (error) {
        console.log("GET error: ", error);
        return res.json({
            status: "error",
            message: `${error.message}`
        });
    }
});

app.listen('8000', () => {
    console.log("Server Started on port 8000");
});