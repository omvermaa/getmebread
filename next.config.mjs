/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "lh3.googleusercontent.com",
      "avatars.githubusercontent.com",
      "media.giphy.com"
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        // Optional: Restrict to your specific cloud name if you want extra security
        // pathname: '/your-cloud-name/**', 
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com', // For Google Auth profile pics
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com', // For GitHub Auth profile pics
      },
      {
        protocol: 'https',
        hostname: 'media.giphy.com', // If you use Giphy gifs
      },
    ]
  },
  reactCompiler: true,
};

export default nextConfig;
