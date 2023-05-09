const { Configuration, OpenAIApi } = require("openai");
const expres = require('express')
// add body parser and cors to express
const bodyParser = require('body-parser')
const cors = require('cors')

// Connect to OpenAI API
const configuration = new Configuration({ 
    organization: "org-tUnuzgDwQIZrE3hT0UA7cBg5",
    apiKey: "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", // you wanna do this with environment key, in this case its just for testing purposes
});
const openai = new OpenAIApi(configuration);


// Create a simple express api that calls the function above
const app = expres()
app.use(bodyParser.json())
app.use(cors())
const port = 3080

app.post('/', async (req, res) => {
     try {
        const { message } = req.body;
        console.log(message)
        console.log(message, "message")
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `${message}`,
            max_tokens: 100,
            temperature: 0.5,
        });

        res.json({
            message: response.data.choices[0].text,
        })

    } catch (error) {
        console.error(error);
    }
});

app.listen(port, () => {
    console.log(`Kanaitech ChaptGPT listening at http://localhost:${port}`)
});


