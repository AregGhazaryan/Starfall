import { AnimationNames } from '../declarations/Animations';

class Animations {
    public static animateSelector(selector: string, animationName: AnimationNames): void {
        const element = document.querySelector(selector);
        if (!element) throw new Error(`Element with selector ${selector} not found.`);
        if (animationName === 'fade_in') {
            this.fadeIn(element);
        } else if (animationName === 'fade_out') {
            this.fadeOut(element);
        }
    }

    public static fadeIn(element: Element): void {
        element.classList.remove('opacity-0');
        element.classList.add('opacity-100');
    }

    public static fadeOut(element: Element): void {
        element.classList.add('opacity-0');
        element.classList.remove('opacity-100');
    }

    public static ascend(element: Element): void {
        element.classList.remove('opacity-100');
        element.classList.add('opacity-0');
        element.classList.remove('top-14');
    }

    public static descend(element: Element): void {
        element.classList.add('opacity-100');
        element.classList.remove('opacity-0');
        element.classList.add('top-14');
    }
}

export default Animations;
