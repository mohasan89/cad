import colors from 'tailwindcss/colors'

class RandomColorPicker {
    private static readonly colors = [
        '#F87171', '#F97316', '#F59E0B', '#84CC16',
        '#22C55E', '#22C55E', '#06B6D4', '#0EA5E9',
        '#3B82F6', '#3B82F6', '#8B5CF6', '#A855F7',
        '#D946EF', '#EC4899', '#F43F5E'
    ]

    public static getRandomColor(): string {
        return RandomColorPicker.colors[Math.round(Math.random() * (RandomColorPicker.colors.length - 1))]
    }
}


export default RandomColorPicker