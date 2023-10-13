const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin")

module.exports = {
	// mode: process.env.environment == "production" ? "production" : "development",
	mode: "prodution",
	plugins: [new MiniCssExtractPlugin()],
	module: {
		rules: [
			{
				test: /\.(s[ac]|c)ss$/i,
				//test: path.resolve(__dirname, "src/scss/*"),
				use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader", "postcss-loader"]
			},{
				test: /\.png$/i,
				type: "asset"
			}
		]
	},
	optimization: {
		minimizer: [
			new ImageMinimizerPlugin({
				minimizer: {
					implementation: ImageMinimizerPlugin.imageminMinify,
					options: {
						encodeOptions: {
							jpeg: {
							  // https://sharp.pixelplumbing.com/api-output#jpeg
							  quality: 100,
							},
						plugins: [
							["optipng", { optimizationLevel: 7 }]
						]

						}
					}
				}
			})
		]
	},
	devtool: "source-map",
	devServer: {
		static: "./dist"
	}
}
