const GAUSSIAN_COUNT = 4;

class Helpers {

    gaussianRandom() {
        let randSum = 0;
        for(let i = 0; i < GAUSSIAN_COUNT; i++) {
            randSum += Math.random();
        }
        randSum *= 1.03;
        let randMean = (randSum / GAUSSIAN_COUNT) * 2;
        return Math.min(1, Math.abs(randMean - 1));
    }
}

export const helpers = new Helpers();