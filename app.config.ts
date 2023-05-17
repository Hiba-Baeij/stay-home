const localHost = false

const HOST_DOMAIN = localHost
    ? ' http://localhost:1212'

    // ? Production Domain

    : 'http://194.32.76.82:8225'

const API_URL = `${HOST_DOMAIN}/api`

export { API_URL, HOST_DOMAIN }