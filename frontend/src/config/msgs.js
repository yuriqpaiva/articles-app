import Vue from 'vue'
import Toasted from 'vue-toasted'

// Chamando o Toasted e um objeto de configuração:
Vue.use(Toasted, {
    iconPack: 'fontawesome',
    duration: 3000
})

Vue.toasted.register(
    'defaultSuccess',
    payload => !payload.msg ? 'Operação realizada com sucesso!' : payload.msg,
    { type: 'success', icon: 'check' }
)

Vue.toasted.register(
    'defaultError',
    payload => !payload.msg ? 'Oops... Erro inesperado' : payload.msg,
    { type: 'error', icon: 'times' }
)