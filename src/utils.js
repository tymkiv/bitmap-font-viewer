const createResolver = () => {
    let resolve;
    const promise = new Promise(res => resolve = res);
    promise.completed = false;
    promise.resolve = data => {
        promise.completed = true;
        resolve(data);
    };
    return promise;
};

const nameWithoutExt = name => {
    return name.slice(0, name.lastIndexOf("."));
}

const getPNGPath = file => {
    const blobPath = URL.createObjectURL(file);
    const urlObject = new URL(blobPath);
    return blobPath.slice(5 + urlObject.origin.length + 1);
}

export { createResolver, nameWithoutExt, getPNGPath };