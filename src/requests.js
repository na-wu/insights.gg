import dogs from './data.js'



const ENDPOINT = "https://dog.ceo/api/breeds/list/all";

/**
 * 
 * @param {*} response
 * @return {*} 
 */
function parseResponse(response) {
    console.log(response)

}
export const getDogBreeds = async() => {
    console.log("Calling endpoint " + ENDPOINT)

    console.log(dogs)


    const result = await fetch(ENDPOINT , {
        mode: 'cors' // 'cors' by default
      }).then(function(result) {
        const res = result.json();
        parseResponse(res);

        return res;
      }).catch(function(err) {
          console.log(err)
      })

      return dogs
    }
