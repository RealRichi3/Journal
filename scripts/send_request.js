// REQUESTS
function sendHttpRequest(method, url, data) {
    const promise = new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.responseType = "json";

        if (data) {
            xhr.setRequestHeader("Content-Type", "application/json");
        }

        xhr.onload = () => {
            if (xhr.status == 200) {
                resolve(xhr.response);
            }
        };
        xhr.onerror = () => {
            reject("An error occured!");
        };

        xhr.send(JSON.stringify(data));
    });
    return promise;
}

export { sendHttpRequest };
