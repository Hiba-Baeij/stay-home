const localHost = false

const HOST_DOMAIN = localHost
    ? ' http://localhost:1212'

    // ? Production Domain

    : 'http://stayhome22-001-site1.ftempurl.com'

const API_URL = `${HOST_DOMAIN}/api/Dashboard/`
const IMAGE_URL = `${HOST_DOMAIN}/`

export { API_URL, HOST_DOMAIN, IMAGE_URL }