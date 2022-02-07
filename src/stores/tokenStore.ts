// default token进行全局token状态管理
export default defineStore('token', {
    state() {
        return {
            token: ''
        }
    },
    actions: {
        setToken(token: string) {
            this.token = token;
        }
    }
})