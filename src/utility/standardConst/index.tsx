export const soccerHistoryOptioins = ['없음', '1년 미만', '1~3년', '3~5년', '5년 이상'];
export const lessonHistoryOptions = ['없음', '6개월 미만', '1년 미만', '1~3년', '3~5년'];
export const trainingCourseOptions = [
    '엘리트반(초3-6/중,고,대)',
    '성인 남성반',
    '성인 여성반',
    '기본기반(초4-6)',
    '어린이반(초1-3)',
    '개인레슨',
    '이론 1차',
    '이론 2차',
];
export const positionOptions = ['GK', 'CB', 'LWB', 'RWB', 'CDM', 'CAM', 'CM', 'LM', 'RM', 'ST'];

// 포지션 한문 <-> 영문

export function classGroupMatcherByKor(classGroup: string) {
    switch (classGroup) {
        case '엘리트반(초3-6/중,고,대)':
            return 'elite';
        case '성인반(남,녀)':
            return 'adults';
        case '기본기반(초4-6)':
            return 'basics';
        case '어린이반(초1-3)':
            return 'child';
        case '2:1개인레슨':
            return '2:1private';
        default:
            return '모르겠음,수정필요';
    }
}
export function positionMatcherByEng(position: string) {
    switch (position) {
        case 'GK':
            return '골키퍼';
        case 'CB':
            return '중앙 수비수';
        case 'LWB':
            return '왼쪽 수비수';
        case 'RWB':
            return '오른쪽 수비수';
        case 'CDM':
            return '수비형 미드필더';
        case 'CAM':
            return '공격형 미드필더';
        case 'CM':
            return '중앙 미드필더';
        case 'LM':
            return '왼쪽 미드필더';
        case 'RM':
            return '오른쪽 미드필더';
        case 'ST':
            return '공격수';
        default:
            return '없음';
    }
}

export function positionMatcherByKor(position: string) {
    switch (position) {
        case '골키퍼':
            return 'GK';
        case '중앙 수비수':
            return 'CB';
        case '왼쪽 수비수':
            return 'LWB';
        case '오른쪽 수비수':
            return 'RWB';
        case '수비형 미드필더':
            return 'CDM';
        case '공격형 미드필더':
            return 'CAM';
        case '중앙 미드필더':
            return 'CM';
        case '왼쪽 미드필더':
            return 'LM';
        case '오른쪽 미드필더':
            return 'RM';
        case '공격수':
            return 'ST';
        default:
            return '';
    }
}

// 나이 -> 학년
export function gradeMatcherByAge(birthYear: number) {
    const currentYear = new Date().getFullYear();
    const age = currentYear - birthYear + 1;
    if (age <= 7) {
        return `아동 ${age}세`;
    } else if (7 < age && age <= 13) {
        return `초 ${age - 7}`;
    } else if (13 < age && age <= 16) {
        return `중 ${age - 13}`;
    } else if (16 < age && age < 20) {
        return `고 ${age - 16}`;
    } else {
        return `성인 ${age}세`;
    }
}

// 클래스그룹 영문 -> 한문

export function classGroupMatcherByEng(classGroup: string) {
    switch (classGroup) {
        case 'elite':
            return '엘리트반(초3-6/중,고,대)';
        case 'adults':
            return '성인반(남,녀)';
        case 'basics':
            return '기본기반(초4-6)';
        case 'child':
            return '어린이반(초1-3)';
        case '2:1private':
            return '2:1개인레슨';
        default:
            return '모르겠음,수정필요';
    }
}
