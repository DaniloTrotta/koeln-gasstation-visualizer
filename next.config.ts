import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	env: {
		MapboxAccessToken: process.env.MAPBOX_ACCESS_TOKEN,
	},
};

export default nextConfig;
