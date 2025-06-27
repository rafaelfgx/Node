import { Colors } from "./color.enum";
import { red, green, blue } from "./color.function";

const colorStrategy: Record<Colors, { execute: () => void }> = {
    [Colors.RED]: { execute: red },
    [Colors.GREEN]: { execute: green },
    [Colors.BLUE]: { execute: blue }
};

colorStrategy[Colors.RED].execute();
colorStrategy[Colors.GREEN].execute();
colorStrategy[Colors.BLUE].execute();
