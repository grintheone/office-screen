const baseUrl = "https://s3.storage.vbest.ru/";

// `upload` iterates through all files selected and invokes a helper function called `retrieveNewURL`.
export function upload() {
    // Get selected files from the input element.
    var files = document.querySelector("#media").files;

    for (var i = 0; i < files.length; i++) {
        var file = files[i];
        // Retrieve a URL from our server.
        retrieveNewURL(file, (file, url) => {
            // Upload the file to the server.
            uploadFile(file, url);
        });
    }
}

// `retrieveNewURL` accepts the name of the current file and invokes the `/presignedUrl` endpoint to
// generate a pre-signed URL for use in uploading that file:
export function retrieveNewURL(file, cb) {
    fetch(`/api/presignedUrl?name=${file.name}`)
        .then((response) => {
            console.log(response, "response");
            response.json().then((url) => {
                const urlStr = url.url.split(baseUrl)[1];
                cb(file, urlStr);
            });
        })
        .catch((e) => {
            console.error(e);
        });
}

// ``uploadFile` accepts the current filename and the pre-signed URL. It then uses `Fetch API`
// to upload this file to S3 at `play.min.io:9000` using the URL:
export async function uploadFile(file, url) {
    // if (document.querySelector('#status').innerText === 'No uploads') {
    //     document.querySelector('#status').innerHTML = '';
    // }
    console.log(url, "url before fetch");
    try {
        const res = await fetch(`/cloud/${url}`, {
            method: "PUT",
            body: file,
        });

        const text = await res.text();
        console.log(text);
        console.log("put file:", url, file);
    } catch (err) {
        console.log(err, "err");
    }
}
