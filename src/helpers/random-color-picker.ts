class RandomColorPicker {
    private static readonly colors = ['#F87171', '#991B1B', '#991B1B', '#FB923C', '#FBBF24', '#92400E', '#854D0E', '#FACC15', '#A3E635', '#3F6212', '#166534', '#166534', '#34D399', '#065F46', '#115E59', '#2DD4BF', '#22D3EE', '#155E75', '#075985', '#38BDF8', '#60A5FA', '#1E40AF', '#3730A3', '#818CF8', '#A78BFA', '#5B21B6', '#6B21A8', '#C084FC', '#86198F', '#E879F9', '#F472B6', '#9D174D', '#9F1239', '#FB7185', '#A8A29E', '#A8A29E', '#1E293B', '#94A3B8']

    public static getRandomColor(): string {
        return RandomColorPicker.colors[Math.round(Math.random() * (RandomColorPicker.colors.length - 1))]
    }
}


export default RandomColorPicker