module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
    ? '/production-path/'
    : '/',

    devServer: {
        proxy: { // 配置跨域
            '/api': {
                target: 'http://localhost:3000/api/',
                ws: true,
                changeOrigin: true,    //是否开启代理
                pathRewrite: {
                    '^/api': ''
                }
            }
        },
        before: app => {}
    }
}