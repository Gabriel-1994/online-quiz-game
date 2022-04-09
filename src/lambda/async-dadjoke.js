// example of async handler using async-await
// https://github.com/netlify/netlify-lambda/issues/43#issuecomment-444618311

import axios from "axios"
export async function handler(event, context) {
  try {
    //const response = await axios.get("https://icanhazdadjoke.com", { headers: { Accept: "application/json" } })
    const response = await axios.get("https://opentdb.com/api.php?amount=100", { headers: { Accept: "application/json" } })
    const data = response.data
    var fs = require('fs');
    fs.writeFile('./questions.json', JSON.stringify(data['results'][0]['correct_answer']), function(err) {
      if (err) throw err;
      console.log('complete');
      }
  );
    return {
      statusCode: 200,
      body: JSON.stringify({ msg: data['results'][0]['correct_answer'] })
      //body: JSON.stringify({ msg: data.joke })
    }    
  } catch (err) {
    console.log(err) // output to netlify function log
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message }) // Could be a custom message or object i.e. JSON.stringify(err)
    }
  }
}
