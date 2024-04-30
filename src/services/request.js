/*function parseData(data){
    const formData = new FormData();
    for (let [key,value] of Object.entries(data)){
        formData.append(key,value);
    }

    return formData;
}*/

function request(url,data = false, method = 'GET', type= 'JSON'){
    return new Promise(async (resolve,reject) => {
        const options = {
            method : method
        }

        // if (data && method === 'POST'){
        //     options.body = type === 'JSON' ? JSON.stringify(data) : parseData(data);
        // }

        if (data && method === 'POST') {
            options.headers = {
                'Content-Type': 'application/json'
            };
            options.body = JSON.stringify(data);
        }

        const response = await fetch(process.env.REACT_APP_API_URL + url,options);
        const result = await response.json();

        if (response.ok){
            resolve(result);
        }else {
            reject(result);
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
    })
}

export const get = (url) => request(url)
export const post = (url,data) => request(url,data,'POST')
export const put = (url,data) => request(url,data,'PUT')
export const patch = (url,data) => request(url,data,'PATCH')
export const deleteFunc = (url,data) => request(url,data,'DELETE')
export const postFormData = (url,data) => request(url,data,'POST','FORM_DATA')
