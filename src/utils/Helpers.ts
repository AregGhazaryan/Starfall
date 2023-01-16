class Helpers {
    public static randomBetween(min: number, max: number): number {
        return min + Math.random() * (max + 1 - min);
    }
}

export default Helpers;
