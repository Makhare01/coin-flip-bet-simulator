export const randomDelay = () => {
    const responseTime = Math.floor(Math.random() * 2700) + 300;
    return new Promise(resolve => setTimeout(resolve, responseTime));
}