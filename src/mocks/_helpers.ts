export const randomDelay = () => {
    const responseTime = Math.floor(Math.random() * 1501) + 500;
    return new Promise(resolve => setTimeout(resolve, responseTime));
}