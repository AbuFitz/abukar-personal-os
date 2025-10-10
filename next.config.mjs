/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production'
const repo = 'abukar-personal-os'
const basePath = isProd ? `/${repo}` : ''

const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  basePath,
  assetPrefix: basePath + '/',
  trailingSlash: true,
}
export default nextConfig
