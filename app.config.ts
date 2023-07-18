const localHost = false

const HOST_DOMAIN = localHost
    ? ' http://localhost:1212'

    // ? Production Domain

    : 'http://finalstayhome-001-site1.atempurl.com'

const API_URL = `${HOST_DOMAIN}/api/Dashboard/`
const IMAGE_URL = `${HOST_DOMAIN}/`

export { API_URL, HOST_DOMAIN, IMAGE_URL }