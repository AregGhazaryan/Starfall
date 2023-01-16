import UIInterface from '../declarations/UIInterface';
import Handlers from './Handlers';
import Helpers from './Helpers';

class UI extends Handlers implements UIInterface {
    selects: NodeList;

    public initialize(): void {
        this.initializeEvents();
        this.initializeSelects();
        this.fabricateUniverse();
    }

    public initializeEvents(): void {
        window.addEventListener('resize', this.fabricateUniverse);
    }

    public initializeSelects(): void {
        this.selects = document.querySelectorAll('.starlight-select');

        this.selects.forEach((el) => {
            (el as HTMLElement).querySelectorAll('button').forEach((option) => option.addEventListener('click', this.handleOption));

            el.addEventListener('click', this.handleSelect);
        });
    }

    public fabricateUniverse(): void {
        const canvas = document.querySelector('.starfall-universe') as HTMLCanvasElement;
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        for (let i = 0; i < 100; i++) {
            const threshold = 1;
            const xPos = Helpers.randomBetween(2, canvas.width - threshold);
            const yPos = Helpers.randomBetween(2, canvas.height - threshold);
            const alpha = Helpers.randomBetween(0.5, 1);
            const size = Helpers.randomBetween(0.1, 1);
            ctx.fillStyle = '#ffffff';
            ctx.globalAlpha = alpha;
            ctx.shadowBlur = 10;
            ctx.shadowColor = 'white';
            ctx.fillRect(xPos, yPos, size, size);
        }
    }
}

export default UI;
