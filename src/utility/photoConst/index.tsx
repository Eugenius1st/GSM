// class images
import class_elite from 'assets/class/class_elite.jpeg';
import class_elite_theory from 'assets/class/class_elite_theory.jpg';
import class_personal from 'assets/class/class_personal.jpeg';
import class_child from 'assets/class/class_child.jpg';
import class_child2 from 'assets/class/class_child2.jpeg';
import class_adult_male from 'assets/class/class_adult_male.jpeg';
import class_adult_female from 'assets/class/class_adult_female.jpeg';
import admins from 'assets/class/admins.jpeg';

export function classImageByClassName(className: string) {
    switch (className) {
        case '엘리트반(초3-6/중,고,대)':
            return class_elite;
        case '이론 2차':
        case '이론 1차':
            return class_elite_theory;
        case '개인레슨':
            return class_personal;
        case '기본기반(초4-6)':
            return class_child;
        case '어린이반(초1-3)':
            return class_child2;
        case '성인 남성반':
            return class_adult_male;
        case '성인 여성반':
            return class_adult_female;
        default:
            return admins;
    }
}
