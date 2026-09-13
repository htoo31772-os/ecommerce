export const getStorageImage = (imageName,folder) => {
    const baseUrl = import.meta.env.VITE_API_URL|| 'http://localhost:8000';
    if (!imageName) return './images/user.jpg';
    if (!imageName || imageName === 'null' || imageName === 'undefined') {
        return './images/user.jpg';
    }
    if (imageName.startsWith('http://')) {
        return imageName;
    }
    if (!folder) {
        console.warn('Storage folder is missing!');
        return './images/user.jpg';
    }
    return `${baseUrl}/storage/${folder}/${imageName}`
}
