const schedule = require('node-schedule')

// Agendar tarefas:
module.exports = app => {
                        // A cada um minuto
    schedule.scheduleJob('*/1 * * * *', async function () {
        // Vai no módulo do banco e faz as contagens
        const usersCount = await app.db('users').count('id').first()
        const categoriesCount = await app.db('categories').count('id').first()
        const articlesCount = await app.db('articles').count('id').first()

        // Importando o módulo de statísticas
        const { Stat } = app.api.stat

        // Pegando a última estatística:
        const lastStat = await Stat.findOne({}, {}, 
            {sort: { 'createdAt' : -1 }})
        
        // Definindo nova estatística
        const stat = new Stat({
            users: usersCount.count,
            categories: categoriesCount.count,
            articles: articlesCount.count,
            createdAt: new Date()
        })

        // Condições para mudar os Stats:
        const changeUsers = !lastStat || stat.users !== lastStat.users
        const changeCategories = !lastStat || stat.categories !== lastStat.categories
        const changeArticles = !lastStat || stat.articles !== lastStat.articles

        if (changeUsers || changeCategories || changeArticles) {
            stat.save().then(() => console.log('[Stats] Estatísticas atualizadas'))
        }
    })
}
