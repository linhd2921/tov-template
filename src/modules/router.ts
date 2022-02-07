import { setupLayouts } from "virtual:generated-layouts";
import generatedRoutes from "virtual:generated-pages";
import { App } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import tokenStore from "~/stores/tokenStore";

const routes = setupLayouts(generatedRoutes);

// 不需要token验证的页面
const unVerificationRequiredPaths = ["/login"];

export const router = createRouter({
	routes,
	history: createWebHistory(),
});

// 进行路由守卫控制
router.beforeEach((to, from, next) => {
	let token = tokenStore().token;
	if (!token && !unVerificationRequiredPaths.includes(to.path)) {
		// 如果浏览器缓存有token则设置token然后正常访问路由地址
		const localStorageToken = window.localStorage.getItem("token");
		if (localStorageToken) {
			tokenStore().setToken(localStorageToken);
		} else {
			next("/login");
			return;
		}
	}
	next();
});

export default (app: App) => app.use(router);
