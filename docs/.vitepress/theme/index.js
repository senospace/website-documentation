// .vitepress/theme/index.ts
import DefaultTheme from "vitepress/theme";

// custom CSS
import "./style/print.css";
import "./style/custom.css";

export default {
	// Extending the Default Theme
	...DefaultTheme,
};