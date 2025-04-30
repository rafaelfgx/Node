import { Colors } from "./color.enum";
import { red, green, blue } from "./color.function";

const colorStrategy: Record<Colors, () => void> = {
    [Colors.RED]: red,
    [Colors.GREEN]: green,
    [Colors.BLUE]: blue
};

colorStrategy[Colors.RED]();
colorStrategy[Colors.GREEN]();
colorStrategy[Colors.BLUE]();
